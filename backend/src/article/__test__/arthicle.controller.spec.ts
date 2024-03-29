import { Test, TestingModule } from '@nestjs/testing';
import { ArthicleController } from '../arthicle.controller';
import { ArthicleService } from '../arthicle.service';

describe('ArthicleController', () => {
  let controller: ArthicleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArthicleController],
      providers: [ArthicleService],
    }).compile();

    controller = module.get<ArthicleController>(ArthicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
