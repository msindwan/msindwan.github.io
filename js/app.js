/**
 * Portfolio Javascript
 *
 * @author Mayank Sindwani
 * @date 2016-03-13
 */

 'use strict';


// Wires up the 3D carousel.
function Move3dCarousel() {
    var currdeg = 0, curIndex, carousel, indicators, prevIndicator, newIndicator;
    var carousel = document.getElementById("technologies_carousel");
    var indicators = document.querySelectorAll(".carousel-indicators li");
    var i, x, y;

    prevIndicator = indicators[0];
    curIndex = 0;

    var moveCarousel = function(newIndex, indicator) {

        if (newIndex === curIndex)
            return;

        var newIndicator;

        if (newIndex === undefined) {
            currdeg += 60;
            curIndex = (curIndex + 1) % 6;
        } else {
            currdeg += (newIndex - curIndex) * 60;
            curIndex = newIndex;
        }

        newIndicator = indicators[curIndex];
        newIndicator.className = "active";
        prevIndicator.className = "";

        prevIndicator = newIndicator;

        var transform = 'rotateY(' + currdeg + 'deg)';
        carousel.style.webkitTransform = transform;
        carousel.style.mozTransform = transform;
        carousel.style.msTransform = transform;
        carousel.style.oTransform = transform;
        carousel.style.transform = transform;

        setTimeout(function() {

            if (currdeg >= 360) {
                carousel.style.transition = "none";

                currdeg = 0;
                var transform = 'rotateY(' + currdeg + 'deg)';
                carousel.style.webkitTransform = transform;
                carousel.style.mozTransform = transform;
                carousel.style.msTransform = transform;
                carousel.style.oTransform = transform;
                carousel.style.transform = transform;

                setTimeout(function() {
                    carousel.style.transition = "transform 1s";
                }, 50);
            }

        }, 1000);
    };

    for (i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", function(e) {
            clearInterval(x);
            clearTimeout(y);

            moveCarousel(parseInt(e.target.getAttribute("data-index")), indicators[i]);
            y = setTimeout(function() {
                x = setInterval(moveCarousel, 1500);
            }, 2000);
        });
    }

    x = setInterval(moveCarousel, 1500);
}

// Wires up the 2D carousel.
function Move2dCarousel() {
    var carousel = document.getElementById("technologies_carousel"),
        indicators = document.querySelectorAll(".carousel-indicators li"),
        panelSize = 404,
        index = 0,
        i, x, y;

    var moveCarousel = function(newIndex) {


        indicators[index].className = "";

        if (newIndex === undefined) {
            index = (index + 1) % 6;
        } else {
            index = newIndex;
        }

        carousel.style.marginLeft = -1 * (panelSize*index) + "px";
        indicators[index].className = "active";
    }

    indicators[index].className = "active";
    x = setInterval(moveCarousel, 2000);

    for (i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", function(e) {
            clearInterval(x);
            clearTimeout(y);

            moveCarousel(parseInt(e.target.getAttribute("data-index")), indicators[i]);
            y = setTimeout(function() {
                x = setInterval(moveCarousel, 2000);
            }, 2500);
        });
    }
}

// Entry point.
function Main() {
    // Show a 3D carousel if supported.
    if (Modernizr.preserve3d) {
        document.getElementById("technologies_carousel_container").className += " three-dimensional-carousel";
    }

    // Enable the carousel.
    window.addEventListener("load", function() {
        if (Modernizr.preserve3d) {
            Move3dCarousel();
        } else {
            Move2dCarousel();
        }
    });
}

Main();