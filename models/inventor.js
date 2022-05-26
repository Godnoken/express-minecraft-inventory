const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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
        return "/inventory/inventor/" + this._id;
    });

InventorSchema
    .virtual("lifespan")
    .get(function () {
        let lifetime_string = "";
        if (this.birth) {
            lifetime_string = this.birth.getYear().toString();
        }
        lifetime_string += " - ";
        if (this.death) {
            lifetime_string += this.death.getYear();
        }
        return lifetime_string;
    });

InventorSchema
    .virtual('birth_formatted')
    .get(function() {
        return DateTime.fromJSDate(this.birth).toISODate(); //format 'YYYY-MM-DD'
    });

InventorSchema
    .virtual('death_formatted')
    .get(function() {
        return DateTime.fromJSDate(this.death).toISODate(); //format 'YYYY-MM-DD'
    });

module.exports = mongoose.model("Inventor", InventorSchema);
