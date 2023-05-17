import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    avatar_url: string;
    username: string;
    password: string;
    email: string;
    birthDate: string;
    createdAt: Date;
    isVerifyed: boolean;
    refreshToken: string; 
}

const UserSchema: Schema = new Schema({
    avatar_url: {type: String, default: "https://res.cloudinary.com/dx8g3oqzk/image/upload/v1684160110/default-user-avatar.png"},
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isVerifyed: {type: Boolean, default: false},
    refreshToken: {type: String, required: false},
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;