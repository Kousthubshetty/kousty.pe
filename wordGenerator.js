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
  // exports.wordlist=wordlist;
  // module.exports.wl = {wordlist};
  // module.exports.wl=wordlist
  // console.log(global.wordlist);
  // return wordlist;
  // module.exports=wordlist;
});
}


// axios
// 	.get('https://www.scrapingbee.com/blog/web-scraping-javascript/')
// 	.then((response) => {
// 		console.log(response)
// 	})
// 	.catch((error) => {
// 		console.error(error)
// 	});
// console.log(wordlist,"aaa")
