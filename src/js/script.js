$(document).ready(function(){
  $('.slider__carousel').slick({
    variableWidth: true,
    centerMode: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ],
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
  });

  $('.reviews__slider-carousel').slick({
    centerMode: true,
    variableWidth: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ],
    prevArrow: '.slick-prev2',
    nextArrow: '.slick-next2',
  });

  $('.reviews__slider-carousel').on('afterChange', function(event, slick, currentSlide){
  // Удаляем предыдущий custom-center-style класс у всех элементов
  $('.reviews__slider-carousel-item').fadeOut(300, function() { 
    $(this).removeClass('custom-center-style').fadeIn(300);
  });
  $('.custom-center-style').fadeOut(300, function() { 
    $(this).removeClass('custom-center-style').addClass('reviews__slider-carousel-item').fadeIn(300);
  });

  // Получаем индекс центрального слайда
  var centerIndex = slick.currentSlide;

  // Добавляем custom-center-style класс к центральному слайду
  $('.reviews__slider-carousel-item[data-slick-index="' + centerIndex + '"]').fadeOut(300, function() {
    $(this).addClass('custom-center-style').removeClass('reviews__slider-carousel-item').fadeIn(300);
   });
  });

  function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Введите не менее {0} символов!")
            },
            phone: {
                required: "Пожалуйста, введите свой номер телефона",
                digits: "Пожалуйста, введите только цифры"
            }
        }
    });
  };
  
  validateForms('#consultation-form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");
  
});