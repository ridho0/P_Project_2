const Memo = require('../models/memo_model')
const User = require('../models/user_model')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = {
  new : (req, res)=>{
    let decoded = jwt.verify(req.headers.token, process.env.secret)
    Memo.create({
      title : req.body.title,
      text : req.body.text,
      user_id : decoded.id
    },(err, memo)=>{
      if(err)
        res.json({err}, "err while create memo")
      User.findByIdAndUpdate(
        decoded.id,
        {$push: {"memolist": memo}},
        {safe: true, upsert: true, new: true},
        function(err, user){
          if(err)
            res.json({err}, "err while push to user")
          res.send(memo)
        })
    })
  },
  findAll : (req, res) => {
    let decoded = jwt.verify(req.headers.token, process.env.secret)
    console.log("====", decoded);
    Memo.find({user_id : decoded.id}, (err, memos)=> {
      err ? res.json({err}) : res.json(memos)
    })
  },
  findOne : (req, res) => {
    let decoded = jwt.verify(req.headers.token, process.env.secret)
    // Memo.find({username : decoded.username}, (err, memos)=> {
    //   if(err)
    //     res.json({err})
      Memo.findOne({_id : req.params.id}, (err, memos)=> {
        err ? res.json({err}) : res.json(memos)
      })
    // })
  },
  update : (req, res) => {
    let decoded = jwt.verify(req.headers.token, process.env.secret)
    Memo.findById(req.params.id, (err, memo)=> {
      if(err)
        res.json({err})
      if(decoded.id == memo.user_id){
        Memo.findByIdAndUpdate({_id : req.params.id}, {
          $set : {
            title : req.body.title,
            text : req.body.text
          }
        },{safe: true, upsert: true, new: true},(err, memos)=> {
          err ? res.json({err}) : res.json(memos)
        })
      }
      else{
        res.send("you not Authorized")
      }
    })
  },
  delete : (req, res) => {
    let decoded = jwt.verify(req.headers.token, process.env.secret)
    Memo.findById(req.params.id, (err, memo)=> {
      if(err)
        res.json({err})
      if(decoded.id == memo.user_id){
        Memo.findByIdAndRemove(req.params.id, (err, memo)=> {
          if(err)
          res.json({err})
          User.findByIdAndUpdate(
            decoded.id,
            {$pull: {"memolist": req.params.id }},
            {safe: true, upsert: true, new: true},
            function(err, user){
              if(err)
              res.json({err})
              // res.send("berhasil delete")
              res.json(memo)
            })
          })
      }
      else{
        res.send("you not Authorized")
      }
    })
  }
}
