import mongoose, { Schema, Document } from 'mongoose';

export interface IActiveSession extends Document {
    refreshToken: string
}

const ActiveSessionSchema: Schema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    refreshToken: { type: String, required: true }
});

const ActiveSession = mongoose.model<IActiveSession>('ActiveSession', ActiveSessionSchema);

export default ActiveSession;