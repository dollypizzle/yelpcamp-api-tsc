import { model, Schema, Model } from 'mongoose';
import { IntCampground } from './campround.interface';

const campgroundSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const Campground: Model<IntCampground> = model<IntCampground>(
  'Campground',
  campgroundSchema
);

export default Campground;
