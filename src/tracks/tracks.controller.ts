import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from 'src/shemas/track.schema';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.TrackModel.find();
  }
}
