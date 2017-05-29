const mongoose = require('mongoose')
const Schema = mongoose.Schema

let memoSchema = new Schema({
  title : {type: String, default: Date.now},
  text : {type: String},
  user_id : {type: Schema.Types.ObjectId, ref: "user"}
})

let memo = mongoose.model('memo', memoSchema)

module.exports = memo
