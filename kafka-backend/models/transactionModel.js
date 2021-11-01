const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    g_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    payer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    amountToGetBack:{
        type: Number
    },
    currency: {
      type: String,
    },
    description: {
      type: String,
    },
    comments:[{
      u_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment:{
        type: String
      },
      created_at:{
        type: Date, 
        default: Date.now
      }
    }],
    ower: [
      {
        u_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        amount:{
            type: Number
        },
        is_settled: {
          type: Boolean,
          defaultValue: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
