$(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        $('.card').addClass('border-0')
    } else {
        // false for not mobile device
        $('section').addClass('vh-100');
        $('.card').addClass('shadow');
    }
})