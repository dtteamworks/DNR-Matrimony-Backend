import mongoose from "mongoose";

const EnquireProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Minimum age is 18"],
      max: [100, "Maximum age is 100"],
    },

    religion: {
      type: String,
      required: [true, "Religion is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: "Please enter a valid 10-digit phone number",
      },
    },

    enquirerDescription: {
      type: String,
      required: [true, "Enquirer description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    Pic: {
      type: String,
      trim: true,
    },

    ProfileID: {
      type: String,
      required: [true, "Profile ID is required"],
      trim: true,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    enquirerCaste: {
      type: String,
      required: [true, "Enquirer caste is required"],
      trim: true,
      maxlength: [50, "Caste cannot exceed 50 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
EnquireProfileSchema.index({ ProfileID: 1 });
EnquireProfileSchema.index({ phone: 1 });
EnquireProfileSchema.index({ submittedAt: -1 });

// Create and export the model
const EnquireProfile = mongoose.model("EnquireProfile", EnquireProfileSchema);

export default EnquireProfile;
