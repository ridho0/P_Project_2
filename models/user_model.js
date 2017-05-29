const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name : {type: String, require: true},
  username : {type: String, require: true, unique: true},
  email : {type: String, require: true, unique: true},
  password : {type: String, require: true},
  role : {type: String, require: true},
  memolist : [{type: Schema.Types.ObjectId, ref: "memo"}]
})

let user = mongoose.model('user', userSchema)

module.exports = user
