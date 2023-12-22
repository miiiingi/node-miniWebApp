const express = require('express');
const app = express();
const fs = require('fs');
app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/form', function (req, res) {
    fs.readdir('data', function (err, files) {
    if (err){
        console.log(err);
    }
    res.render('form', {topics: files});
})});
app.post('/form', function (req, res) {
    var id = req.body.id;
    var passwd = req.body.passwd;
    console.log(req.body)
    fs.writeFile('data/' + id, passwd, function (err) {
        if (err){
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/home/' + id);
    });
});
app.get(['/home', '/home/:id'], function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err){
            console.log(err);
        }
        var id = req.params.id;
        if (id){
            fs.readFile('data/' + id, 'utf8', function (err, data) {
                if (err){
                    res.status(500).send('Internal Server Error');
                }
                res.render('home', {topics: files, title: id, description: data});
            })
        }
        else {
        res.render('home', {topics: files, title: 'Welcome', description: 'Hello, JS for Server '});
        }
    })
});
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});