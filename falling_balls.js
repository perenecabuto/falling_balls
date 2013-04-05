$.fn.droppingBalls = function(duration) {
    var balls = $(this),
        ballsContainers = balls.parent()
        duration = duration || 300;

    if (! balls[0]) {
        return false;
    }

    var animateBall = function(ball) {
        ball.animate({'margin-top': 0, 'opacity': 1}, duration, null, function() {
            var nextBall = $(this).next('.ball');
            if (nextBall) animateBall(nextBall);
        });
    }

    ballsContainers.each(function(idx, ballsContainer) {
        var ballsContainer = $(ballsContainer),
            myBalls = ballsContainer.find(balls),
            firstBall = myBalls.first();

        if (!ballsContainer.hasClass('balls-container')) {
            var myBallsContainer = $('<div class="balls-container" style="overflow: hidden; display: block"></div>'),
                marginLeft = firstBall.offset().left - ballsContainer.offset().left - parseInt(firstBall.css('margin-left'));

            myBallsContainer.append(myBalls);
            ballsContainer.append(myBallsContainer);
            myBalls.addClass('ball').css({ 'float': 'left', 'display': 'block' });
            myBallsContainer.css({ 'margin-left': marginLeft, 'overflow': 'visible', 'height': myBallsContainer.height() });

            ballsContainer = myBallsContainer;
        }

        myBalls.css({'margin-top': ballsContainer.height() * -1, 'opacity': 0});

        animateBall(firstBall);
    });
};

