import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { env } from 'process';

@Injectable()
export class AppService {
  private readonly repoDir: string;

  constructor() {
    this.repoDir = env.REPO_DIR;
  }

  getHello(): string {
    return 'Hello World!';
  }

  addToRepo(file): string {
    return execSync(
      `repo-add '${this.repoDir}/pkgs.db.tar.xz' bla.pkg.tar.xz`,
    ).toString();
  }
}
