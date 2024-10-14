import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { compare, hash, genSalt } from 'bcrypt';
import { randomUUID } from 'crypto';

const SALT_WORK_FACTOR = 10;
export type UserDocument = User & Document & UserMethods;

export interface UserMethods {
  generateToken: () => void;
  checkPassword: (password: string) => Promise<boolean>;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  token: string;

  @Prop()
  displayName: string;

  @Prop({ required: true, default: false, enum: ['user', 'admin'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.methods.checkPassword = function (password: string) {
  return compare(password, this.password);
};

UserSchema.pre<UserDocument>('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await genSalt(SALT_WORK_FACTOR);

  this.password = await hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});
