const route = require('express').Router()
const user_controller = require('../controllers/user_controller')
const memo_controller = require('../controllers/memo_controller')
const cek = require('../helpers/help')

route.get('/',(req, res)=>{
  res.send("hey you !!")
})

route.post('/register', user_controller.register)
route.post('/login', user_controller.login)

route.post('/user/new',cek.isLogin, user_controller.new)
route.get('/user/:id',cek.isLogin, user_controller.findOne)
route.get('/user',cek.isLogin, cek.isAuthorized, user_controller.findAll)
route.put('/user/:id',cek.isLogin, user_controller.update)
route.delete('/user/:id',cek.isLogin, user_controller.delete)

route.post('/memo/new',cek.isLogin, memo_controller.new)
route.get('/memo/:id',cek.isLogin, memo_controller.findOne)
route.get('/memo',cek.isLogin, memo_controller.findAll)
route.put('/memo/:id',cek.isLogin, memo_controller.update)
route.delete('/memo/:id',cek.isLogin, memo_controller.delete)

module.exports = route
