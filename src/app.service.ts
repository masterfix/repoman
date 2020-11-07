import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { env } from 'process';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  addToRepo(): string {
    const repo_dir = env.REPO_DIR;
    return execSync(
      `repo-add '${repo_dir}/pkgs.db.tar.xz' bla.pkg.tar.xz`,
    ).toString();
  }

}
