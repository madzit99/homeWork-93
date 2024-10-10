import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AlbumDocument = Album & Document;


@Schema({})
export class Album {
    @Prop({required: true})
    name: string

    @Prop()
    photo: string

    @Prop({default: false})
    isPublished: boolean

    @Prop({required: true})
    year: number
}

export const AlbumSchema = SchemaFactory.createForClass(Album)
