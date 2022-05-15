const mongoose = require("mongoose");

const CharSchema = new mongoose.Schema({
  background: {
    name: { type: String },
    childhood: { type: String },
    adolescence: { type: String },
    adulthood: { type: String },
  },

  life: {
    health: {
      max: { type: Number },
      current: { type: Number },
    },
    sanity: {
      max: { type: Number },
      current: { type: Number },
    },
    mana: {
      max: { type: Number },
      current: { type: Number },
    },
  },

  stats: {
    power: {
      body: { type: Number },
      mind: { type: Number },
      soul: { type: Number },
    },
    resilience: {
      body: { type: Number },
      mind: { type: Number },
      soul: { type: Number },
    },
  },
});

module.exports = mongoose.model("Char", CharSchema);
