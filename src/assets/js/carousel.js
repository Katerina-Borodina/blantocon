// Carousel 1
var controlC1 = document.querySelector('#controlsContainer1');

var slider1 = tns({
    container: '#carousel-brands',
    items: 2,
    slideBy: 1,
    autoplay: false,
    hasControls: controlC1,
    controls: controlC1,
    prevButton: '#prev1',
    nextButton: '#next1',
    nav: false,
    loop: false,
    rewind: true,
    swipeAngle: false,
    speed: 400,

    responsive: {
        320: {
            items: 1
        },
        420: {
            items: 2
        },
        720: {
            items: 3
        },
        1024: {
            items: 5
        },
        1240: {
            items: 6
        }
    }
});

// Brands Menu
var menuBrands = document.getElementById('carousel-brands');
menuBrands.addEventListener('click', clickMenu);

function clickMenu(e) {
    var target = e.target;
    var activeTab = target.dataset.tab;

    document.querySelector('.slide-item.active-tab-menu').classList.remove('active-tab-menu');
    target.classList.add('active-tab-menu');

    document.querySelector('.tabs1.active-tab-content').classList.remove('active-tab-content');
    document.querySelector('.tabs1.' + activeTab).classList.add('active-tab-content');
}



// Materials menu
(function () {
    var materialSubMenu = document.getElementById('materialSub');

    document.querySelectorAll('#materials .mat-items a').forEach(function(item){
        item.addEventListener('click', clickMainMenu);
    });

    function clickMainMenu(e) {
        var activeSubMenu = this.dataset.tab;
        document.querySelector('.mat-items.active-tab-menu').classList.remove('active-tab-menu');
        this.closest('li').classList.add('active-tab-menu');
        document.querySelector('.material-ul.active-tab-content-menu').classList.remove('active-tab-content-menu');
        document.querySelector('.material-ul.' + activeSubMenu + ' .active-tab-menu').classList.remove('active-tab-menu');
        document.querySelector('.material-ul.' + activeSubMenu + ' a:first-child').classList.add('active-tab-menu');
        document.querySelector('.material-ul.' + activeSubMenu).classList.add('active-tab-content-menu');
        document.querySelector('.materials .tabs.first-tab').classList.remove('first-tab');
        var activeTab = document.querySelector('.material-ul.' + activeSubMenu + ' a:first-child').dataset.tab;
        document.querySelector('.materials .tabs.' + activeTab).classList.add('first-tab');
        document.querySelectorAll('.materials .color-block').forEach(function (item) {
            item.classList.remove('active-tab-color-menu');
        });
        document.querySelector('.materials .color-block.' + activeSubMenu).classList.add('active-tab-color-menu');

    }

    document.querySelectorAll('#materialSub .ml').forEach(function(item){
        item.addEventListener('click', clickSubMenu);
    });

    function clickSubMenu(e) {
        var activeTab = this.dataset.tab,
            parent = this.closest('ul');
        parent.querySelector('.ml.active-tab-menu').classList.remove('active-tab-menu');
        this.classList.add('active-tab-menu');
        document.querySelector('.materials .tabs.first-tab').classList.remove('first-tab');
        document.querySelector('.materials .tabs.' + activeTab).classList.add('first-tab');
    }

//Colors
    document.querySelectorAll('.materials .color-block .color-general-wrap').forEach(function(item){
        item.addEventListener('click', function () {
            this.closest('.color-block').querySelector('.color-run ul').classList.toggle("toggle-visibility");
        });
    });

    document.querySelectorAll('.materials .color-block .color-run a').forEach(function (colorList) {
        colorList.addEventListener('click', showColor);
    });

    function showColor(e) {
        e.preventDefault();

        var urlImg = this.dataset.url,
            activeColor = this.dataset.color,
            listItem = this.parentNode;

        listItem.parentNode.querySelectorAll('li').forEach(function(li){
            li.classList.remove('active-color');
        });
        listItem.classList.add('active-color');

        listItem.closest('.color-block').querySelector('a.color-blc').className = 'color-blc';
        listItem.closest('.color-block').querySelector('a.color-blc').classList.add(activeColor);
        document.querySelector('.materials .first-tab .tabs-img-materials img').src = urlImg;
        listItem.closest('.color-block').querySelector('.color-run ul').classList.toggle("toggle-visibility");
    }


    //MOBILE
    //Responsive navbar
    document.querySelectorAll('#materials-mobile .mat-items-mob').forEach(function(item) {
        item.addEventListener('click', showTopnavmenu);
    });

    document.querySelector('.topNavMenu').addEventListener('click', function() {
        this.closest('.tabs-menu-top').querySelector('#materials-mobile .active-tab-menu').dispatchEvent(new Event('click'));
    });

    function showTopnavmenu(e) {
        e.preventDefault();
        var materialsMenu = this.closest('.topnav');
        materialsMenu.classList.toggle("responsive");
        materialsMenu.querySelector('.active-tab-menu').classList.remove('active-tab-menu');
        this.classList.add('active-tab-menu');
    }

    //Accordion
    document.querySelectorAll('.item.accordion').forEach(function (item) {
        item.addEventListener('click', showAccordion);
    });

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }

    function showAccordion(e) {
        var time = Date.now();
        var target = e.target,
            panel = target.nextElementSibling,
            child = target.lastElementChild,
            activeColor = target.dataset.color;

        if (!target.classList.contains('accordion')) {
            return false;
        }

        document.querySelectorAll('.material-ul-mobile.active-tab-content-menu-mobile .item.accordion.active').forEach(function(item){
            item.classList.remove('active');
        });

        target.classList.add('active');

        window.scrollTo(0, getCoords(target).top);

        document.querySelectorAll('.material-ul-mobile.active-tab-content-menu-mobile .color-mobile.active-color').forEach(function(item){
            item.classList.remove('active-color');
        });
        target.querySelector('.color-mobile').classList.add('active-color');

        document.querySelectorAll('.material-ul-mobile.active-tab-content-menu-mobile .panel').forEach(function (panel) {
            panel.classList.remove('active-panel');
        });
        target.nextElementSibling.classList.add('active-panel');


        document.querySelectorAll('.material-ul-mobile.active-tab-content-menu-mobile .color-run').forEach(function(item) {
            item.classList.remove('color-run-active');
        });

    }

    document.querySelectorAll('#materialSubMenuMobile .color-mobile').forEach(function(item){
        item.addEventListener('click', function () {
            this.querySelector('.color-run').classList.toggle("color-run-active");
        });
    });

    //Color Accordion Mobile
    document.querySelectorAll('#materialSubMenuMobile .color-list li').forEach(function (item) {
        item.addEventListener('click', showColorMob);
    });

    function showColorMob(e) {
        e.preventDefault();

        var listItem,
            urlImg,
            activeColor;

        if (this.classList.contains('col')) {
            urlImg = this.querySelector('a').dataset.url;
            activeColor =  this.querySelector('a').dataset.color;
            listItem = this;
        } else {
            urlImg = this.dataset.url;
            activeColor = this.dataset.color;
            listItem = this.parentNode;
        }

        listItem.parentNode.querySelectorAll('li').forEach(function(li){
            li.classList.remove('active-color-submenu');
        });
        listItem.classList.add('active-color-submenu');

        listItem.closest('.color-mobile').querySelector('a').className = 'color-back';
        listItem.closest('.color-mobile').querySelector('a').classList.add(activeColor);

        listItem.closest('.material-ul-mobile').querySelector('.active-panel .tabs-img-materials img').src = urlImg;
    }


//Materials menu mobile

    var materialMainMenuMobail = document.getElementById('materials-mobile');
    materialMainMenuMobail.addEventListener("click", clickMainMenuMobail);

    function clickMainMenuMobail(e) {
        var target = e.target,
            activeSubMenu = target.dataset.tab;

        document.querySelector('.mat-items-mob.active-tab-menu').classList.remove('active-tab-menu');
        if (!target.classList.contains('mat-items-mob')) {
            target = target.parentNode;
        }
        target.classList.add('active-tab-menu');

        document.querySelector('.material-ul-mobile.active-tab-content-menu-mobile').classList.remove('active-tab-content-menu-mobile');
        document.querySelector('.material-ul-mobile.' + activeSubMenu).classList.add('active-tab-content-menu-mobile');

    }
})();


