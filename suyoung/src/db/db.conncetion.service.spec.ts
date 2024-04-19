import { Test, TestingModule } from '@nestjs/testing';
import { DbConncetionService } from './db.conncetion.service';

describe('DbConncetionService', () => {
  let service: DbConncetionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbConncetionService],
    }).compile();

    service = module.get<DbConncetionService>(DbConncetionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
