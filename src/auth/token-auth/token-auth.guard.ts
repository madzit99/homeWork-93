import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/shemas/user.shema';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headerValue = request.get('Authorization');

    if (!headerValue) {
      return false;
    }

    const [_, token] = headerValue.split(' ');

    if (!token) {
      return false;
    }

    const user = await this.userModel.findOne({ token });

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}

