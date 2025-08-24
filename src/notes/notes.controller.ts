import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import type { Request } from 'express';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { FindNoteDto } from './dto/find-note.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('clients')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post(':id/notes')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('id') id: string,
    @Body() createNoteDto: CreateNoteDto,
    @Req() req: Request
  ) {
    const noteCreated = await this.notesService.create(
      createNoteDto,
      req.user.id,
      id
    );
    return {
      message: 'Note has been created successfully',
      data: noteCreated
    };
  }

  @Get(':id/notes')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Param('id') id: string,
    @Query() query: FindNoteDto,
    @Req() req: Request
  ) {
    const { id: userId } = req.user;
    return this.notesService.findAll(query, userId, id);
  }

  @Delete('notes/:id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const { id: userId, role } = req.user;
    const deletedNote = await this.notesService.remove(id, userId, role);
    return {
      message: 'Note has been deleted successfully',
      data: deletedNote
    };
  }
}
