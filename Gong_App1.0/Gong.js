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
           //function at 20 gongs audio of monks chanting
           case (document.getElementById("status").innerHTML == 20):
               var audio = document.getElementById("ya");
                audio.play();
                break;
            //function at 50 gongs audio of Bruce Lee advice    
            case (document.getElementById("status").innerHTML == 50):
                var audio = document.getElementById("heaven");
                audio.play();
                break;
            //function at 75 gongs audio of yoda    
            case (document.getElementById("status").innerHTML == 75):
                var audio = document.getElementById("force");
                audio.play();
                break;
            //100 gongs new page become chakra picture with circling oms audio    
            case (document.getElementById("status").innerHTML > 99):  
                window.open("./Buddha.html");    
        }
}
//num  % 2 == 0 ? is EVEN
//num % 2 != 0 ? ODD