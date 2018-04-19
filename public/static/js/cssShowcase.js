$(function () {  // $(document).ready shorthand
    $('.fadein_first').fadeIn('slow');
});

$(document).ready(function () {
    //TODO: bug report: object locatoin is not correct
    /* Every time the window is scrolled ... */
    $(window).scroll(function () {

        /* Check the location of each desired element */
        $('.fadein_element').each(function () {
            let _this = $(this);
            var bottom_of_object = _this.position().top + _this.outerHeight();            
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            console.log(`${_this.attr("id")} ${bottom_of_object} vs ${bottom_of_window}`);
            /* If the object is completely visible in the window, fade it it */
            if (bottom_of_window == bottom_of_object) {

                _this.animate({ 'opacity': '1' }, 1500);
                $(".div").not(_this).animate({ 'opacity': '0' }, 1500);;
            }

        });

    });

});