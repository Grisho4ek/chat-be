import { Test, TestingModule } from '@nestjs/testing';
import { ManagmentApiService } from './managment-api.service';

describe('ManagmentApiService', () => {
  let service: ManagmentApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagmentApiService],
    }).compile();

    service = module.get<ManagmentApiService>(ManagmentApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
