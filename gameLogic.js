window.addEventListener("load",loadResources);
window.addEventListener("resize",storeResources);
var subject = {
    points:0,
    tries:0
};

function loadResources(){
    console.log(sessionStorage);
    if(sessionStorage.length<=0)
    { sessionStorage.setItem("ID","USER");}
    else if(sessionStorage.length>1)
    {
    //    loadSubjectData();
    }

}
function loadSubjectData(){
    console.log(sessionStorage);
    for(var i = 1; i<sessionStorage.length;i++)
    {
        var key = sessionStorage.key(i);
        switch (key) {
            case 'points':
                subject.points=parseInt(sessionStorage.getItem(key));
                break;
            case 'tries':
                subject.tries = parseInt(sessionStorage.getItem(key));
                break;
            default:
                break;
        }
    }
    console.log("Subject data loaded.");
    console.log(subject);
}

function storeResources(){
    
    if(sessionStorage.length<=0)
    {
        sessionStorage.setItem("ID","USER");
    }
    sessionStorage.setItem('points',subject.points.toString());
    sessionStorage.setItem('tries',subject.tries.toString());
    
}

window.addEventListener("resize",function() {document.getElementById("container").style.height =(window.height-100).toString()+"px";})
var congratsMsgs = ["You did it!","Are you controlling time?","How is this possible?!","Spot on!"];
var lolMsgs = ['I swear the game is not rigged!','My grandma can do this better than you!','Maybe the timer broke ...'];
var notSpLolMsgs = ["You can do better than this!","Your timing was good, but not good enough...", "Almost nailed it!","You can improve your time... you don't need to but you can... "];

var countDown = document.getElementById("countDown");
var startBtn = document.getElementById("start");
var timeVar=0;
var button = document.getElementById("stopCountdown");
var resetBtn = document.getElementById("restart");
var result = document.getElementById("result");
var testBtn = document.getElementById("testing");

//var attemptsLabel = document.getElementById("tries");
//var pointsLabel = document.getElementById("points");

console.log(timeVar);
var intervalFlag;
startBtn.addEventListener("click",init);
button.classList.add("disabled");
resetBtn.classList.add("disabled");
testBtn.classList.add("disabled");
result.classList.add("disabled");
var resultClassList = result.class
testBtn.addEventListener("click",function(){ timeVar = -10;})
//================Countdown Manipulator =====================
var TimeInterval;
var TimerVarList  = [450,500,1000];
var TimeGenerationShift = 1;
//=================EO Countdown Manipulator =================
function init(){
    console.log(result.classList);
    subject.tries+=1;
   // attemptsLabel.textContent = subject.tries.toString()+" Tries";
    startBtn.classList.add("disabled");
    button.classList.remove("disabled");
    timeVar = (Math.floor(Math.random()*8)+5 * TimeGenerationShift); 
    countDown.textContent=timeVar;
    TimeInterval = TimerVarList[Math.floor(Math.random()*(TimerVarList.length))];
    intervalFlag = setInterval(Timer,TimeInterval);
    button.addEventListener("click",onButtonPressed);
    result.textContent = "";
    result.classList.remove("Error");
    result.classList.remove("result");
    resetBtn.classList.add("disabled");
}

function Timer(){
    timeVar-=1;
    updateTimerText();
}
function updateTimerText(){
    if(timeVar < -10){
        halfStrike=strike=0;
        clearInterval(intervalFlag);
        document.getElementById("result").textContent = "\n\nDid your mouse break?";
        result.classList.remove("disabled");
        button.removeEventListener("click",onButtonPressed);
        resetBtn.addEventListener("click",init);
        resetBtn.classList.remove("disabled");
        result.classList.add("result");
        result.classList.add("Error");
        
    }
    //console.log(timeVar);
    if(timeVar >= ((Math.floor(Math.random()*2)+3*TimeGenerationShift) ))
    {
        countDown.textContent=timeVar;
    }else{
        countDown.textContent = "?";
    }
}
var strike = 0, halfStrike=0;
function onButtonPressed(){
    //pointsLabel.innerText = subject.points;
    button.classList.add("disabled")
    clearInterval(intervalFlag);
    result.classList.remove("disabled");
    result.classList.add("result");
    resetBtn.addEventListener("click",init);
    resetBtn.classList.remove("disabled");
    console.log("TimeVar: "+timeVar);
    if(timeVar <0){
        timeVar = -1*timeVar;
    }
    var winPts;
    if(timeVar==0){
        //Congratulation Message
        winPts = 500;
        strike++;
        halfStrike++;
        if(strike>=3){
            winPts=winPts*2;
        }
        subject.points+=winPts;
        document.getElementById("result").textContent="ᕦ(ツ)ᕤ   "+congratsMsgs[Math.floor(Math.random()*(congratsMsgs.length))]+ " You nailed the 0 mark!";
    }
    else if(timeVar <= 3)
    {    // Not so lol Message
        strike=0;
        halfStrike++;
        winPts = 100;
        if(halfStrike>=3){
            winPts=250;
        }
        subject.points+=winPts;
        document.getElementById("result").textContent = "¯\\_(ツ)_/¯   "+notSpLolMsgs[Math.floor(Math.random()*(notSpLolMsgs.length))] + " You missed 0 by " + timeVar.toString() + " tick(s).";}
        else
        {    //LOL Message
            document.getElementById("result").textContent ="ಠ_ಠ   "+lolMsgs[Math.floor(Math.random()*(lolMsgs.length))] + " You missed 0 by " + timeVar.toString() + " tick(s).";
            strike=0;
            halfStrike=0;
            winPts=0;
            subject.points+=winPts;
        }

    button.removeEventListener("click",onButtonPressed);
}
