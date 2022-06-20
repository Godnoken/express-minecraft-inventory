const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        name: { type: String, required: true, min: 3, max: 20 },
        description: { type: String, required: true, min: 5, max: 50 },
        value: { type: Number, required: true },
        inventor: { type: Schema.Types.ObjectId, ref: "Inventor", required: true },
        type: [{ type: Schema.Types.ObjectId, ref: "Type", required: true }],
        craftingMaterials: [{ type: Schema.Types.ObjectId, ref: "Item" }],
        image: { type: Schema.Types.Buffer }
    }
);

ItemSchema
    .virtual("url")
    .get(function () {
        return "/inventory/item/" + this._id;
    });

module.exports = mongoose.model("Item", ItemSchema);