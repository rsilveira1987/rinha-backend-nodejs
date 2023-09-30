const express = require('express');
const app = new express();

// app settings
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type:'application/vnd.api+json'}));

// rotas
const indexRouter = require('./routes/index');
const pessoasRouter = require('./routes/pessoas');
app.use(indexRouter);
app.use(pessoasRouter);



// // HTML
// app.get('/', (req, res) => {
//     // res.sendFile(__dirname + "/views/index.html");
//     res.render('index', req.query);
// });

module.exports = app;