import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { env } from 'process';

@Injectable()
export class RepoService {
  private readonly repoDir: string;

  constructor() {
    this.repoDir = env.REPO_DIR;
  }

  addPackage(file): Promise<{ stdout: string; stderr: string }> {
    const newPath = join(this.repoDir, file.originalname);

    return fs
      .copyFile(file.path, newPath)
      .then(() => fs.unlink(file.path))
      .then(() =>
        this.exec(`repo-add '${this.repoDir}/pkgs.db.tar.xz' ${newPath}`),
      );
  }

  removePackage(pkgName: string): Promise<{ stdout: string; stderr: string }> {
    return this.exec(`repo-remove '${this.repoDir}/pkgs.db.tar.xz' ${pkgName}`);
  }

  private exec(command: string): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve({ stdout, stderr });
      });
    });
  }
}
