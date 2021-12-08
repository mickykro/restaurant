
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {router} = require('./routes/routes')


const app = express();
app.use(bodyParser.json({ extended:true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());



const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, ()=>{
    console.log('listening');
})

app.use(express.static('website'));

app.use('/', router);


