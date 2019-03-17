//function to make the gong sound!
//and activate the counter

var count = (function() {
    var counter = 0;
    return function () {return counter +=1}
})();
function play() {
    var audio = document.getElementById("gonged");
    audio.play();
    document.getElementById("status").innerHTML = count();
    
        switch (audio) {
            case (document.getElementById("status").innerHTML = 20:
                var audio = document.getElementById("ya");
                audio.play();
        }
}


//function at 20 gongs audio of bruce lee "woooawoo"

//function at 50 gongs audio of "heavenly glory"

//function at 75 gongs audio of yoga

//100 gongs entire page become chakra picture with circling oms audio