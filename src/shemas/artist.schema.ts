import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop({required: true})
    name: string 

    @Prop()
    photo: string

    @Prop()
    information: string

    @Prop({default: false})
    isPublished: boolean
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);