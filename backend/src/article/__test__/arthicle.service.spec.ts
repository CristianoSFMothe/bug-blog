import { Test, TestingModule } from '@nestjs/testing';
import { ArthicleService } from '../arthicle.service';

describe('ArthicleService', () => {
  let service: ArthicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArthicleService],
    }).compile();

    service = module.get<ArthicleService>(ArthicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
