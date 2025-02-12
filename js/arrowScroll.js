var arrowScroll = (function () {
    var currentPosition = 0;

    var positionArray = [
		0,
		5700,
		11500,
		'#section4',
		'#section5',
		'#section6',
		'#section7',
		'#section8'
		];

    var gotoNextMenu = function () {

        arrowScroll.currentPosition = Math.min(arrowScroll.currentPosition + 1, 7);
        var targetPos = positionArray[arrowScroll.currentPosition];
        var target;

        if (typeof targetPos == 'number') {
            target = targetPos;
        } else {
            target = $(targetPos).offset().top;
            if (arrowScroll.currentPosition == 4) {
                target = target + 40;
            } else if (arrowScroll.currentPosition == 5) {
                target = target + 100;
            }

        }

        $('html, body').stop().animate({
            scrollTop: target
        }, 2000);
    };

    var gotoPreviousMenu = function () {
        arrowScroll.currentPosition = Math.max(arrowScroll.currentPosition - 1, 0);
        var targetPos = positionArray[arrowScroll.currentPosition];
        var target;
        if (typeof targetPos == 'number') {
            target = targetPos;
        } else {
            target = $(targetPos).offset().top;
            if (arrowScroll.currentPosition == 4) {
                target = target + 40;
            } else if (arrowScroll.currentPosition == 5) {
                target = target + 100;
            }

        }
        $('html, body').stop().animate({
            scrollTop: target
        }, 2000);
    };

    var init = function () {
        $(document).keydown(function (e) {
            currentPosition = whereAreYou();
            switch (e.which) {
                case 38: // up
                    gotoPreviousMenu();
                    break;

                case 40: // down
                    gotoNextMenu();
                    break;

                default:
                    return; // exit this handler for other keys
            }
            //e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        //Keep Track of where I am
        $(window).scroll(whereAreYou);
    };

    var whereAreYou = function (event) {
        var location = $(window).scrollTop();

        if (location < positionArray[1]) {
            arrowScroll.currentPosition = 0;
        } else if (location < positionArray[2]) {
            arrowScroll.currentPosition = 1;
        } else if (location < $(positionArray[3]).offset().top) {
            arrowScroll.currentPosition = 2;
        } else if (location < $(positionArray[4]).offset().top) {
            arrowScroll.currentPosition = 3;
        } else if (location < $(positionArray[5]).offset().top) {
            arrowScroll.currentPosition = 4;
        } else if (location < $(positionArray[6]).offset().top) {
            arrowScroll.currentPosition = 5;
        } else {
            arrowScroll.currentPosition = 6;
        }

        if (event) {
            //event.preventDefault();
        }

        livingSys.refreshBackgrounds('.section5');

    };

    return {
        init: init,
        positionArray: positionArray,
        whereAreYou: whereAreYou,
        currentPosition: currentPosition
    };
}());
