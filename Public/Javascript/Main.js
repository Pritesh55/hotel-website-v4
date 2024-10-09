$(document).ready(function () {
    /*lightbox */
    $('.lightbox').fancybox({
        loop: true,
        arrows: false,
        idleTime: false,
        buttons: [
            "close"
        ],
        infobar : false,
        afterLoad : function( instance, current ) {
          if ( instance.group.length > 1 && current.$content ) {
            current.$content.append('<button data-fancybox-prev class="fancybox-button custom fancybox-button--arrow_left" title="previous"><i class="far fa-chevron-left"></i></button><button data-fancybox-next class="fancybox-button custom fancybox-button--arrow_right" title="next"><i class="far fa-chevron-right"></i></button>');
          }
          current.$content.append('<div class="fancybox-custom-caption">' + current.opts.caption + '</div>');
        },
        baseTpl:
        '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-inner">' +
                '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-stage"></div>' +
            "</div>" +
        "</div>"
    });

    //Simpleselect init
    $('div:not(.km_input) > select').simpleselect();

    /*toanchor scroll behaviour*/
    $('.toanchor').on('click', function(e) {
        $('html, body').animate({
            scrollTop: $($(this).data('target')).offset().top
        }, 500);
    });

    /*toggle Searchbutton */
    $('.searchbutton').on('click', function(e){
        e.preventDefault();
        $(this).toggleClass('open');
        $('#search-overlay').toggleClass('open');
    });
    $('.close-search').on('click', function(e) {
        e.preventDefault();
        $('#search-overlay, .searchbutton').removeClass('open');
    });

    /*News Selectlist categorie onchange*/
    if($('.news > .categories').length && $('.news > .selectlist').length){
        $('.news > .categories input[type="checkbox"]').change(function() {
            var cat = $(this).attr("value");
            $('.news > .selectlist .article.'+cat).toggleClass('hide');
        });
    }


    /*Static Powermail Conditions*/
    function markpowermailfield() {
        if($('.powermail_fieldwrap_package select').val() == "Vitales Duett"){
            $('.powermail_fieldwrap_naechte input').val('1').attr('readonly', 'readonly').addClass('form-control');
        }else{
            $('.powermail_fieldwrap_naechte input').val('').attr('readonly', false).removeClass('form-control');
        }
    }

    /*Powermail Conditions with get parameter*/
    var pageURL = window.location.search.substring(1),
    sURLVariables = pageURL.split('&'),
    parameterName,
    i;
    for (i = 0; i < sURLVariables.length; i++) {
        parameterName = sURLVariables[i].split('=');
        if (parameterName[0] === "tx_powermail_pi1%5Bfield%5D%5Bpackage%5D" || parameterName[0] === "tx_powermail_pi1[field][package]") {
            if (parameterName[1] !== undefined) {
                if (parameterName[1] === "Vitales%20Duett") {
                    $('.powermail_fieldwrap_naechte input').val('1').attr('readonly', 'readonly').addClass('form-control');
                }
            }
        }
    }

    /*Static Powermail Conditions*/
    $('.powermail_fieldwrap_package select').on('change', function() {
        markpowermailfield();
    });


    if($('.ismobile').css('display') == 'none'){
        $('a[href^="tel:"]').click(function(e) {
            e.preventDefault();
            var num = $(this).attr('href').replace('tel:', 'Tel: ');
            alert(num);
        });
    }

    /*onload functions*/
    $(window).on('load', function(e){
        /*Static Powermail Conditions*/
        markpowermailfield();

        /*add scroll class*/
        if($(window).scrollTop() > 0)
            $('body').addClass('scrolled');
        else
            $('body').removeClass('scrolled');

        // +function checkaKMForm() {
        //     if($('#km_form_616_1').length > 0) {
        //         if($('#km_form_616_1 form #land option').length > 0) {
        //             $('select#land').simpleselect();
        //         } else {
        //             setTimeout(checkaKMForm, 500);
        //         }
        //     }
        // }();
    });

    /*onscroll functions*/
    $(window).on('scroll', function(){
        if($(window).scrollTop() > 0)
            $('body').addClass('scrolled');
        else
            $('body').removeClass('scrolled');
    });

    /*onresize functions*/
    $(window).on('resize', function(){

    });
});

//Lazyload
(function() {
    new LazyLoad({
        elements_selector: ".lazy"
    });
})();

//Smooth nav transition
$('.navbar-collapse').on('show.bs.collapse', function () {
    $(this).addClass("show");
    $('html').addClass("opennav");
}).on('hide.bs.collapse', function () {
    $('html').removeClass("opennav");
});
