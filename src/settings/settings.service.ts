import { Injectable } from '@nestjs/common';
import { env } from 'process';

@Injectable()
export class SettingsService {
  getRepoPath(): string {
    return env.REPO_DIR;
  }
}
