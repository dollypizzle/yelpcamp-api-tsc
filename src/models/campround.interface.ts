import { Document, Schema } from 'mongoose';

export interface IntCampground extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
  owner: Schema.Types.ObjectId;
}
