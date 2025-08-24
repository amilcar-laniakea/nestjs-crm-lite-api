import {
  Injectable,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { FindNoteDto } from './dto/find-note.dto';
import { Prisma, Note } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createNoteDto: CreateNoteDto,
    userId: string,
    clientId: string
  ): Promise<Note> {
    const client = await this.prisma.client.findFirst({
      where: { id: clientId, ownerId: userId }
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return this.prisma.note.create({
      data: {
        ...createNoteDto,
        userId,
        clientId
      },
      include: {
        client: {
          select: { id: true, name: true, email: true }
        },
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async findAll(query: FindNoteDto, userId: string, clientId: string) {
    const { page = 1, pageSize = 10, ...filters } = query;

    const where: Prisma.NoteWhereInput = {
      ...query,
      userId,
      clientId
    };

    if (filters.content) {
      where.content = {
        contains: filters.content,
        mode: 'insensitive'
      };
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const [data, total] = await Promise.all([
      this.prisma.note.findMany({
        where,
        skip,
        take: Number(pageSize),
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: { id: true, name: true, email: true }
          },
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      this.prisma.note.count({ where })
    ]);

    return {
      data,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    };
  }

  async findOne(id: string, userId: string, userRole: string): Promise<Note> {
    const where: Prisma.NoteWhereInput = {
      id,
      ...(userRole === 'ADMIN' ? {} : { userId })
    };

    const note = await this.prisma.note.findFirst({
      where,
      include: {
        client: {
          select: { id: true, name: true, email: true }
        },
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async findByClient(
    clientId: string,
    userId: string,
    userRole: string,
    query: FindNoteDto
  ) {
    if (userRole !== 'ADMIN') {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, ownerId: userId }
      });

      if (!client) {
        throw new NotFoundException(
          'Client not found or does not belong to you'
        );
      }
    }

    const { page = 1, pageSize = 10, ...filters } = query;
    const where: Prisma.NoteWhereInput = {
      ...filters,
      ...(userRole === 'ADMIN' ? {} : { userId })
    };

    if (filters.content) {
      where.content = {
        contains: filters.content,
        mode: 'insensitive'
      };
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const [data, total] = await Promise.all([
      this.prisma.note.findMany({
        where,
        skip,
        take: Number(pageSize),
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: { id: true, name: true, email: true }
          },
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      this.prisma.note.count({ where })
    ]);

    return {
      data,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    };
  }

  async remove(id: string, userId: string, userRole: string): Promise<Note> {
    const existingNote = await this.findOne(id, userId, userRole);

    if (userRole !== 'ADMIN' && existingNote.userId !== userId) {
      throw new ForbiddenException('You can only delete your own notes');
    }

    return this.prisma.note.delete({
      where: { id },
      include: {
        client: {
          select: { id: true, name: true, email: true }
        },
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }
}
