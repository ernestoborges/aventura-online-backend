import mongoose, { Schema, Document } from 'mongoose';

export interface IActiveSession extends Document {
    refreshToken: string
    lastAccessedAt: Date
}

const ActiveSessionSchema: Schema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    refreshToken: { type: String, required: true },
    lastAccessedAt: { type: Date, required: true, default: Date.now }
});

const ActiveSession = mongoose.model<IActiveSession>('ActiveSession', ActiveSessionSchema);

export default ActiveSession;