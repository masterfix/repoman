import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { env } from 'process';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: env.REPO_DIR,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
