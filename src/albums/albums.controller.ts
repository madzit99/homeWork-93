import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from 'src/shemas/album.schema';
import { CreateAlbumDto } from './create.album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenAuthGuard } from 'src/auth/token-auth/token-auth.guard';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name) private AlbumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAll(@Query('artisrId') artistId: string) {
    if (artistId) {
      return this.AlbumModel.find({ artist: artistId }).populate(
        'artist',
        'name',
      );
    } else {
      return this.AlbumModel.find().populate('artist', 'name');
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const album = await this.AlbumModel.findOne({ _id: id });

    if (!album) {
      throw new NotFoundException(`Альбом с идентификатором ${id} не найден`);
    }
    return album;
  }
  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('photo', { dest: './public/uploads/albums' }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumData: CreateAlbumDto,
  ) {
    const album = new this.AlbumModel({
      name: albumData.name,
      artist: albumData.artist,
      year: albumData.year,
      isPublished: albumData.isPublished,
      photo: file ? '/uploads/albums' + file.filename : null,
    });
    return album.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const album = await this.AlbumModel.findByIdAndDelete(id);
    if (!album) {
      throw new NotFoundException('Нет такого альбома!');
    }
    return album;
  }
}
