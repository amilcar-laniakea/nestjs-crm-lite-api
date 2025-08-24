import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClientsModule, UsersModule, PrismaModule, AuthModule],
  controllers: [HealthController]
})
export class AppModule {}
