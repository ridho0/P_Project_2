const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/p_project_2')

let index = require('./routes')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", index)

app.listen(3000, ()=>{ console.log("listening on port : 3000"); })

// module.exports = app
