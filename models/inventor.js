const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 26 },
  birth: { type: Date },
  death: { type: Date },
  country: { type: String, min: 3, max: 26 },
});

InventorSchema
    .virtual("url")
    .get(function () {
        return "/inventor/" + this._id;
    });

InventorSchema
    .virtual("lifespan")
    .get(function () {
        let lifetime_string = "";
        if (this.date_of_birth) {
            lifetime_string = this.date_of_birth.getYear().toString();
        }
        lifetime_string += " - ";
        if (this.date_of_death) {
            lifetime_string += this.date_of_death.getYear();
        }
        return lifetime_string;
    });

module.exports = mongoose.model("Inventor", InventorSchema);
