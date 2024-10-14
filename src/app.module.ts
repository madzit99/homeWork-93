import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsController } from './albums/albums.controller';
import { ArtitsController } from './artist/artits.controller';
import { TracksController } from './tracks/tracks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './shemas/artist.schema';
import { Track, TrackSchema } from './shemas/track.schema';
import { Album, AlbumSchema } from './shemas/album.schema';
import { User, UserSchema } from './shemas/user.shema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/spotify'),
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Artist.name, schema: ArtistSchema },
      { name: Track.name, schema: TrackSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    AppController,
    AlbumsController,
    ArtitsController,
    TracksController,
  ],
  providers: [AppService],
})
export class AppModule {}
