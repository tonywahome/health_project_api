import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  userType: "doctor" | "patient";
  createAt: Date;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: ["doctor", "patient"] },
  createAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
