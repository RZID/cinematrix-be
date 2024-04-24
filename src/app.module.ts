import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, UsersModule, MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
