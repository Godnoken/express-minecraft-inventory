const mongoose = require("mongoose");
const { DateTime } = require("luxon");


const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  acquired: { type: Date, default: Date.now },
  crafted: { type: Boolean, default: false },
});

ItemInstanceSchema
    .virtual("url")
    .get(function () {
  return "/inventory/iteminstance/" + this._id;
});

ItemInstanceSchema
    .virtual("days_since_acquired")
    .get(function () {
      return Math.floor(DateTime.now().diff(DateTime.fromJSDate(this.acquired)).as("day")) //format 'YYYY-MM-DD'
    });

module.exports = mongoose.model("ItemInstance", ItemInstanceSchema);
