const express = require('express')
const bodyParser =  require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

require('./controllers/authController')(app)
require('./controllers/projectController')(app)
app.listen(3000)