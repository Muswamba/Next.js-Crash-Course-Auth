import mongoose, { Document, Schema } from "mongoose";
import dbConnect from "../../utils/mongodb";
import bcrypt from "bcrypt";
export interface IUser extends Document {
   username?: string;
   name: string;
   email: string;
   password: string;
   createdAt?: Date;
   image?: string;
   comparePassword(password: string): Promise<boolean>;
   resetToken: string;
   resetTokenExpiration: Date;
}

const userSchema: Schema = new Schema({
   name: { type: String, required: true },
   username: { type: String, required: false, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   image: { type: String, required: false },
   resetToken: { type: String, required: false },
   resetTokenExpiration: { type: Date, required: false },
});

// Pre-save middleware to hash the password before saving to the database
userSchema.pre<IUser>("save", async function (next) {
   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
   }
   next();
});

// Add method to compare passwords
userSchema.methods.comparePassword = async function (
   candidatePassword: string
) {
   return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

const createUser = async (userData: Partial<IUser>) => {
   await dbConnect();
   const user = new User(userData);
   return user.save();
};

// save a password reset token and expiration date
const savePasswordResetToken = async (
   userId: string,
   resetToken: string,
   resetTokenExpiration: Date
) => {
   await dbConnect();
   await User.findByIdAndUpdate(userId, {
      resetToken: resetToken,
      resetTokenExpiration: resetTokenExpiration,
   }).exec();
};

const findUserByEmail = async (email: string) => {
   await dbConnect();
   return User.findOne({ email }).exec();
};
// find user by username
const findUserByUsername = async (username: string) => {
   await dbConnect();
   return User.findOne({ username }).exec();
};

export {
   User,
   createUser,
   findUserByEmail,
   findUserByUsername,
   savePasswordResetToken,
};
