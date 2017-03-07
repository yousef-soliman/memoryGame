function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "loop");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
} 
var ssound;
$(document).ready(function(){
    ssound = new sound("audio/pokemon_go.mp3"); 
    ssound.play();
    $("#start").bind("click",fun1);
    $("#highscore").bind("click",highscore);
}
);
function fun1() {
    ssound.stop();
    var myWindow = window.open("index.html", "_self");
}
function highscore(){
    var myWindow = window.open("highScore.html", "_self");
}