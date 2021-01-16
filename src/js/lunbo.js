$(function() {
    var mySwiper2 = new Swiper('#swiper2', {
        autoplay: 2000,
        slidesPerView: 4,
        slidesPerGroup: 4, //可选选项，自动滑动
        spaceBetween: 20,
        paginationClickable: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
    });
})