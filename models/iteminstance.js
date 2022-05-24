const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  acquired: { type: Date, default: Date.now },
  crafted: { type: Boolean, default: false },
});

ItemInstanceSchema
    .virtual("url")
    .get(function () {
  return "/iteminstance/" + this._id;
});

module.exports = mongoose.model("ItemInstance", ItemInstanceSchema);
