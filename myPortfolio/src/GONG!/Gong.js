//function to make the gong sound!
//and activate the counter

var count = (function() {
    var counter = 0;
    return function () {return counter +=1}
})();
function play() {
    var audio = document.getElementById("gonged");
    if (audio.paused) {
    audio.play();
    }
    else {
        audio.currentTime = 0
    }
    document.getElementById("status").innerHTML = count();
    
       switch (true) {
           case (document.getElementById("status").innerHTML == 20):
               var audio = document.getElementById("ya");
                audio.play();
                break;
            case (document.getElementById("status").innerHTML == 50):
                var audio = document.getElementById("heaven");
                audio.play();
                break;
            case (document.getElementById("status").innerHTML == 75):
                var audio = document.getElementById("force");
                audio.play();
                break;
            case (document.getElementById("status").innerHTML > 99):  
                window.open("./Buddha.html");    
        }
}


//function at 20 gongs audio of bruce lee "woooawoo"

//function at 50 gongs audio of "heavenly glory"

//function at 75 gongs audio of yoga

//100 gongs entire page become chakra picture with circling oms audio