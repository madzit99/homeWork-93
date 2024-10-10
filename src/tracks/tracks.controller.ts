import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from 'src/shemas/track.schema';
import { CreateTrackDto } from './create.track.dto';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll(@Query('albumId') albumId: string) {
    if (albumId) {
      return this.TrackModel.find({ album: albumId }).populate('album', 'name');
    }
    return this.TrackModel.find().populate('album', 'name');
  }

  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    const track = await this.TrackModel.create({
      name: trackDto.name,
      album: trackDto.album,
      duration: trackDto.duration,
      trackNumber: trackDto.trackNumber,
      isPublished: trackDto.isPublished,
    });
    return track;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const track = await this.TrackModel.findByIdAndDelete(id);
    if (!track) {
      throw new NotFoundException('Такого трека нету!');
    }

    return track;
  }
}
