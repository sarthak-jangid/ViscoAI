import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
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
});
userSchema.methods.hasProAccess = function () {
    return !!this.subscription && new Date() < new Date(this.subscription);
};
userSchema.methods.canMakeRequest = function () {
    return this.hasProAccess() ? true : this.freeRequestUsed < 3;
};
const User = mongoose.model("User", userSchema);
export default User;
