const express = require('express')
const app = express()
const port = 80
require('dotenv').config()
const axios = require('axios');
const cors = require('cors')
const Joi = require('joi');
const bodyParser = require("body-parser");
const apiKey=process.env.APIKEY;
app.use(cors());
app.use(bodyParser.raw())
app.use(express.urlencoded({ extended: true }));


const courseSchema = Joi.object({
    nome: Joi.string().allow(null, ''),
    email: Joi.string().required().email(),
    course_id: Joi.string().required()
})



app.post('/new', async (req, res) => {
    const isOk = courseSchema.validate(req.body)
    if (isOk.error) return res.status(400).json({message: isOk.error.details[0].message});
    else {
        const newUser = {
                email: req.body.email,
                name: req.body.name,
                course_id: req.body.course_id
        };
        axios.post('https://thrivecart.com/api/external/students', newUser, {
            headers: {
                'content-type': 'text/json',
                "Authorization": 'Bearer '+ apiKey
            }
        }).then(resp => {
            console.log(res)
            return res.status(200).json({message: 'ok'})
        }).catch(err => {
            console.log(err)
            return res.status(400).json({err})
        })
    }
    })
//
// app.post('/', async (req,res) => {
//
//     console.log(req.body)
//
//     return res.status(200)
// })


app.listen(port, () => {
    console.log(`Online`)
})
