import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    birthDate: string;
    createdAt: Date;
    isEmailVerified: boolean; 
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isVerified: {type: Boolean, default: false},
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;