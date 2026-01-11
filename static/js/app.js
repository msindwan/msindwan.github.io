/**
 * Modern Portfolio Javascript
 *
 * @author Mayank Sindwani
 * @date 2026
 */

'use strict';

// Page Navigation System
class PageNavigator {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.init();
    }

    init() {
        // Set initial page from hash or default to home
        const hash = window.location.hash.slice(1);
        if (hash && this.isValidPage(hash)) {
            this.showPage(hash);
        } else {
            this.showPage('home');
        }

        // Setup navigation links
        this.setupNavLinks();
        
        // Setup project cards
        this.setupProjectCards();
        
        // Setup back buttons
        this.setupBackButtons();
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const hash = window.location.hash.slice(1);
            if (hash && this.isValidPage(hash)) {
                this.showPage(hash, false);
            } else {
                this.showPage('home', false);
            }
        });
    }

    isValidPage(pageId) {
        const validPages = ['home', 'about', 'project-shoebox', 'project-zipkin-view', 
                           'project-handbook', 'project-sherlock', 'project-mycache', 
                           'project-reduxion', 'project-mhtml2html', 'project-chordgen', 
                           'project-serverpp', 'project-jconf'];
        return validPages.includes(pageId);
    }

    showPage(pageId, pushState = true) {
        // Hide all pages
        this.pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page - try different ID formats
        let targetPage = document.getElementById(`${pageId}-page`);
        if (!targetPage) {
            targetPage = document.getElementById(pageId);
        }
        // For project pages, try project- prefix
        if (!targetPage && pageId.startsWith('project-')) {
            targetPage = document.getElementById(pageId);
        }
        
        if (targetPage) {
            // Add active class with slight delay for transition
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 50);
            
            this.currentPage = pageId;
            
            // Update URL
            if (pushState) {
                const url = pageId === 'home' ? '#' : `#${pageId}`;
                window.history.pushState({ page: pageId }, '', url);
            }
            
            // Update nav links
            this.updateNavLinks(pageId);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    setupNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link, .nav-logo');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page') || 
                              link.getAttribute('href')?.slice(1) || 'home';
                this.showPage(pageId);
            });
        });
    }

    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = card.getAttribute('data-project');
                if (projectId) {
                    this.showPage(`project-${projectId}`);
                }
            });
        });
    }

    setupBackButtons() {
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPage('home');
            });
        });
    }

    updateNavLinks(activePageId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('data-page') || 
                           link.getAttribute('href')?.slice(1);
            if (linkPage === activePageId || 
                (activePageId.startsWith('project-') && linkPage === 'home')) {
                link.classList.add('active');
            }
        });
    }
}

// Checks if the browser is mobile.
function isMobile() {
    var agent = navigator.userAgent||navigator.vendor||window.opera;
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((agent).substr(0,4)));
}

// Wires up the 3D carousel.
function move3dCarousel() {
    var indicators    = document.querySelectorAll(".carousel-indicators li"),
        carousel      = document.getElementById("technologies_carousel"),
        prevIndicator = indicators[0],
        automaticSpin = null,
        spinTimeout   = null,
        spinDelay     = 2000,
        rotationDelay = 1000,
        numPanels     = 6,
        curIndex      = 0,
        currdeg       = 0;

    // Turns the carousel.
    var turnCarousel = function() {
        var transform = 'rotateY(' + currdeg + 'deg)';
        carousel.style.webkitTransform = transform;
        carousel.style.mozTransform = transform;
        carousel.style.msTransform = transform;
        carousel.style.oTransform = transform;
        carousel.style.transform = transform;
    }

    // Sets the transition properties of the carousel.
    var setCarouselTransition = function(transition) {
        carousel.style.webkitTransition = transition;
        carousel.style.mozTransition = transition;
        carousel.style.msTransition = transition;
        carousel.style.oTransition = transition;
        carousel.style.transition = transition;
    }

    // Moves the carousel to the newIndex or to the next item if an index is not provided.
    var moveCarousel = function(newIndex) {
        if (newIndex === curIndex) {
            return;
        }

        // Calculate the new rotation degree.
        if (newIndex === undefined) {
            currdeg += (360 / numPanels);
            curIndex = (curIndex + 1) % numPanels;
        } else {
            currdeg += (newIndex - curIndex) * (360 / numPanels);
            curIndex = newIndex;
        }

        turnCarousel();

        // Update the indicators.
        prevIndicator.className = "";
        prevIndicator = indicators[curIndex];
        prevIndicator.className = "active";

        setTimeout(function() {
            if (currdeg >= 360) {
                setCarouselTransition("none");
                currdeg = 0;
                turnCarousel();
                setTimeout(function() { setCarouselTransition("transform 1s"); }, 50);
            }
        }, rotationDelay);
    };

    // Map indicators to the carousel move function.
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", function(e) {

            clearInterval(automaticSpin);
            clearTimeout(spinTimeout);

            moveCarousel(parseInt(e.target.getAttribute("data-index")), indicators[i]);
            spinTimeout = setTimeout(function() { automaticSpin = setInterval(moveCarousel, spinDelay); }, spinDelay);
        });
    }

    automaticSpin = setInterval(moveCarousel, spinDelay);
}

// Wires up the 2D carousel.
function move2dCarousel() {
    var panelHeight   = document.querySelector('.carousel .panel-six').clientHeight,
        indicators    = document.querySelectorAll(".carousel-indicators li"),
        carousel      = document.getElementById("technologies_carousel"),
        prevIndicator = indicators[0],
        automaticSpin = null,
        spinTimeout   = null,
        spinDelay     = 2000,
        curIndex      = 0;

    // Moves the carousel to the newIndex or to the next item if an index is not provided.
    var moveCarousel = function(newIndex) {
        if (newIndex === curIndex) {
            return;
        }

        prevIndicator.className = "";
        if (newIndex === undefined) {
            curIndex = (curIndex + 1) % 6;
        } else {
            curIndex = newIndex;
        }

        // Move the carousel.
        carousel.style.marginTop = -1 * (panelHeight * curIndex) + "px";
        prevIndicator = indicators[curIndex];
        prevIndicator.className = "active";
    }

    prevIndicator.className = "active";

    // Map indicators to the carousel move function.
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", function(e) {

            clearInterval(automaticSpin);
            clearTimeout(spinTimeout);

            moveCarousel(parseInt(e.target.getAttribute("data-index")), indicators[i]);
            spinTimeout = setTimeout(function() { automaticSpin = setInterval(moveCarousel, spinDelay); }, spinDelay);
        });
    }

    automaticSpin = setInterval(moveCarousel, spinDelay);
}

// Entry point.
(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Initialize page navigator
        const navigator = new PageNavigator();

        // Enable the carousel if it exists (on about page)
        const carouselContainer = document.getElementById("technologies_carousel_container");
        if (carouselContainer) {
            if (!isMobile()) {
                // Show a 3D carousel if supported.
                carouselContainer.className += " three-dimensional-carousel";
                move3dCarousel();
            } else {
                move2dCarousel();
            }
        }

        // Add smooth scroll behavior for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const targetId = href.slice(1);
                    navigator.showPage(targetId);
                }
            });
        });
    });
})();
