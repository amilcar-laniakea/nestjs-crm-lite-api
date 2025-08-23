import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService]
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await service.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to database', async () => {
    await expect(service.$connect()).resolves.not.toThrow();
  });

  it('should execute raw query', async () => {
    const result = await service.$queryRaw`SELECT 1 as test`;
    expect(result).toBeDefined();
  });
});
