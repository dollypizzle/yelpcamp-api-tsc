import { model, Schema, Document } from 'mongoose';
import { IntUser, IntUserModel } from './user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    tokens: [{ token: { type: String, required: true } }],
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

userSchema.virtual('campgrounds', {
  ref: 'Campground',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function(): Document {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function(): Promise<string> {
  const token: string = jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET || ''
  );

  this.tokens = this.tokens.concat({ token });

  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async (
  username: string,
  password: string
): Promise<IntUser> => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.pre<IntUser>('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const plaintext = this.get('password');
  this.set('password', bcrypt.hashSync(plaintext, 8));
  next();
});

const User: IntUserModel = model<IntUser, IntUserModel>('User', userSchema);

export { User };
