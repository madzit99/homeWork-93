import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Artist } from './artist.schema';
import mongoose from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema({})
export class Album {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, ref: Artist.name })
  atist: mongoose.Schema.Types.ObjectId;

  @Prop()
  photo: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ required: true })
  year: number;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
