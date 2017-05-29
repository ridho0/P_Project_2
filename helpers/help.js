const jwt = require('jsonwebtoken');
// const db = require('../models')
require('dotenv').config()

module.exports = {
  isLogin: function(req, res, next) {
    // let decoded = jwt.verify(req.headers.token, process.env.secret)
    // console.log("========",decoded,"==========");
    jwt.verify(req.headers.token, process.env.secret, function(err, decoded) {
      if (decoded) {
        next()
      } else {
        // console.log("========",decoded,"==========");
        res.send('selamat datang')
      }
    })
  },
  isAuthorized: function(req, res, next) {
    jwt.verify(req.headers.token, process.env.secret, function(err, decoded) {
      if (decoded.role == "admin") {
        next()
      } else {
        res.send('You not Authorized !')
      }
    })
  },
  isItYours: function(req, res, next) {
    jwt.verify(req.headers.token, process.env.secret, function(err, decoded) {
      if (decoded.id == req.params.id || decoded.role == "admin") {
        next()
      } else {
        res.send('You not Authorized !')
      }
    })
  },
  // isUnique: function(req, res, next) {
  //   db.User.findOne({ where: {username:req.body.username} })
  //     .then(user => {
  //       if( user ) {
  //         res.send("user sudah ada")
  //       } else {
  //         next()
  //       }
  //     })
  //     // next()
  // }
}
