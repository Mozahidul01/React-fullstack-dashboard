import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
      validate: {
        validator: function (email) {
          // Regex to validate email format
          const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          return emailRegex.test(email);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (password) {
          // Regex to validate password format
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
          return passwordRegex.test(password);
        },
        message:
          "Password must contain at least one letter, one number, and be at least six characters long",
      },
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    state: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    country: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    occupation: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    transactions: {
      type: Array,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: { currentTime: () => new Date().toLocaleString() } }
);

const User = mongoose.model("User", userSchema);
export default User;
