 $(document).ready(function() {

    var obj = document.createElement("audio");
    obj.src = "chineseGong.mp3";
    obj.volume = 0.1;
    obj.autoPlay = false;
    obj.preLoad = true;
    obj.controls = true;

    $(".gong").click(function() {
        audio.play();
    });
});

//const gonged = new Audio("src\GONG!\chineseGong.mp3");
//$('#gong').click(e => gonged.play());