import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { renameSync } from 'fs';
import { join } from 'path';
import { env } from 'process';

@Injectable()
export class RepoService {
  private readonly repoDir: string;

  constructor() {
    this.repoDir = env.REPO_DIR;
  }

  addPackage(file): string {
    //console.log('file to add:', file);

    const newPath = join(this.repoDir, file.originalname);

    renameSync(file.path, newPath);

    return execSync(
      `repo-add '${this.repoDir}/pkgs.db.tar.xz' ${newPath}`,
    ).toString();
  }

  removePackage(pkgName: string): string {
    return execSync(
      `repo-remove '${this.repoDir}/pkgs.db.tar.xz' ${pkgName}`,
    ).toString();
  }
}
