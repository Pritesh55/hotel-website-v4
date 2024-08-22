
    // Assuming each slide has the class 'slide'
    const slides = document.querySelectorAll('.slideContainer > .card');
    // Replace with your actual slide class name

    // Get the total number of slides
    const totalSlides = slides.length;

    console.log("Total number of slides:", totalSlides);

    const slideContainer = document.querySelector('.slideContainer');
    // Replace with your container's selector

    // Initialize the index i
    let ActiveSlideNum = 0;

    // Function to update the transform based on the value of i
    function updateTransform() {
        slideContainer.style.transition = 'transform 0.5s ease';


        if (window.matchMedia("(max-width: 992px)").matches) {
            // If the screen width is greater than 1400px
            slideContainer.style.transform = `translateX(calc((-48% - 20px) * ${ActiveSlideNum}))`;
            // (width of card + gap-between two cards  (column-gap of flex-box) (slideContainer)) should be translated....
        }


        if (window.matchMedia("(max-width: 576px)").matches) {
            // If the screen width is greater than 1400px
            slideContainer.style.transform = `translateX(calc((-100% - 20px) * ${ActiveSlideNum}))`;
            // (width of card + gap-between two cards (column-gap of flex-box (slideContainer)) ) should be translated....
        }

        if (window.matchMedia("(min-width: 992px)").matches) {
            // If the screen width is 1400px or less
            slideContainer.style.transform = `translateX(calc((-33.33% - 14px) * ${ActiveSlideNum}))`;
            // (width of card + gap-between two cards (column-gap of flex-box (slideContainer)) ) should be translated....
            //   width = -(33.33% - 26px) -(column gap = 40px)  => -33.33% +26px -40px => -33.33% - 14px

        }

        // slideContainer.style.transform = `translateX(calc((-33.33% - 13px) * ${ActiveSlideNum}))`;
    }


    // Event listener for button click to increment i
    const prevbutton = document.querySelector('.prevButton'); // Replace with your actual button selector
    prevbutton.addEventListener('click', function () {

        if (ActiveSlideNum >= 0) {

            ActiveSlideNum--;
            updateTransform();
            console.log('ActiveSlideNum is decreased to = ', ActiveSlideNum);
        }

        if (ActiveSlideNum < 0) {

            ActiveSlideNum = totalSlides - 1;
            updateTransform();
            console.log('ActiveSlideNum is decreased to = ', ActiveSlideNum);

        }

    });

    // Event listener for button click to increment i
    const nextbutton = document.querySelector('.nextButton'); // Replace with your actual button selector
    nextbutton.addEventListener('click', function () {

        if (ActiveSlideNum < (totalSlides - 1)) {
            ActiveSlideNum++;
            updateTransform();
            console.log('ActiveSlideNum is increased to = ', ActiveSlideNum);
        }


        // If we reach the last slide (clone of the first), reset to the first slide wit
        if (ActiveSlideNum >= (totalSlides - 1)) {
            setTimeout(() => {
                slideContainer.style.transition = 'none'; // Disable transition
                ActiveSlideNum = 0; // Reset to the first slide

                console.log('ActiveSlideNum is Reset to = ', ActiveSlideNum);
                // Reset to 0;
                updateTransform(); // Update transform without animation

                // Re-enable transition for subsequent clicks
                setTimeout(() => {
                    slideContainer.style.transition = 'transform 0.5s ease';
                }, 0);
            }, 500); // Match the duration of the transition
        }


    });