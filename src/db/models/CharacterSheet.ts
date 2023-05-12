import mongoose, { Schema, Document, Types } from 'mongoose';

interface ICharacter extends Document {
    userId: Types.ObjectId,
    level: number,
    xp: number,
    name: string;
    race: string;
    characterClass: string;
    createdAt: Date;
}

const CharacterSheetSchema: Schema = new Schema({
    level: { type: Number, min: 1, max: 20, default: 1 },
    xp: { type: Number, get: (v: number) => Math.floor(v), min: 0, max: 999999 },
    name: { type: String, required: true },
    race: { type: String, required: true },
    characterClass: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: {type: Types.ObjectId, required: true}
});

const CharacterSheet = mongoose.model<ICharacter>('CharacterSheet', CharacterSheetSchema);

export default CharacterSheet;