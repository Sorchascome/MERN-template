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

  order: {
    type: Number
  }

}, {
  timestamps: true,
})

compSchema.pre('save', function(next) {
  if (!this.order) {
    let comp = this
    MernComponent.countDocuments({}, function(err, count) {
      comp.order = count++
      next()
    })
  }
})

const MernComponent = mongoose.model('Component', compSchema)

module.exports = MernComponent;