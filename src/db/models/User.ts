import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    avatar_url: string;
    username: string;
    password: string;
    email: string;
    birthDate: string;
    createdAt: Date;
    isVerifyed: boolean; 
}

const UserSchema: Schema = new Schema({
    avatar_url: {type: String, required: false},
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isVerifyed: {type: Boolean, default: false},
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;