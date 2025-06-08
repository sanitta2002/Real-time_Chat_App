const express = require("express")
const { execPath } = require("process")
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))


const PORT = 3000
app.listen(PORT,()=>{
    console.log("server is running")
})