const express = require('express');

const articleApi = require('./routes/article'); //lien for router article

const authorApi = require('./routes/author'); //lien for router article

const cors = require('cors');

require('./config/connect');

const app = express();

app.use(express.json()); //for accept data formatr json (where used login & password)

app.use(cors());

app.use('/article', articleApi);

app.use('/author', authorApi);

app.use('/getimage', express.static('./uploads'));

app.listen(3000, () => {
    console.log('server work')
})