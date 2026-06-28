import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    googleId: string,
    name: string,
    email: string,
    image: string,
    subscription: Date | null,
    freeRequestUsed: number,

    hasProAccess(): boolean,
    canMakeRequest(): boolean,
}

const userSchema: Schema<IUser> = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        required: true
    },

    subscription: {
        type: Date,
        default: null,
    },

    freeRequestUsed: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

userSchema.methods.hasProAccess = function (): boolean {
    return !!this.subscription && new Date() < new Date(this.subscription);
}

userSchema.methods.canMakeRequest = function (): boolean {
    return this.hasProAccess() ? true : this.freeRequestUsed < 3;
}

const User = mongoose.model<IUser>("User", userSchema);

export default User;