// Package Menu
var menuPackage = document.getElementById('carousel-package');
menuPackage.addEventListener('click', clickMenu2);

function clickMenu2(e) {
    var target = e.target;
    var activeTab = target.dataset.tab;

    document.querySelector('.slide-item2.active-tab-menu').classList.remove('active-tab-menu');
    target.classList.add('active-tab-menu');

    document.querySelector('.tabs2.active-tab-content').classList.remove('active-tab-content');
    document.querySelector('.tabs2.' + activeTab).classList.add('active-tab-content');
}


// Carousel 2
var controlC2 = document.querySelector('#controlsContainer2');

var slider2 = tns({
    container: '#carousel-package',
    items: 6,
    slideBy: 1,
    autoplay: false,
    hasControls: controlC2,
    controls: controlC2,
    prevButton: '#prev2',
    nextButton: '#next2',
    nav: false,
    loop: false,
    rewind: true,
    swipeAngle: false,
    speed: 400,

    responsive: {
        320: {
            items: 1
        },
        420: {
            items: 2
        },
        720: {
            items: 3
        },
        1024: {
            items: 4
        },
        1240: {
            items: 6
        }
    }
});


// Carousel 3
var controlC3 = document.querySelector('#controlsContainer3');

var slider3 = tns({
    container: '#carousel-client',
    items: 6,
    slideBy: 1,
    hasControls: controlC3,
    controls: controlC3,
    prevButton: '#prev3',
    nextButton: '#next3',
    nav: false,
    loop: false,
    rewind: true,
    swipeAngle: false,
    speed: 400,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3500,
    autoplayText: [
        "",
        ""
    ],

    responsive: {
        320: {
            items: 1
        },
        480: {
            items: 2
        },
        720: {
            items: 3
        },
        1024: {
            items: 4
        },
        1240: {
            items: 6
        }
    }
});


// Carousel 4
(function () {

    var slideIndex = 1;
    showSlides(slideIndex);
    var prev4 = document.getElementById("prev4");
    var next4 = document.getElementById("next4");
    prev4.addEventListener("click", minusSlides);
    next4.addEventListener("click", plusSlides);

    // Next/previous controls
    function minusSlides() {

        showSlides((slideIndex -= 1));
    }

    function plusSlides() {
        showSlides((slideIndex += 1));
    }

    // Slideshow
    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("map-block");
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";

    }

})();

//