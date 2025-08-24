import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdatePartialClientDto } from './dto/update-partial-client.dto';
import { AuthGuard } from '../guards/auth.guard';
import type { Request } from 'express';
import { FindClientDto } from './dto/find-client.dto';
import { FindClientByEmailDto } from './dto/find-client-by-email.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery
} from '@nestjs/swagger';

@ApiTags('Clients')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(AuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'Client has been created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Client has been created successfully'
        },
        data: { type: 'object' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClientDto: CreateClientDto, @Req() req: Request) {
    const clientCreated = await this.clientsService.create(
      createClientDto,
      req.user.id
    );
    return {
      message: 'Client has been created successfully',
      data: clientCreated
    };
  }

  @ApiOperation({ summary: 'Get all clients with pagination and filters' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: '1'
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Items per page',
    example: '10'
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by client name'
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Filter by client email'
  })
  @ApiQuery({
    name: 'company',
    required: false,
    description: 'Filter by company name'
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by client status'
  })
  @ApiResponse({
    status: 200,
    description: 'List of clients retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { type: 'object' } },
        total: { type: 'number' },
        page: { type: 'number' },
        pageSize: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllClients(@Query() query: FindClientDto, @Req() req: Request) {
    const { id, role } = req.user;
    return this.clientsService.findAll(query, id, role);
  }

  @ApiOperation({ summary: 'Get client by email' })
  @ApiResponse({ status: 200, description: 'Client found' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('/email')
  async getClientByEmail(
    @Body() findClientByEmailDto: FindClientByEmailDto,
    @Req() req: Request
  ) {
    return this.clientsService.findByEmail(
      findClientByEmailDto.email,
      req.user.id
    );
  }

  @ApiOperation({ summary: 'Get client by ID' })
  @ApiParam({
    name: 'id',
    description: 'Client ID',
    example: 'clh4n8o9w0000v8q8x7y9z0a1'
  })
  @ApiResponse({ status: 200, description: 'Client found' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':id')
  async getClientById(@Param('id') id: string, @Req() req: Request) {
    return this.clientsService.findById(id, req.user.id);
  }

  @ApiOperation({ summary: 'Partially update client' })
  @ApiParam({
    name: 'id',
    description: 'Client ID',
    example: 'clh4n8o9w0000v8q8x7y9z0a1'
  })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async partialEditClient(
    @Param('id') id: string,
    @Body() updatePartialClientDto: UpdatePartialClientDto,
    @Req() req: Request
  ) {
    return this.clientsService.updatePartial(
      id,
      updatePartialClientDto,
      req.user.id
    );
  }

  @ApiOperation({ summary: 'Fully update client' })
  @ApiParam({
    name: 'id',
    description: 'Client ID',
    example: 'clh4n8o9w0000v8q8x7y9z0a1'
  })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Put(':id')
  async editClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: Request
  ) {
    return this.clientsService.update(id, updateClientDto, req.user.id);
  }

  @ApiOperation({ summary: 'Delete client' })
  @ApiParam({
    name: 'id',
    description: 'Client ID',
    example: 'clh4n8o9w0000v8q8x7y9z0a1'
  })
  @ApiResponse({ status: 200, description: 'Client deleted successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async deleteClient(@Param('id') id: string, @Req() req: Request) {
    return this.clientsService.remove(id, req.user.id);
  }
}
