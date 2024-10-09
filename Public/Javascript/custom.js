

/*=============== SHOW MENU ===============*/
function mobileMenuToggle(event) {
    const mobileMenu = document.querySelector('.nav-menubar-outer-box');
    const mobileMenuOpenIcon = document.querySelector('.nav-open-icon');
    const mobileMenuCloseIcon = document.querySelector('.nav-close-icon');
    if (mobileMenu) {
        mobileMenu.classList.toggle('show');
        mobileMenuCloseIcon.classList.toggle('show');
        mobileMenuOpenIcon.classList.toggle('show');
    }

    console.log('clicked on mobile menu :: just to check');

}
/*=============== SHOW MENU ===============*/

// document.getElementByClassName('dateInput').addEventListener('input', function (e) {
//     var input = e.target.value;
//     if (!/^\d{2}\.\d{2}\.\d{4}$/.test(input)) {
//         e.target.setCustomValidity('Please enter the date in the format: dd.mm.yyyy');
//     } else {
//         e.target.setCustomValidity('');
//     }
// });

class ResponsiveSlider {

    // change 02 :: attibute addded :: autoPlayInterval = 3000 ::
    // -------------------------------------------------------------- 
    constructor(sliderContainerSelector, cardSelector, prevButtonSelector, nextButtonSelector, autoPlayInterval = 3000) {
        // change 02 :: attibute addded :: autoPlayInterval = 3000 ::
        // -------------------------------------------------------------- 
        this.slideContainer = document.querySelector(sliderContainerSelector);
        this.slides = document.querySelectorAll(`${sliderContainerSelector} > ${cardSelector}`);
        this.prevButton = document.querySelector(prevButtonSelector);
        this.nextButton = document.querySelector(nextButtonSelector);
        this.ActiveSlideNum = 0;
        this.totalSlides = this.slides.length;

        // change 03 :: added four variables :: for autoplay
        // --------------------------
        this.autoPlayInterval = autoPlayInterval;
        this.autoPlayTimer = null;
        // -------------------------- 

        this.init();
    }


    updateTransform() {
        this.slideContainer.style.transition = 'transform 0.5s ease';

        if (window.matchMedia("(max-width: 992px)").matches) {
            this.slideContainer.style.transform = `translateX(calc((-48% - 20px) * ${this.ActiveSlideNum}))`;
        } else if (window.matchMedia("(max-width: 576px)").matches) {
            this.slideContainer.style.transform = `translateX(calc((-100% - 20px) * ${this.ActiveSlideNum}))`;
        } else if (window.matchMedia("(min-width: 992px)").matches) {
            this.slideContainer.style.transform = `translateX(calc((-33.33% - 14px) * ${this.ActiveSlideNum}))`;
        }
    }


    // change 04 :: added Four functions :: prevSlide(), nextSlide() , 
    // startAutoplay() on mouse Enter the section, stopAutoplay() mouse leave;
    // ----------------------------------------------------------------
    prevSlide() {
        if (this.ActiveSlideNum > 0) {
            this.ActiveSlideNum--;
        } else {
            this.ActiveSlideNum = this.totalSlides - 1;
        }
        this.updateTransform();
        console.log('ActiveSlideNum is decreased to = ', this.ActiveSlideNum);
    }

    nextSlide() {
        if (this.ActiveSlideNum < (this.totalSlides - 1)) {
            this.ActiveSlideNum++;
        } else {
            setTimeout(() => {
                this.slideContainer.style.transition = 'none';
                this.ActiveSlideNum = 0;
                this.updateTransform();

                setTimeout(() => {
                    this.slideContainer.style.transition = 'transform 0.5s ease';
                }, 0);
            }, 500);
        }

        console.log('ActiveSlideNum is increased to = ', this.ActiveSlideNum);
        this.updateTransform();
    }

    startAutoplay() {
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayInterval);
    }

    stopAutoplay() {
        clearInterval(this.autoPlayTimer);
    }
    // ----------------------------------------------------------------

    // change 05 :: when to invoke All functions :: init()
    // ----------------------------------------------------------------
    init() {
        this.prevButton.addEventListener('click', () => {
            this.prevSlide();
        });

        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
        });

        this.slideContainer.addEventListener('mouseenter', () => {
            this.startAutoplay();
        });

        this.slideContainer.addEventListener('mouseleave', () => {
            this.stopAutoplay();
        });

        this.updateTransform(); // Initial transform application
        // this.startAutoplay();
    }
}


// Initialize three sliders
document.addEventListener("DOMContentLoaded", function () {
    // change 01 :: added 3000 time interval for slide change :: in all slider
    const slider1 = new ResponsiveSlider('.sliderContainer1', '.card-custom', '.prevButton1', '.nextButton1', 3500);
    const slider2 = new ResponsiveSlider('.sliderContainer2', '.card-custom', '.prevButton2', '.nextButton2', 3500);
    const slider3 = new ResponsiveSlider('.sliderContainer3', '.card-custom', '.prevButton3', '.nextButton3', 3500);
});

