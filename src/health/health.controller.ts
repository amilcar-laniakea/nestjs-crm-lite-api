import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DevelopmentGuard } from '../guards/development.guard';

@Controller('health')
@UseGuards(DevelopmentGuard)
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('db')
  async checkDatabase() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        database: 'connected',
        environment: process.env.NODE_ENV || 'development'
      };
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }
      return {
        status: 'error',
        database: 'disconnected',
        error: errorMessage,
        environment: process.env.NODE_ENV || 'development'
      };
    }
  }
}
