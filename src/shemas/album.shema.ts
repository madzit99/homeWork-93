import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AlmumDocument = Almum & Document;


@Schema({})
export class Almum {
    @Prop({required: true})
    name: string

    @Prop()
    photo: string

    @Prop({default: false})
    isPublished: boolean

    @Prop({required: true})
    year: number
}

export const AlmumSchema = SchemaFactory.createForClass(Almum)
