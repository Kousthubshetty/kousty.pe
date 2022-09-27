const fs = require('fs');

// const axios = require('axios')
var File;
// var wordlist = [];

// console.log(selectedWordList)
module.exports = (selectedWordList)=>{
let def = './WordList/default.txt';
let c = './WordList/c.txt';
let java = './WordList/java.txt';
let php = './WordList/php.txt';
let python = './WordList/python.txt';
let sql = './WordList/sql.txt';
let js = './WordList/js.txt';
let fromURL = './WordList/url.txt';
if(selectedWordList=="c"){
File=c;
}else if(selectedWordList=="java"){
File=java;
}else if(selectedWordList=="php"){
File=php;
}else if(selectedWordList=="python"){
File=python;
}else if(selectedWordList=="sql"){
File=sql;
}else if(selectedWordList=="js"){
File=js;
}else if(selectedWordList=="utl"){
File=fromURL;
}else if(selectedWordList=="def"){
File=def;
}
fs.readFile(File, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  global.wordlist=data.split(",");
  wordlist = [...new Set(wordlist)]
  shuffleArray(wordlist)
  // exports.wordlist=wordlist;
  // module.exports.wl = {wordlist};
  // module.exports.wl=wordlist
  // console.log(global.wordlist);
  // return wordlist;
  // module.exports=wordlist;
});
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

