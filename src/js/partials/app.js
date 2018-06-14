$(document).ready(function () {


    var sliderBgItems = $('.slider-bg-item');
    var sliderBgItemsLength = sliderBgItems.length;
    var sliderDownItems = $('.slider-down-item');
    var sliderTextItems = $('.slider-text-item');
    sliderBgItems.eq(0).show().addClass('active');
    sliderDownItems.eq(0).addClass('active');
    sliderTextItems.eq(0).addClass('active');

    var mySliderTimed = setInterval(function () {
        sliderPlay();
    }, 5000);

    sliderDownItems.on('click', function () {
        var activeSlider = $('.slider-bg-item.active');
        var activeSliderDown = $('.slider-down-item.active');
        var nextSliderIndex = $(this).index();
        $('.slider-text-item.active').removeClass('active');
        activeSlider.fadeOut().removeClass('active');
        sliderDownItems.eq(nextSliderIndex).removeClass('hide');
        activeSliderDown.removeClass('active').addClass('hide');
        sliderBgItems.eq(nextSliderIndex).fadeIn().addClass('active');
        sliderDownItems.eq(nextSliderIndex).addClass('active');
        sliderTextItems.eq(nextSliderIndex).addClass('active');
        clearInterval(mySliderTimed);
        mySliderTimed = setInterval(function () {
            sliderPlay();
        }, 5000);
    });

    function sliderPlay() {
        var activeSlider = $('.slider-bg-item.active');
        var activeSliderIndex = activeSlider.index();
        var activeSliderDown = $('.slider-down-item.active');
        var nextSliderIndex = activeSliderIndex + 1;
        if (nextSliderIndex > sliderBgItemsLength - 1) nextSliderIndex = 0;
        $('.slider-text-item.active').removeClass('active');
        activeSlider.fadeOut().removeClass('active');
        sliderDownItems.eq(nextSliderIndex).removeClass('hide');
        activeSliderDown.removeClass('active').addClass('hide');
        sliderBgItems.eq(nextSliderIndex).fadeIn().addClass('active');
        sliderDownItems.eq(nextSliderIndex).addClass('active');
        sliderTextItems.eq(nextSliderIndex).addClass('active');
        clearInterval(mySliderTimed);
        mySliderTimed = setInterval(function () {
            sliderPlay();
        }, 5000);
    }

    var countered = false;

    $(window).on('scroll', function () {

        if ($('.happy').length > 0) {

            if (($(this).scrollTop() > $('.happy').offset().top - $(this).height()) && !countered) {
                countered = true;
                $('.happy-block-item span').each(function () {
                    runCounter($(this));
                });
            }

        }

    });

    function runCounter(el) {
        var countTo = parseInt(el.attr('data-happy'));
        for (var i = 0; i < countTo; i++) {
            (function(){
                var j = i;
                setTimeout(function () {
                    el.text(j)
                }, (3000 * j) / countTo);
            })();
        }
    }

    // Accordion

    $('#accordion li.active>article').slideDown();

    $('#accordion li>header').on('click', function () {
        if (!$(this).parent().hasClass('active')) {
            $('#accordion li.active>article').slideUp();
            $('#accordion li.active').removeClass('active');
            $(this).next().slideDown();
            $(this).parent().addClass('active');
        }
    });

    $('#accordion li>article').mCustomScrollbar();

    // Last News (masonry)
    var $grid = $('.last-news-grid').masonry({
        itemSelector: '.last-news-grid-item'
    });

    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    // Shares news
    var sharesImgBlocks = $('.shares-item-img');

    sharesImgBlocks.on('mousemove', function (e) {
        var x = e.offsetX === undefined ? e.layerX : e.offsetX;
        var y = e.offsetY === undefined ? e.layerY : e.offsetY;
        var that = $(this);

        var oneStepX = that.width() / 100;
        var oneStepY = that.height() / 100;

        var newPositionX = x / oneStepX;
        var newPositionY = y / oneStepY;

        that.css({
            backgroundPosition: newPositionX + '% ' + newPositionY + '%'
        });
    });

    // Modal windows
    var orderBtn = $('.tariff-button'),
        orderModal = $('#modal-order'),
        modalClose = $('.form__close'),
        feedbackModal = $('#modal-feedback'),
        showFeedbackBtn = $('.header-nav-menu li').eq(4),
        sliderOrderBtn = $('.category__slider-item');

    orderBtn.on('click', function () {
      var tariffName = $(this).parents('.tariff').find('.tariff-name').text();
      var serviceName = $(this).parents('article').find('h2').text();
      orderModal.find('#modalTariff').text(tariffName);
      orderModal.find('[name="order_service_tarif"]').val(tariffName);
      orderModal.find('#modalName').text(serviceName);
      orderModal.find('[name="order_service_name"]').val(serviceName);
      orderModal.fadeIn(200);
    });

    sliderOrderBtn.on('click', function(){
        var tariffName = $(this).find('.category__slider-name').text();
        var serviceName = $(this).parents('.category__slider').find('.category__slider-title').text() !== '' ? $(this).parents('.category__slider').find('.category__slider-title').text() : $(this).parents('article').find('h2:first').text();
        orderModal.find('#modalTariff').text(tariffName);
        orderModal.find('[name="order_service_tarif"]').val(tariffName);
        orderModal.find('#modalName').text(serviceName);
        orderModal.find('[name="order_service_name"]').val(serviceName);
        orderModal.fadeIn(200);
    });

    modalClose.on('click', function () {
        $(this).parents('.modal').fadeOut(200);
    });

    showFeedbackBtn.on('click', function (el) {
        el.preventDefault();
        feedbackModal.fadeIn(200);
    });

    // Map on index page
    var mapBlock = $('.map');
    var mapBlockOpen = $('.map i');
    var mapClose = $('.map__close');

    mapBlockOpen.on('click', function () {
        mapBlock.addClass('open');
        $('body, html').animate({scrollTop: mapBlock.offset().top}, 400);
    });

    mapClose.on('click', function () {
        mapBlock.toggleClass('open');
        var to = mapBlock.offset().top - $(window).height() / 2 + (mapBlock.height() / 4);
        $('body, html').animate({scrollTop: to}, 400);
    });

    // Lazy images
    $('[data-src]').each(function () {
        var img = $(this).attr('data-src');
        $(this)
            .css({'background-image': 'url(' + img + ')'})
            .removeAttr('data-src');
    });

    // Email subscribe
    $('#es_txt_button_pg').val('Подписаться');
    $('#es_txt_email_pg').prop('placeholder', 'E-mail');


    // Burger menu
    var mobileMenu = {
        header: $('.header'),
        burger: $('.burger'),
        action: burgerAction
    };

    mobileMenu.burger.on('click', function () {
        mobileMenu.action('active')
    });

    function burgerAction(a) {
        this.header.toggleClass(a);
        this.burger.toggleClass(a);
    }

    // Slider tariffs
    $(".owl-carousel.sliderOne").owlCarousel({
        nav: true,
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
            },
            720: {
                items: 4,
                slideBy: 4,
            }
        },
        margin: 15,
        navContainer: '[data-slider="sliderOne"]',
        navClass: ['category__btn','category__btn category__btn_next'],
        navText: ['<','>']
    });

    $(".owl-carousel.sliderTwo").owlCarousel({
        nav: true,
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
            },
            720: {
                items: 4,
                slideBy: 4,
            }
        },
        margin: 15,
        navContainer: '[data-slider="sliderTwo"]',
        navClass: ['category__btn','category__btn category__btn_next'],
        navText: ['<','>']
    });

    // Маска телефонов
    $('input[type="tel"]').mask('(999) 999-9999');

    // Ввод лицевого счета. Только цифры
    $(document).on('input', '#account', function(e){
      this.value = this.value.replace(/[^\d.]+|(\.\d{2})\d*$/g, '$1');
    });

    // Обертка для каждой таблицы
    $('table').wrap('<div class="page-content-table"/>');

});