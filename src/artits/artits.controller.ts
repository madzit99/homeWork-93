import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { Artist, ArtistDocument } from 'src/shemas/artist.shema';

@Controller('artits')
export class ArtitsController {
    constructor (
        @InjectModel(Artist.name) private ArtistModel: Model<ArtistDocument>,
    ){}

    @Get()
    async getAll() {
        return this.ArtistModel.find()
    }

    @Get(":id")
    async getOne(@Param("id") id: string){
        const artist = await this.ArtistModel.findOne({_id: id});

        if(!artist) {
            throw new NotFoundException(`Артист с идентификатором ${id} не найден!`);
        }

        return artist;
    }
}
