const express = require('express');

const router = express.Router();

const Author = require('../models/author');

const multer = require('multer');

const bcrypt =require('bcrypt');

const jwt = require('jsonwebtoken');

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




router.post('/login',async (req, res)=>{
    let data = req.body;

    user = await Author.findOne({email: data.email})
        .then(
            (access)=>{
                let valid = bcrypt.compareSync(data.password, access.password);
                if(!valid){
                    res.send('email or password invalid! ');
                }else{
                    let payload = {
                        _id: access._id,
                        email: access.email,
                        fullname: access.name + ' ' + access.lastname
                    }
                    let token = jwt.sign(payload, '123456789');
                    res.status(200).send({ mytoken: token })
                }
            }
        )
        .catch(
            err=>{
                res.status(400).send(err);
            }
        )

   /*******************************2eme methode*********************************/
   /*if(!user){
        res.status(404).send('Email or Password invalid ! ')
    }else{
        validPass = bcrypt.compareSync(data.password , user.password)

        if(!validPass){
            res.status(401).send('email or password invalid ! ')
        }else{
            payload = {
                _id: user._id,
                email: user.email,
                name: user.name
            }
            token = jwt.sign(payload, '123456789'); // in signe token two param " payload object created and signed it token with secret key '1234567' "

            res.status(200).send({ mytoken : token });
        }
    }*/
      
})

router.post('/all', (req, res)=>{
    Author.find({})
        .then(
            (author) => {
                res.status(200).send(author);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

router.get('/getbyid/:id', (req, res)=>{
    let id = req.params.id;

    Author.findOne({ _id: id })
        .then(
            (author) => {
                res.status(200).send(author);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

router.delete('/supprimer/:id', (req, res)=>{
    let id = req.params.id;
    Author.findByIdAndDelete({_id:id})
        .then(
            (author) => {
                res.status(200).send(author);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

router.put('/update/:id', upload.any('image'), (req, res) => {
    let id = req.params.id;
    let data = req.body;
    //data.tags = data.tags.split(',');
    if(filename.length > 0){
        data.image = filename;
    }
    Author.findByIdAndUpdate({_id:id}, data)
        .then(
            (author) => {
                filename = '';
                res.status(200).send(author);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
    


})

module.exports = router;