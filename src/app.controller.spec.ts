import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RepoService } from './repo/repo.service';
import { SettingsService } from './settings/settings.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [SettingsService, RepoService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
