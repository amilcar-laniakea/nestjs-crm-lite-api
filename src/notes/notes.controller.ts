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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam
} from '@nestjs/swagger';

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: 'Create a new note for a client' })
  @ApiParam({
    name: 'id',
    description: 'Client ID',
    example: 'clh4n8o9w0000v8q8x7y9z0a1'
  })
  @ApiResponse({
    status: 201,
    description: 'Note has been created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Note has been created successfully'
        },
        data: { type: 'object' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Client not found' })
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

  @ApiOperation({ summary: 'Get all notes for a client' })
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

  @ApiOperation({ summary: 'Delete a note for a client' })
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
