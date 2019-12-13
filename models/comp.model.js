const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const compSchema = new Schema({

  compName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  image: {
    data: Buffer,
    contentType: String
  },

  desc: {
    type: String
  },

}, {
  timestamps: true,
});

const MernComponent = mongoose.model('Component', compSchema);

module.exports = MernComponent;