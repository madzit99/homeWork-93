import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop({required: true})
    name: string;

    @Prop()
    duration: string;

    @Prop({required: true})
    trackNumber: number;

    @Prop({default: false})
    isPublished: boolean;

}

export const TrackSchema = SchemaFactory.createForClass(Track);