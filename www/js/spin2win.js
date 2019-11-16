let theWheel = new Winwheel({
    'canvasId'    : 'myCanvas',
    //'pointerAngle' : 90, 
    //'outerRadius'  : 130, 
    //'innerRadius'   : 20,
    //'centerX'    : 0, 
    'innerRadius'   : 50,
    'responsive'   : true,
    'numSegments' : 8,
    'segments'    : [
                    {'strokeStyle' : '#FFFFFF',"fillStyle":"#fff175","text":"AED 100"},
                    {'strokeStyle' : '#FFFFFF',"fillStyle":"#89f26e","text":"AED 0"},
                    {'strokeStyle' : '#FFFFFF',"fillStyle":"#f50057","text":"AED 50"},
                    {'strokeStyle' : '#FFFFFF',"fillStyle":"#4cd0e1","text":"AED 0"},
                    {'strokeStyle' : '#FFFFFF',"fillStyle":"#4cb5ab","text":"AED 20"},
                    {'strokeStyle' : '#FFFFFF',"fillStyle":"#ba67c8","text":"AED 0"},
                    {'strokeStyle' : '#FFFFFF',"fillStyle":"#f77b72","text":"AED 10"},
                    {'strokeStyle' : '#FFFFFF',"fillStyle":"#63b5f7","text":"AED 0"},
                ],
    'animation' :                   // Note animation properties passed in constructor parameters.
        {
            //'easing'   : 'Back.easeInOut',
            'type'     : 'spinToStop',  // Type of animation.
            'duration' : 10,             // How long the animation is to take in seconds.
            'spins'    : 20,              // The number of complete 360 degree rotations the wheel is to do.
            'callbackFinished' : 'winAnimation()',
            'callbackSound' : playSound,
        },
    'fillStyle'   : '#e7706f',
    'lineWidth'   : 1,
    'pins' :    // Display pins, and if desired specify the number.
    {
        'number' : 8,
        'outerRadius' : 7,
        'margin'      : -2,
        'fillStyle'   : '#FFFFFF',
        'strokeStyle' : '#ffffff' 
    }
});

function winAnimation()
{
    var winner = theWheel.getIndicatedSegment();
    var amount = winner.text;
    $('#modalWinner .winning-amount').html(amount);
    if(amount!='AED 0'){
        $('.modal-dialog').removeClass('modal-danger').addClass('modal-success');
        $('.check-wrapper').removeClass('text-danger').addClass('text-success');
        $('.check-wrapper i').removeClass('fa-sad-tear').addClass('fa-smile-wink');
        $('.modal-header h3').html('Congratulations!');
    }else{
        $('.modal-dialog').addClass('modal-danger').removeClass('modal-success');
        $('.check-wrapper').addClass('text-danger').removeClass('text-success');
        $('.check-wrapper i').addClass('fa-sad-tear').removeClass('fa-smile-wink');
        $('.modal-header h3').html('Oooops!');
    }
    $('#modalWinner').modal({show : true});
    $('.amount').hide();
    $('.preloader-wrapper').hide();
    $('.scanReceiptMsg').show();
    $('#receiptId').val('');
}

function calculatePrize()
{
        // This formula always makes the wheel stop somewhere inside prize 3 at least
        // 1 degree away from the start and end edges of the segment.
        /////////let stopAt = (101 + Math.floor((Math.random() * 98)))

        // Important thing is to set the stopAngle of the animation before stating the spin.
        /////////theWheel.animation.stopAngle = stopAt;

        // May as well start the spin from here.
        theWheel.startAnimation();
        $('.amount').hide();    
}

let audio = new Audio('tick.mp3');  // Create audio object and load desired file.
function playSound()
{
    // Stop and rewind the sound (stops it if already playing).
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
}

function resetWheel(){
    //theWheel.stopAnimation(); 
    theWheel.rotationAngle=0; 
    theWheel.draw();
}


$(function(){
    $(".button-collapse").sideNav(); 
});

