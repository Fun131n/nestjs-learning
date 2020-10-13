import { Test, TestingModule } from '@nestjs/testing';
import { ReplysController } from './replys.controller';

describe('Replys Controller', () => {
  let controller: ReplysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplysController],
    }).compile();

    controller = module.get<ReplysController>(ReplysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
