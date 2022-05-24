const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        name: { type: String, required: true, min: 3, max: 20 },
        description: { type: String, required: true, min: 5, max: 50 },
        category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
        value: { type: Number, required: true },
        Inventor: { type: Schema.Types.ObjectId, ref: "Inventor", required: true },
        craftingMaterials: [{ type: Schema.Types.ObjectId, ref: "Item" }]
    }
);

ItemSchema
    .virtual("url")
    .get(function () {
        return "/item/" + this._id;
    });

module.exports = mongoose.model("Item", ItemSchema);