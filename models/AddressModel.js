import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    houseNo: {
      type: String,
      required: [true, "House number is required"],
      trim: true,
      //Increase characters length if need.
      maxlength: [25, "House number cannot exceed 25 characters"],
    },
    addressLine: {
      type: String,
      required: [true, "Address line is required"],
      trim: true,
      maxlength: [100, "Address line cannot exceed 100 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [50, "City cannot exceed 50 characters"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
      maxlength: [50, "State cannot exceed 50 characters"],
    },
    zipCode: {
      type: String,
      required: [true, "Zip code is required"],
      trim: true,
      match: [/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: [50, "Country cannot exceed 50 characters"],
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export { Address };
