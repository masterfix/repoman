import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { Request } from 'express';
import { PathLike, promises as fs } from 'fs';
import { join } from 'path';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class RepoService {
  private readonly repoDir: string;

  constructor(settingsService: SettingsService) {
    this.repoDir = settingsService.getRepoPath();
  }

  addPackage(
    filePath: PathLike,
    fileName: string,
  ): Promise<{ stdout: string; stderr: string }> {
    const newPath = join(this.repoDir, fileName);

    return fs
      .copyFile(filePath, newPath)
      .then(() => fs.unlink(filePath))
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
