const express = require('express');

const articleApi = require('./routes/article'); //lien for router article

const authorApi = require('./routes/author'); //lien for router article

require('./config/connect');

const app = express();

app.use('/article', articleApi);

app.use('/author', authorApi);

app.use('/getimage', express.static('./uploads'));

app.listen(3000, () => {
    console.log('server work')
})