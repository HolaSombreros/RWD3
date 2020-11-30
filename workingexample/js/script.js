// z-index setups and more:
$('img').css({position: 'absolute', 'z-index': 900});
$('#background').css({width: '100%', 'z-index': 555});
$('#butterfly').css({'z-index': 999});
$('.basket').css({'z-index': 996});
$('.apple').css({'z-index': 997});
$('#basketfront').css({'z-index': 998});
$('#wateringcan').css({transition: '.15s linear'});
$('.waterdrop').hide();
$('#net').css({transition: 'transform .2s ease-in-out', 'z-index': 999});
$('#background').css({'object-fit': 'contain'});

var lastNetXMovement; // global variable representing the net X coordinate - for rotating it around when needed

// Event triggered when moving the mouse around.
// Makes the net follow the mouse cursor and rotate 180 degrees if needed:
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

// Event triggered when the watercan is clicked.
// Rotates the can and starts the water drop animations:
$('#wateringcan').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).css({transform: 'rotate(-45deg)'});
        $(this).toggleClass('active');
        $('.waterdrop').show();
        spawnWaterDrops(0);
    }
    else {
        $(this).css({transform: 'rotate(0deg)'});
        $(this).toggleClass('active');
    }
});

// Function to randomly spawn water drops near the watering can when the watering can is in the 'active' state:
function spawnWaterDrops(obj) {
    let wateringCanX = parseInt($('#wateringcan').css('left'));
    let wateringCanY = parseInt($('#wateringcan').css('bottom'));

    // There HAS GOT to be a better way of doing this... :-(
    switch (obj) {
        case 1:
            $('img:nth-of-type(5)').css({left: wateringCanX + getRandomNum(-10, 10), bottom: wateringCanY + getRandomNum(-20, 20)});
            $('img:nth-of-type(5)').animate({bottom: '-5%'}, 1600, function() {
                if ($('#wateringcan').hasClass('active')) {
                    spawnWaterDrops(1);
                }
            });
            break;
        case 2:
            $('img:nth-of-type(6)').css({left: wateringCanX + getRandomNum(-10, 10), bottom: wateringCanY + getRandomNum(-20, 20)});
            $('img:nth-of-type(6)').animate({bottom: '-5%'}, 1800, function() {
                if ($('#wateringcan').hasClass('active')) {
                    spawnWaterDrops(2);
                }
            });
            break;
        case 3:
            $('img:nth-of-type(7)').css({left: wateringCanX + getRandomNum(-10, 10), bottom: wateringCanY + getRandomNum(-20, 20)});
            $('img:nth-of-type(7)').animate({bottom: '-5%'}, 2000, function() {
                if ($('#wateringcan').hasClass('active')) {
                    spawnWaterDrops(3);
                }
            });
            break;
        default:
            spawnWaterDrops(1);
            spawnWaterDrops(2);
            spawnWaterDrops(3);
    }
}

// Event triggered when an apple is clicked.
// First shakes the apple and then moves it to the basket:
$('.apple').click(function() {
    shakeApple(this);
    let basketX = parseInt($('.basket').css('left'));
    let basketY = parseInt($('.basket').css('bottom')) + 60;
    switch ($(this).attr('id')) {
        case 'apple1':
            basketX += 20;
            moveObject(this, basketX, basketY, 2000);
            break;
        case 'apple2':
            basketX += 75;
            moveObject(this, basketX, basketY, 2000);
            break;
        case 'apple3':
            basketX += 130;
            moveObject(this, basketX, basketY, 2000);
            break;
    }
})

// Function to move an object to a certain point (xVal, yVal) on the screen over (time) milliseconds:
function moveObject(obj, xVal, yVal, time) {
    $(obj).animate({left: xVal, bottom: yVal}, time);
}

// Function to populate the tree with apples, at random (although limited to within the crown of the tree):
populateAppleTree();
function populateAppleTree() {
    let treeX = parseInt($('#tree').css('left'));
    let treeY = parseInt($('#tree').css('bottom'));
    for (var i = 1; i < 4; i++) {
        $('#apple' + i).css({left: treeX + getRandomNum(200, 500), bottom: treeY + getRandomNum(500, 600)});
    }
}

// Function to generate a random number between 2 values where both values are included:
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to briefly shake an apple - this will be called when an apple is clicked:
function shakeApple(obj) {
    $(obj).animate({left: '+=3', bottom: '+=3'}, 50)
          .animate({left: '-=6', bottom: '-=6'}, 50)
          .animate({left: '+=3', bottom: '+=3'}, 50)
          .animate({left: '-=6', bottom: '-=6'}, 50)
          .animate({left: '+=2', bottom: '+=2'}, 50)
          .animate({left: '-=4', bottom: '-=4'}, 50)
          .animate({left: '+=1', bottom: '+=1'}, 50)
          .animate({left: '-=2', bottom: '-=2'}, 50)
          .animate({left: '+=1', bottom: '+=1'}, 50)
          .animate({left: '-=2', bottom: '-=2'}, 50);
}

// Function to make the butterfly fly around on the screen at random - the function calls itself when the animation is finished:
moveButterfly('#butterfly', 5000);
function moveButterfly(obj, speed) {
    let randX = getRandomNum(0, $(window).width() - 300);
    let randY = getRandomNum(0, $(window).height() - 200);
    $(obj).animate({left: randX, bottom: randY}, speed, function() {
        moveButterfly(obj, 5000)
    }).delay(100);
}

// Event being triggered when hovering on butterfly. Makes it swiftly fly elsewhere:
$('#butterfly').mouseenter(function() {
    $(this).stop(true);
    moveButterfly(this, 'fast')
});