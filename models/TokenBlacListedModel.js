import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1h" }, // Automatically remove after token expires
});

export const TokenBlacklist = mongoose.model(
  "TokenBlacklist",
  tokenBlacklistSchema
);
