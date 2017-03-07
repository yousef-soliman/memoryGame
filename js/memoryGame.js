var images =["img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png","img/8.png"];
var sounds=["audio/1.mp3", "audio/2.mp3", "audio/3.mp3", "audio/4.mp3", "audio/5.mp3", "audio/6.mp3", "audio/7.mp3", "audio/8.mp3"];

var indx_image=[];
var indx_sound=[];
var grid =[];
var grid_sound =[];
var cnt= 0;
var prev;
var finished = 0;
var numberOfTries = 0;
var timr = 30;
var t;
var sound_success;
var counter;
var name;
$(document).ready(function () {
  prepare();
  createForm();
  //appendTiles_sound();
})
/*sound object*/
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
/*timer*/
function timer(){
    $("#timer").text(timr);
    if(finished == 8) {
        sound_success.stop();
        clearInterval(t);
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++) {
                $("#cell-"+i+"-"+j).unbind("click");
            }
        }
        gamesuccess();
    }
    else if(timr == 0) {
        sound_success.stop();
        clearInterval(t);
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++) {
                $("#cell-"+i+"-"+j).unbind("click");
            }
        }
        gameover();

       
        
    }
    else{   
        timr--;
    }
}

function displayNumberOfTries(){
    $("#nOfTries").text(numberOfTries);
}

/*append tiles of images*/
function appendTiles() {
  $("#container-result").remove();
  $("body").append("<div class='text-timer' >Timer</div>");
  $("body").append("<div class='text-nOfTries' >Number Of Tries</div>");
  $("body").append("<div class='timer' id ='timer'></div>");
  $("body").append("<div class='nOfTries' id='nOfTries'></div>");
  $("body").append("<img src='img/reload.png' onclick = 'reload()' class='reload' />");
  $("body").append("<img src='img/home.png' onclick = 'home()' class='home' />");
    
  $("#formDiv").remove();
    sound_success = new sound("audio/cnt.mp3"); 
    sound_success.play();
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      $("#container").append("<div id='cell-"+i+"-"+j+"'class='cell'></div>");
      $("#cell-"+i+"-"+j).append("<img src='"+images[grid[i][j]]+"' class='img'/>");
    }
  } 
    setTimeout(function (){
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++) {
                $("#cell-"+i+"-"+j).find(">:first-child").remove();
                $("#cell-"+i+"-"+j).bind("click",flip);
            }
        }
        
    },1000);
    t = setInterval(timer,1000);
    displayNumberOfTries();
    
    
}

/*prepare for image random*/
function prepare() {
  for(var i= 0; i <8 ;i++) {
    indx_image.push(i);
    indx_image.push(i);
  }
  indx_image.sort(function () {
    return .5 - Math.random();
  })
  var row=[];
  for(var i = 1; i <= 16; i++) {
    row.push(indx_image[i-1]);
    if( i % 4 == 0 ) {
      grid.push(row);
      row = [];
    }
  }
}


function flip() {
  cnt++;
  $(this).unbind("click");
  var arr = ($(this).attr("id")).split("-"); //to get row and col
  r = arr[1];
  c = arr[2];
  $(this).append("<img src='"+images[grid[r][c]]+"'class='img'/>");
  switch (cnt) {
    case 1:
      prev = $(this);
      break;
    case 2:{
        numberOfTries++;
        if($(this).find(">:first-child").attr("src") == $(prev).find(">:first-child").attr("src")){
          finished++;
          $(this).unbind("click");
          $(prev).unbind("click");
        }
        else {
          var x = $(this).find(">:first-child");
          setTimeout(function () {
            $(prev).find(">:first-child").remove();
            $(x).remove();
          },200);
            $(this).bind("click",flip);
          $(prev).bind("click",flip);
        }
        
        cnt = 0;
        break;
    }
    default:
  }
  displayNumberOfTries();
}

