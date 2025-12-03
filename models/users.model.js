import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Users = model("Users", userSchema);

export default Users;
