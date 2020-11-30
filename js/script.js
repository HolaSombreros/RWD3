//NET
 var lastNetXMovement;

$(document).mousemove(function(e) {
    $("#net").css({left: e.pageX + 20, top: e.pageY - 100});
    if (e.pageX >= lastNetXMovement) {
        $('#net').css({transform: 'scaleX(-1) translateX(340px)'});
    }
    else {
        $('#net').css({transform: 'scaleX(1)'});
    }
    lastNetXMovement = e.pageX;
});


//APPLES 
var treeX = parseInt($("#tree").css("left"));
var treeY = parseInt($("#tree").css("top"));

$("#apple3").css({left : treeX + getRandomNumber(200, 500), top: treeY + getRandomNumber(150, 300)});
$("#apple2").css({left: treeX + getRandomNumber(200, 500), top: treeY + getRandomNumber(150, 300)});
$("#apple1").css({left: treeX + getRandomNumber(200, 500), top: treeY + getRandomNumber(150, 300)});

function getRandomNumber(number1, number2)
{
    return Math.floor(Math.random() * (number2-number1) + number1);
    
}

var basketX = parseInt($("#basketfront").css("left"));
var basketY = parseInt($("#basketfront").css("top"));


$(".apple").on("click", function(){
    var id = $(this).attr("id");
    switch(id)
    {
        case "apple1":
            $("#apple1").animate({left : basketX +20, top: basketY +10});
            break;
        case "apple2":
                $("#apple2").animate({left: basketX +70, top: basketY +10});
            break;
        case "apple3":
                $("#apple3").animate({left: basketX +120, top: basketY +10});
            break;  
    }
   
})




// BUTTERFLY MOVEMENT

moveButterfly(15000);

function moveButterfly(speed){
    $("#butterfly").animate({
        left: getRandomNumber(0,$(window).width()-300),
        top: getRandomNumber(0,$(window).height()-200)
    },speed, function () {
        moveButterfly(15000);
    })
}


$("#butterfly").mouseover(function (){
    $(this).stop(true);
    moveButterfly("slow");
})

//  WATERING CAN
var watering=0;
$(".waterdrop").hide();

$("#wateringcan").css({transition: ".15s linear"});
$("#wateringcan").click(function () {
    if (watering==0) {
        $(this).css({transform: "rotate(-80deg)"})
        watering=1;
        $(".waterdrop").show();
        dropping(5);
        dropping(6);
        dropping(7);
    }

    else {
        $(this).css({transform: "rotate(0deg)"})
        watering=0;
        $(".waterdrop").hide();
    }
});

function dropping(i)
{
    var canX = parseInt($("#wateringcan").css("left"));
    var canY = parseInt($("#wateringcan").css("top"));
    $("img:nth-of-type("+i+")").css({left : canX + getRandomNumber(0, 50), top: canY + 130});
    $("img:nth-of-type("+i+")").animate({top:"+=350px"}, getRandomNumber(2000,3000), function (){
        if (watering ==1)
        dropping(i);
    });
}