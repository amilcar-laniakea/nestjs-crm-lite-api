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

@Controller('clients')
@UseGuards(AuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

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

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllClients(@Query() query: FindClientDto, @Req() req: Request) {
    const { id, role } = req.user;
    return this.clientsService.findAll(query, id, role);
  }

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

  @Get(':id')
  async getClientById(@Param('id') id: string, @Req() req: Request) {
    return this.clientsService.findById(id, req.user.id);
  }

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

  @Put(':id')
  async editClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: Request
  ) {
    return this.clientsService.update(id, updateClientDto, req.user.id);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string, @Req() req: Request) {
    return this.clientsService.remove(id, req.user.id);
  }
}
