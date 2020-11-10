import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { env } from 'process';
import { RepoService } from './repo/repo.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: env.REPO_DIR,
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RepoService],
})
export class AppModule {}
