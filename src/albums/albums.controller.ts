import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlbumDocument, Almum } from 'src/shemas/album.shema';

@Controller('albums')
export class AlbumsController {
    constructor(
        @InjectModel(Almum.name) private AlbumModel: Model<AlbumDocument>,
    ){}

    @Get()
    async getAll(){
        return this.AlbumModel.find;
    }


    @Get(":id") 
    async getOne(@Param("id") id: string ) {
        const album = await this.AlbumModel.findOne({_id: id})

        if (!album) {
            throw new NotFoundException(`Альбом с идентификатором ${id} не найден`)
        }
        return album;
    }
}

