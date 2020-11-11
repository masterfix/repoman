import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { env } from 'process';
import * as serveIndex from 'serve-index';
import * as serveStatic from 'serve-static';
import { AppController } from './app.controller';
import { RepoService } from './repo/repo.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RepoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const repoDir: string = env.REPO_DIR;
    consumer
      .apply(serveStatic(repoDir, {}))
      .forRoutes('/')
      .apply(serveIndex(repoDir, { icons: true }))
      .forRoutes('/');
  }
}
