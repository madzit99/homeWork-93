import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from 'src/shemas/artist.schema';
import { CreateArtistDto } from './create.artist.dto';
import { TokenAuthGuard } from 'src/auth/token-auth/token-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { TokenPermitGuard } from 'src/auth/token-auth/token-permit.guard';

@Controller('artits')
export class ArtitsController {
  constructor(
    @InjectModel(Artist.name) private ArtistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.ArtistModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const artist = await this.ArtistModel.findOne({ _id: id });

    if (!artist) {
      throw new NotFoundException(`Артист с идентификатором ${id} не найден!`);
    }

    return artist;
  }
  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('photo', { dest: './public/uploads/artists' }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistData: CreateArtistDto,
  ) {
    const artist = new this.ArtistModel({
      name: artistData.name,
      information: artistData.information,
      isPublished: artistData.isPublished,
      photo: file ? '/uploads/artists' + file.filename : null,
    });
    return artist.save();
  }

  @Roles('admin')
  @UseGuards(TokenAuthGuard, TokenPermitGuard)
  @Delete(':id')
  async gelete(@Param('id') id: string) {
    const artist = await this.ArtistModel.findByIdAndDelete(id);
    if (!artist) {
      throw new NotFoundException('Нет такого Артиста!');
    }
    return artist;
  }
}