// -------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------
// Dropdown in navbar 01 ::
// document.querySelectorAll('.mobile-accordion').forEach(item => {
//     const submenu = item.querySelector('.nav_sub_menu');
//     const dropdownIcon = item.querySelector('.dd-symbol');

//     if (!submenu) {
//         dropdownIcon.classList.add('no-dd');
//     } else {
//         dropdownIcon.classList.remove('no-dd');
//     }
// });

// ------------------------------------------------------------------------
// Dropdown in navbar 02 :: Add event listeners to all elements with the class 'mobile-accordion'

// new change 03.01 :: .mobile-accordion => .dd-symbol :: clcik event observe :: 
document.querySelectorAll('.dd-symbol').forEach(accordion => {

    accordion.addEventListener('click', function (event) {

        // to prevent javascript running two times...
        event.stopPropagation();

        // not to click on link...
        event.preventDefault();


        const clickedElement = event.target;
        console.log(clickedElement, 'clickedElement :: dd-symbol');
        console.log("So, You have clicked img tag :: Dropdown symbol ::");


        const parentElement = clickedElement.closest('.mobile-accordion');
        parentElement.classList.toggle('clicked');


        console.log(parentElement, 'this- cur-  li.nav-item :: li.nav-sub-item :: li.mobile-accordion :: li.clicked ');
        console.log('closest :: parentElement :: li.mobile-accordion is found');
        console.log('"clicked" is added... ');
        // parent_item :: cur- li.nav-item :: class added :: "clicked" 

        const already_open_menu = parentElement.querySelector(':scope >  .nav_sub_menu.dropdown-menu.dropdown_menu_custom.show');
        console.log(already_open_menu, 'is_already_open');


        // -------------------------------------------
        // new change 03.02 :: parent_item Redefined....
        const parent_item_01 = this.parentElement;
        const parent_item_02 = parent_item_01.parentElement;
        const parent_item = parent_item_02.parentElement;

        // console.log(parent_item_01, 'parent_item_01 :: cur-dd-symbol :: nav.menubar :: or :: nav_sub_menu');
        // console.log(parent_item_02, 'parent_item_02 :: d-flex.justify-between :: nav.menubar :: or :: nav_sub_menu');
        console.log(parent_item, 'New updated :: parent_item :: cur-ul :: nav.menubar :: or :: nav_sub_menu');
        console.log('So, :: parent_item :: Currunt Parent ul.nav.menubar or ul.nav_sub_menu is found...');
        // -------------------------------------------


        const all_nav_items_arr = parent_item.querySelectorAll(':scope > li.nav-item.mobile-accordion');
        const prev_nav_item = parent_item.querySelector(':scope > li.nav-item.mobile-accordion.clicked');

        console.log(all_nav_items_arr, 'all_nav_items_arr');
        console.log(`parent_item :: ul's all li.nav-item is selected..`);
        console.log(`parent_menu's all sub-menu Array is found..`);
        // console.log(prev_nav_item, 'prev_nav_item');
        // --------------------------------------------------------------------------------------



        const subMenu_arr = parentElement.querySelectorAll('.nav_sub_menu');

        console.log(parentElement, 'parentElement :: li.clicked');
        console.log(subMenu_arr, 'subMenu_arr');
        console.log(`So, Total ${subMenu_arr.length} submenues are there...`);

        const total_no_of_subMenu = subMenu_arr.length;
        // console.log(total_no_of_subMenu, 'total_no_of_subMenu');

        const dd_symbol = parentElement.querySelector('.dd-symbol');
        // console.log(dd_symbol);


        if (total_no_of_subMenu == 0) {
            // console.log('start checking dd icon');
            // remove dd icon..
            if (dd_symbol) {

                if (!dd_symbol.classList.contains('no-dd')) {
                    dd_symbol.classList.add('no-dd');
                    // console.log('remove dd icon');
                }
            }
        } else {
            // add  dd icon
            if (dd_symbol) {
                if (dd_symbol.classList.contains('no-dd')) {
                    dd_symbol.classList.remove('no-dd');
                    // console.log('add dd icon');
                }
            }

        }
        // --------------------------------------------------------------------------------------



        if (already_open_menu == null) {
            // already_open_menu.classList.remove('closed');
            // already_open_menu.classList.add('show');

            console.log('Menu is closed now...');
        } else {
            already_open_menu.classList.remove('show');
            already_open_menu.classList.add('closed');

            console.log('Menu was already open..So, "closed" class is added');
        }

        // console.log(parentItem, 'parentItem');
        // console.log(all_nav_items_arr.length, 'all_nav_items_arr length');



        console.log('Loop is started...');

        var open_sub_menu;
        var close_sub_menu;

        // Close all other sibling menus ::
        all_nav_items_arr.forEach((item, index) => {

            console.log(index + 1, 'index')

            console.log(item, 'item');
            console.log(parentElement, 'cur_item');

            if (item == parentElement) {

                if (already_open_menu == null) {
                    open_sub_menu = item.querySelector('.nav_sub_menu');

                    if (open_sub_menu) {
                        console.log('Menu was closed..');

                        open_sub_menu.classList.remove('closed');
                        open_sub_menu.classList.add('show');

                        console.log('So, "Show" class is added');
                        console.log('So, We have opened the Menu...after you cliked...');
                    }


                } else {

                    console.log('Menu was already open..');

                    if (!open_sub_menu.classList.contains('closed')) {
                        open_sub_menu.classList.add('closed');

                        console.log('So, "closed" class is added...');
                        console.log('So, We have closed the Menu...after you cliked...');
                    }


                    if (close_sub_menu.classList.contains('show')) {
                        open_sub_menu.classList.remove('show');

                        // Close all sibilings Accordions menues..
                        // console.log(item, 'item :: show removed');

                        console.log('So, "show" class is removed...');
                    }

                }

            } else {
                close_sub_menu = item.querySelector('.nav_sub_menu');
                console.log(close_sub_menu,'close_sub_menu');

                // changed :: 13-09-2024
                if (close_sub_menu) {
                    if (close_sub_menu.classList.contains('show')) {
                        close_sub_menu.classList.remove('show');
                        item.classList.remove('clicked');

                        // Close all sibilings Accordions menues..
                        console.log(item, 'item :: show removed');
                        console.log('item :: clicked is removed from closed accordion');
                    }

                    if (!close_sub_menu.classList.contains('closed')) {
                        close_sub_menu.classList.add('closed');

                        // Close all sibilings Accordions menues..
                        console.log(item, 'item :: closed class added');
                    }
                }



            }

        });


        // const nav_sub_menu_all_child = clickedElement.querySelectorAll('.nav_sub_menu');
        // const nav_sub_menu = clickedElement.querySelector('.nav_sub_menu');

        const nav_sub_menu_all_child = parentElement.querySelectorAll('.nav_sub_menu');
        const nav_sub_menu = parentElement.querySelector('.nav_sub_menu');

        // if (nav_sub_menu) {

        //     if (nav_sub_menu.classList.contains('closed')) {
        //         nav_sub_menu.classList.remove('closed');
        //         nav_sub_menu.classList.add('show');
        //         console.log('-------------------------');
        //         console.log(nav_sub_menu, 'parentElement - mobile-accordion--- querySelector .nav_sub_menu');
        //         console.log('closed removed..');
        //         console.log('-------------------------');
        //     } else if (nav_sub_menu.classList.contains('show')) {

        //         nav_sub_menu.classList.remove('show');
        //         nav_sub_menu.classList.add('closed');

        //         nav_sub_menu_all_child.forEach((child) => {
        //             console.log('-------------------------');
        //             console.log('Child element:', child);
        //             console.log('Show removed from this sub-menu');
        //             console.log('-------------------------');

        //             child.classList.remove('show');
        //             child.classList.add('closed');
        //         });

        //         console.log('-------------------------');
        //         console.log('show removed from all sub-menues..')
        //         console.log('-------------------------');
        //     }
        // }




    })

})