function createForm() { // append form
  $("body").append("<div class='form' id='formDiv'> </div>");
  $("#formDiv").append("<img src='img/user.png'width='110px' height='110px' style='margin-top:35px' />");
  $("#formDiv").append("<div id='userName'></div>");
  $("#userName").append("<img src='img/man-user.png' class='man-user' />");
  $("#userName").append("<input  id='fname' type='text' name='fname' class='input-area' value='' placeholder=' Type Your Name' />");
  $("#formDiv").append("<br>");
  $("#formDiv").append("<input type='button' value='login' class='button'/>");
  $("#formDiv").animate({top: "200px"},1500);
  $(".button").bind("click",isValid);
  $("#formDiv").bind("keypress",function (e) {
    if(e.keyCode == 13) isValid();
  });
}
function isValid() {
  var el = document.getElementById('fname').value;
    name = el; 
 if(el == null || el == "") {
    $("#userName").append("<span style='color:red; margin-left:100px; float:left'>Please Enter Your Name </span>");
    return false;
  }
  else {
    start()
    setTimeout(appendTiles,4000);
  }
}
function gameover() {
 sound_success = new sound("audio/gameover.mp3"); 
 sound_success.play();
 $("body").append("<div id='container-result' style='text-align:center'></div>");
 $("#container-result").append("<div class='opcit'></div>");
 $("#container-result").append("<div class='result' id ='res'></div>");
 $("#res").append("<img src='img/char.png' class='char'/>");
 $("#res").append("<div class='scoreboard'>Score</div>");
 $("#res").append("<div class='details'>"+finished+"</div>");
 $("#res").append("<div class='scoreboard'>Number Of Tries</div>");
 $("#res").append("<div class='details'>"+numberOfTries+"</div>");
 $("#res").append("<input class='playagain' value='Play Again' onclick='reload()'/>");
 $("#res").append("<input class='close' value='Close' onclick='home()'/>");
 $("body").bind("keyup",function (e){
     if(e.keyCode == 27) {
         home();
     } 
 });
}
function gamesuccess() {
sound_success = new sound("audio/wrecking ball.mp3"); 
 sound_success.play();
 $("body").append("<div id='container-result' style='text-align:center'></div>");
 $("#container-result").append("<div class='opcit'></div>");
 $("#container-result").append("<div class='result' id ='res'></div>");
 $("#res").append("<img src='img/char2.png' class='char2'/>");
 $("#res").append("<div class='scoreboard'>Score</div>");
 $("#res").append("<div class='details'>"+finished+"</div>");
 $("#res").append("<div class='scoreboard'>Number Of Tries</div>");
 $("#res").append("<div class='details'>"+numberOfTries+"</div>");
    $("#res").append("<input class='playagain' value='Play Again' onclick='reload()'/>");
 $("#res").append("<input class='close' value='Close' onclick='home()'/>");
 $("body").bind("keyup",function (e){
     if(e.keyCode == 27) {
         home();
     } 
 });
    localStorage.setItem(name,numberOfTries + "_"+ name);
}
/*append Tiles for sounds*/
function appendTiles_sound(){
$("#container").html("");
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      $("#container").append("<div id='cell-"+i+"-"+j+"'class='cell'></div>");
      $("#cell-"+i+"-"+j).bind("click",play);
    }
  }  
}
/*play for sound vs flip*/
function play() {
    cnt++;
    $(this).unbind("click");
    var arr = ($(this).attr("id")).split("-"); //to get row and col
    r = arr[1];
    c = arr[2];
    var sdn = new sound(sounds[grid[r][c]]);
    switch (cnt) {
        case 1:
            sdn.play();
            prev = sdn;
            cnt++;
            break;
        case 2:{
            numberOfTries++;
            if(prev.src == sdn.src){
                finished++;
                $(this).unbind("click");
                $(prev).unbind("click");
                sdn.stop();
            }
            else {
                $(this).bind("click",play);
                $(prev).bind("click",play);
                sdn.stop();
            }
            
        cnt = 0;
        break;
        }
  }
}
function prepare_sound() {
  for(var i= 0; i <8 ;i++) {
    indx_sound.push(i);
    indx_sound.push(i);
  }
  indx_sound.sort(function () {
    return .5 - Math.random();
  })
  var row=[];
  for(var i = 1; i <= 16; i++) {
    row.push(indx_image[i-1]);
    if( i % 4 == 0 ) {
      grid_sound.push(row);
      row = [];
    }
  }
}
function start(){
    $("body").append("<div id='container-result' style='text-align:center'></div>");
    $("#container-result").append("<div class='opcit'></div>");
    var ready = 3;
    counter = setInterval(function (){
        if(ready == 0) clearInterval(counter); 
        $(".opcit").text(ready);
        ready--;
    },1000);
    
}
function reload() {
    indx_image=[];
     indx_sound=[];
     grid =[];
     grid_sound =[];
     cnt= 0;
     prev =0 ;
     finished = 0;
     numberOfTries = 0;
     timr = 30;
     clearInterval(t);
     sound_success.stop();
     counter = 0;
    $("#container").html("");
    $("#timer").remove();
    $("#nOfTries").remove();
    prepare();
    start();
    setTimeout(appendTiles,4000);
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
function home(){
    var myWindow = window.open("indx.html", "_self");
}