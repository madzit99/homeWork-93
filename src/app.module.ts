import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsController } from './albums/albums.controller';
import { ArtitsController } from './artits/artits.controller';
import { TracksController } from './tracks/tracks.controller';

@Module({
  imports: [],
  controllers: [AppController, AlbumsController, ArtitsController, TracksController],
  providers: [AppService],
})
export class AppModule {}