// Home page :: full screen Image slider :: 
window.onload = function () {

    $(document).ready(function () {

        // ------------------------------------------------------------------------------
        var sliderContainer4 = $('.sliderContainer4');

        sliderContainer4.slick({
            slidesToShow: 1, // Show 1 slide at a time
            slidesToScroll: 1, // Scroll 1 slide at a time


            draggable: true,
            swipeToSlide: true,
            touchMove: true,
            infinite: true, // Infinite loop scrolling

            // Custom left arrow
            prevArrow: '<button type="button" class="prevButton4 slideButtons4 slick-prev"> <img src="/Public/Images/icons/slide-previous-icon.svg" alt="" width="42" height="42" class="slideIcon4"> </button>',

            // Custom right arrow
            nextArrow: '<button type="button" class="nextButton4 slideButtons4 slick-next"> <img src="/Public/Images/icons/slide-next-icon.svg" alt="" width="42" height="42" class="slideIcon4"> </button>',


            autoplay: true, // Enable autoplay
            autoplaySpeed: 3000, // Set autoplay speed
        }).slick("slickPause");

        // ------------------------------------------------------------------------------
        var initialDelay = 5000;

        setTimeout(function () {
            sliderContainer4.slick("slickPlay");
        }, initialDelay);
        // ------------------------------------------------------------------------------

        // Flag to detect if mouse is in the container
        var isMouseInside = false;




        // Stop autoplay when mouse enters the slider
        $('.sliderContainer4').on('mouseenter', function () {
            isMouseInside = true;
            sliderContainer4.slick('slickPause'); // Stop autoplay when mouse enters
        });

        // Resume autoplay when mouse leaves the slider
        $('.sliderContainer4').on('mouseleave', function () {
            isMouseInside = false;
            sliderContainer4.slick('slickPlay'); // Start autoplay when mouse leaves
        });


        // ------------------------------------------------------------------------------


    });
}
$(document).ready(function () {
    $('.category-input-selection').click(function () {
        var shcolumn = "." + $(this).attr("name");
        $(shcolumn).fadeToggle();
    })
});
