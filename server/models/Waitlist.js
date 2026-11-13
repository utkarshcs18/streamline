import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const waitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
      match: [emailRegex, "Please provide a valid email address"],
      index: true,
    },
    interest: {
      type: String,
      trim: true,
      maxlength: [500, "Interest cannot exceed 500 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "invited", "unsubscribed"],
      default: "active",
      index: true,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Helpful compound index for fast chronological lookups
waitlistSchema.index({ createdAt: -1 });

const Waitlist = mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);

export default Waitlist;
