import { Document, Types, Model } from 'mongoose';

export interface UserInt extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  tokens: { token: string }[];
}

export interface IntUser extends UserInt {
  generateAuthToken: () => string;
}

export interface IntUserModel extends Model<IntUser> {
  findByCredentials: (username: string, password: string) => IntUser;
}
