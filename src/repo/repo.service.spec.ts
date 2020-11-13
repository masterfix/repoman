import { Test, TestingModule } from '@nestjs/testing';
import * as tmp from 'tmp';
import { SettingsService } from '../settings/settings.service';
import { RepoService } from './repo.service';

describe('RepoService', () => {
  let service: RepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SettingsService,
          useValue: {
            getRepoPath: () => '/tmp',
          },
        },
        RepoService,
      ],
    }).compile();

    service = module.get<RepoService>(RepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addPackage', () => {
    it('should reject when invalid filePath is given', () => {
      expect(service.addPackage('', 'test')).rejects.toBeTruthy();
    });
    it('should reject when invalid fileName is given', () => {
      const tempFile = tmp.fileSync();
      expect(service.addPackage(tempFile.name, '')).rejects.toBeTruthy();
    });
    it('should reject when invalid fileName is given', () => {
      const tempFile = tmp.fileSync();
      expect(
        service.addPackage(tempFile.name, 'test.pkg.tar.gz'),
      ).rejects.toBeTruthy();
    });
  });
});
