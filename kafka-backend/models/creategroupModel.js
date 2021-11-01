const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    g_name: {
      type: String,
    },
    members: [
        {
          ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          is_accepted: {
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

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group