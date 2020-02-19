// Home
if($("body").hasClass("home")) {
    $('.home .vtex__content-place-holder--bannerHome').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
}
