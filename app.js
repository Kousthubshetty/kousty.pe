const express = require('express');
const path = require('path');
// const wordGenerator;
var sendWords=[];
const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
// app.use(express.static(__dirname + '/'));
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

const static_path = path.join(__dirname);
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
app.post("/request", (req, res) => {
    ip=req.body.ip
    score=req.body.score
    console.log("IP:",ip,"Score:",score)
    // return res.redirect('/');
//     res.writeHead(301,{Location: '/'});
//   res.end();
    // res.json([{
    //    name_recieved: req.body.uid,
    //    designation_recieved: req.body.score
    // }])
 })

 app.get("/game", (req, res) => {
     difficulty=req.query['select']
     console.log(difficulty)
    //  console.log(req.query['adv'])
    // wordGenerator.selectedWordList=req.query['adv']
    var wordGenerator = require('./wordGenerator')(req.query['adv']);
    // const {wordlist} = require('./wordGenerator');
    setTimeout(()=>{
        require('./wordGenerator');
        sendWords=global.wordlist;
        console.log(sendWords); 
        res.sendFile(path.join(__dirname, '/keydownEvent.html'));
    }, 500);
 })

 app.post("/wordlist", (req, res) => {
    res.send(sendWords);
 })
 app.post("/difficulty", (req, res) => {
    res.send(difficulty);
    // res.send(difficulty);
 })

app.listen(port);
console.log('Server started at http://localhost:' + port);
// console.log(wl)