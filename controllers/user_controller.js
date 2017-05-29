const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  register : (req, res)=>{
    let hash = bcrypt.hashSync(req.body.password, 8)
    User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: "user",
      memolist: []//req.body.memolist
    },(err, record)=>{
      err ? res.json({err}) : res.json(record)
    })
  },
  login: (req, res) => {
    User.findOne({username : req.body.username}, (err, user) =>{
      if(err)
        res.json(err)
      if(bcrypt.compareSync(req.body.password, user.password)){
        let token = jwt.sign({username: user.username, role: user.role, id: user._id}, 'secreet_key')
        res.json(token)
      }
    })
  },
  new : (req, res)=>{
    let hash = bcrypt.hashSync(req.body.password, 8)
    User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: req.body.role,
      memolist: []//req.body.memolist
    },(err, record)=>{
      err ? res.json({err}) : res.json(record)
    })
  },
  findOne : (req, res)=> {
    User.findOne({_id : req.params.id},(err, users) => {
      err ? res.json({err}) : res.json(users)
    })
  },
  findAll : (req, res)=> {
    User.find({},(err, users) => {
      err ? res.json({err}) : res.json(users)
    })
  },
  update : (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 8)
    User.findById(req.params.id, (err, user) => {
      if(err)
        res.json({err})
      User.update({_id : req.params.id},{
        $set: {
          name: req.body.name || user.name,
          username: req.body.username || user.username,
          email: req.body.email || user.email,
          password: hash || user.password,
          role: req.body.role || user.role
        }}, (err, record)=>{
          err ? res.json({err}) : res.send("berhasil update")
        })
    })
  },
  delete : (req, res) => {
    User.findByIdAndRemove(req.params.id,(err, record)=>{
      err ? res.json({err}) : res.send("terhapus")
    })
  }
}
