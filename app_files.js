const express = require('express');
const app = express();
const fs = require('fs');
app.locals.pretty = true;
app.set('views', './views_files');
app.set('view engine', 'pug');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/topic', function (req, res) {
    var id = req.body.id;
    var passwd = req.body.passwd;
    console.log(req.body)
    fs.writeFile('data/' + id, passwd, function (err) {
        if (err){
            res.status(500).send('Internal Server Error');
        }
        res.send('Sucess!');
    });

});
app.get('/topic', function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err){
            console.log(err);
        }
        res.render('view', {topics: files});
    })
});
app.get('/topic/new', function (req, res) {
    res.render('new');
});
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});