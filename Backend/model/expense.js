import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
     
    },

    category: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      // required: true,
    },

    
    amount: {
      type: Number,
      required: true,
    },

    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Expense", expenseSchema);