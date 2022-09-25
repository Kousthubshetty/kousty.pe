//const axios = require("../../node_modules/axios")
// import axios from "../../node_modules/axios"
let difficulty="shard"
let bonus
// console.log(axios)
var sdestroyed = new Audio("word-destroyed.mp3")
var smissed = new Audio("word-missed.mp3")
var kwrong = new Audio("wrong-key.mp3")

let missed=0,fallSpeed,wordgenerateTime,totalspanCreated=0,keyString="",score=0,totalScore=0
// paragraphs="Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the Paragraph"
// wordList=paragraphs.toLowerCase().split(' ')
// var wordlist=[]
// wordList=<%= wl %>
wordsonScreen=[]

// ----------------------------
axios.post('/wordlist', {})
.then(function (response) {
	words=response.data;
})
.catch(function (error) {
	alert("Something went wrong");
    history.back()
});
axios.post('/difficulty', {})
.then(function (response) {
	difficulty=response.data;
})
.catch(function (error) {
	alert("Something went wrong");
    history.back()
});
// ----------------------------



function keyEvent(event){
    key=event.key
    if (key>='a' && key<='z'){
    keyString+=key
    matchWord(keyString)
    //console.log(keyString) //or event.keyCode / event.which
    }else{
        kwrong.play()
        // console.log("Turn of caps lock OR Try Press only Alphabets")
    }
}

function generateWords(){
    if(difficulty==="shard"){
        fallSpeed=window.innerHeight*12
        wordgenerateTime=2000
        bonus=20
    }else if(difficulty==="smedium"){
        fallSpeed=window.innerHeight*15
        wordgenerateTime=2000
        bonus=15
    }else{
        fallSpeed=window.innerHeight*15
        wordgenerateTime=5000
        bonus=10
    }
    wordList=words
    // let allspan=""
    const main=document.createElement("div");
    main.setAttribute("class","main")
    main.setAttribute("id","main")
    document.body.appendChild(main)
    setInterval(()=>{
        // const box = document.getElementById('main');
        // const allChildren = box.getElementsByTagName('*').length;
        // console.log(allChildren+1)
        totalspanCreated=totalspanCreated+1

        // console.log("hii")
        spanid="word"+Math.floor(Math.random() * 100000)
        locationX=Math.floor(Math.random() * (window.innerWidth-39))+"px"
        if(parseInt(locationX)<=5){
            locationX=Math.floor(Math.random() * (window.innerWidth-39))+"px"
        }
        // locationX=(Math.floor(Math.random() * (window.innerWidth - 10) ) + 10)+"px";

        span=document.createElement('span');
        span.setAttribute('id',spanid);
        span.setAttribute('class','dropdown');
        span.setAttribute('style','left:'+locationX+';');
        fallingWord=wordList.pop()
        // wordsonScreen.push(fallingWord)
        // wordsonscreenId.push(spanid)
        wordsonScreenn = {}
        wordsonScreenn.id=spanid
        wordsonScreenn.word=fallingWord
        wordsonScreen.push(wordsonScreenn)
        span.appendChild(document.createTextNode(fallingWord));
        
        // allspan="<span class='dropdown' id='"+spanid+"' style='left:"+locationX+";'>hiii</span>";
        main.appendChild(span);
        drop(spanid)
        // document.getElementById(spanid).style.left=Math.trunc(Math.random() * window.innerWidth)+"px";
    },wordgenerateTime)
}



function drop(spanid){
anime({
    targets: '#'+spanid,
    translateY: window.innerHeight-39,
    delay: 400,
    duration: fallSpeed,
    easing: 'easeInOutSine'
    });
    setTimeout(()=>{
        spann=document.getElementById(spanid)
        if(spann){
            spann.remove()
            // score-=2
            wordsonScreen=wordsonScreen.reduce((p,c) => (c.id !== spanid && p.push(c),p),[]);
            smissed.play();
            missed=missed+1
        }

        if(missed>5 && missed>Math.floor(totalspanCreated*0.25)){
            // alert("ended")
            sendScoreToServer(totalScore)
            window.location='/';
        }
    },fallSpeed+500)
}

function matchWord(key){
    // wordsonScreen.find(e => e.word == "the");
    for (x in wordsonScreen){
        regexMatch(wordsonScreen[x].id,wordsonScreen[x].word,key)
    }
}

function regexMatch(id,listWord,typedWord){
    if(typedWord.search(listWord)>=0){
        sdestroyed.play();
        console.log("found")
        score+=1
        keyString=""
        document.getElementById(id).remove()
        wordsonScreen=wordsonScreen.reduce((p,c) => (c.word !== listWord && p.push(c),p),[]);
    }
    totalScore=score*bonus
    document.getElementById("score").innerHTML=totalScore
}


function sendScoreToServer(uscore) {
    $.getJSON("https://api.ipify.org?format=json", function(data) {
          myIP=data.ip;
      })
    $.post("/request",
       {
          ip: myIP,
          score: uscore
       },
       function (data, status) {
          console.log(data);
       });
 }
//  console.log(wl)