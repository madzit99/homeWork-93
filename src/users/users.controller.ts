import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/shemas/user.shema';
import { error } from 'console';
import { RegisterUserDto } from './register.user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  @Post()
  async registerUser(@Body() UserData: RegisterUserDto) {
    try {
      const user = new this.UserModel({
        email: UserData.email,
        password: UserData.password,
        displayName: UserData.displayName,
        role: UserData.role,
      });
      user.generateToken();

      return await user.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw new UnprocessableEntityException(error);
    }
    throw error;
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async login(@Req() req: Request) {
    return { message: 'Зарегистрирован.', user: req.user };
  }

  @Delete('sessions')
  async deleteUser(@Req() req: Request) {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return { message: 'Error! No header!' };
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return { message: 'Error! No token!' };
    }

    const user = await this.UserModel.findOne({ token });

    if (!user) {
      return { message: 'Error! No user!' };
    }

    user.generateToken();
    await user.save();

    return { message: 'User logged out.' };
  }
}
