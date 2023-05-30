const express = require('express');

const router = express.Router();

const Author = require('../models/author');

const multer = require('multer');

const bcrypt =require('bcrypt');

/******************************IMAGE*****************************************/
filename = '';
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();

        let fl = date + '.' + file.mimetype.split('/')[1];

        redirect(null, fl);

        filename = fl;
    }
})

const upload = multer({ storage: mystorage })
/*******************************End Image*************************************/


router.post('/register', upload.any('image'), (req, res)=>{
    data = req.body;
    author = new Author(data);

    author.image = filename;

    salt = bcrypt.genSaltSync(10);

    author.password = bcrypt.hashSync(data.password , salt);

    author.save()
        .then(
            (savedAuthor)=>{
                filename="";
                res.status(200).send(savedAuthor);
            }
        )
        .catch(
            err=>{
                res.status(400).send(err);
            }
        )

})




router.post('/login', (req, res)=>{

})

router.post('/all', (req, res)=>{

})

router.post('/getbyid/:id', (req, res)=>{

})

router.post('/supprimer/:id', (req, res)=>{

})

module.exports = router;