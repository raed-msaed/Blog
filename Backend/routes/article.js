const express = require('express');

const app = express();

const router = express.Router();

const Article = require('../models/article');

const multer = require('multer');

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

app.post('/ajout', upload.any('image'), (req, res) => {

    let data = req.body;

    let article = new Article(data);

    article.date = new Date();

    article.image = filename;

    article.tags = data.tags.split(',');

    article.save()
        .then(
            (saved) => {
                filename = '';
                res.status(200).send(saved);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )


})

app.get('/all', (req, res) => {

})

app.get('/getbyid/:id', (req, res) => {

})

app.get('/getbyidauthor/:id', (req, res) => {

})

app.delete('/supprimer/:id', (req, res) => {

})

app.put('/update/:id', (req, res) => {

})



module.exports = router;