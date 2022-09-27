const express = require('express');
const path = require('path');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('players.db');
db.run("CREATE TABLE IF NOT EXISTS Players (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, name TEXT, score INTEGER DEFAULT 0)");

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


app.post("/login", (req, res) => {
    ip=req.body.ip
    pname=req.body.name
    count=0
    db.each("SELECT COUNT(*) as count FROM Players WHERE ip='"+ip+"'", function(err, row) {
        count=row.count
        // console.log(count)
        if (count==0)
        db.run("INSERT INTO Players (ip,name) VALUES ('"+ip+"','"+pname+"')")
        else
        db.run("UPDATE Players SET name='"+pname+"' WHERE ip='"+ip+"'")
      });
    console.log(ip,pname);
 })

app.post("/request", (req, res) => {
    ip=req.body.ip
    score=req.body.score
    console.log("IP:",ip,"Score:",score)
    db.run("UPDATE Players set score="+score+" WHERE ip='"+ip+"' AND score<"+score);

    // return res.redirect('/');
//     res.writeHead(301,{Location: '/'});
//   res.end();
    // res.json([{
    //    name_recieved: req.body.uid,
    //    designation_recieved: req.body.score
    // }])
 })

 app.post("/game", (req, res) => {
     difficulty=req.body.select
    // console.log(difficulty)
    // console.log(req.query['adv'])
    // wordGenerator.selectedWordList=req.query['adv']
    var wordGenerator = require('./wordGenerator')(req.body.adv);
    // const {wordlist} = require('./wordGenerator');
    setTimeout(()=>{
        require('./wordGenerator');
        sendWords=global.wordlist;
        // console.log(sendWords); 
        res.sendFile(path.join(__dirname, '/keydownEvent.html'));
    }, 500); 
 })
 
 app.post("/wordlist", (req, res) => {
    res.send(sendWords);
 })
 app.post("/difficulty", (req, res) => {
    res.send(difficulty);
 })

 
 app.post("/scoreboard", (req, res) => {
    var result=[]
    db.all("SELECT * FROM players ORDER BY score DESC", function(err, rows) {
        rows.forEach(function (row) {
            result.push([row.ip,row.name,row.score])
        });
        // console.log(result)
        res.send(result);
    });
 })

app.listen(port);
console.log('Server started at http://localhost:' + port);
// console.log(wl)