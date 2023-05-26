const express = require('express')

const articleApi = require('./routes/article'); //lien for routes article


require('./config/connect');

const app = express();





app.listen(3000, () => {
    console.log('server work')
})