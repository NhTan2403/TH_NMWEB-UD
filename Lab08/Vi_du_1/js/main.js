'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.featured__filter').length > 0) {
            var containerEl = document.querySelector('.featured__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });


    $('.hero__categories__all').on('click', function () {
        $('.hero__categories ul').slideToggle(400);
    });

    /*-----------------------
        Categories Slider
    ------------------------*/
    $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            0: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 3,
            },

            992: {
                items: 4,
            }
        }
    });
    /*-------------------
        Sửa lại hàm updateTotal cho Nhật Tân
    --------------------- */
    function updateTotal() {
        // 1. Tìm đơn giá (76.300 đ) - dùng class của template Ogani
        var priceElement = $('.shoping__cart__price').first();
        if (priceElement.length > 0) {
            var priceText = priceElement.text().replace(/[^\d]/g, '');
            var pricePerUnit = parseFloat(priceText) || 0;

            // 2. Lấy số lượng từ ô input (thường là trong div .pro-qty)
            var quantity = parseFloat($('.pro-qty input').val()) || 0;

            // 3. Tính tổng
            var total = pricePerUnit * quantity;

            // 4. Cập nhật vào cột Tổng (shoping__cart__total)
            $('.shoping__cart__total').first().text(total.toLocaleString('vi-VN') + ' đ');

            // 5. Cập nhật phần Hóa đơn bên dưới (Cart Total)
            $('.checkout__order__subtotal span').text(total.toLocaleString('vi-VN') + ' đ');
            $('.checkout__order__total span').text(total.toLocaleString('vi-VN') + ' đ');
        }
    }

    // Chờ HTML load xong mới chạy
    $(document).ready(function () {
        // Gắn sự kiện vào nút + và - của template Ogani
        $('.pro-qty').on('click', '.qtybtn', function () {
            // Đợi 1 chút để code gốc của template cập nhật số lượng vào input xong mới tính
            setTimeout(function () {
                updateTotal();
            }, 50);
        });

        // Nếu người dùng tự gõ số
        $('.pro-qty').on('input', 'input', function () {
            updateTotal();
        });

        // Chạy lần đầu khi load trang
        updateTotal();
    });

})(jQuery);
