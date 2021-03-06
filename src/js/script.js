$(document).ready(function() { // начало document.ready

  // $('.btn').click(function(e){
  //   e = event.preventDefault();
  //   $('.popup-form-wrapper').bPopup({
  //     closeClass: 'popup-close'
  //   });
  // });
  $('.popup-1').click(function(e){
    e = event.preventDefault();
    var h4 = $(this).data('h4');
    var span = $(this).data('span');
    console.log(h4);
    console.log(span);
    var popup_h4 = $('.popup-form-wrapper-1').find('h4');
    var popup_span = $('.popup-form-wrapper-1').find('span');
    popup_h4.append(h4);
    popup_span.append(span);
    $('.popup-form-wrapper-1').bPopup({
      onClose: function(){
          popup_h4.empty();
          popup_span.empty();
      },
      closeClass: 'popup-close'
    });
  });
  $('.popup-2').click(function(e){
    e = event.preventDefault();
    var h4 = $(this).data('h4');
    var span = $(this).data('span');
    console.log(h4);
    console.log(span);
    var popup_h4 = $('.popup-form-wrapper-2').find('h4');
    var popup_span = $('.popup-form-wrapper-2').find('span');
    popup_h4.append(h4);
    popup_span.append(span);
    $('.popup-form-wrapper-2').bPopup({
      onClose: function(){
          popup_h4.empty();
          popup_span.empty();
      },
      closeClass: 'popup-close'
    });
  });

  $('.header__slider').bxSlider({
    controls: true,
    pager: true,
    // auto:true
  });

  $('.p-img').bxSlider({
    controls: true,
    pager: false,
    auto:true
  });

  var containerEl = document.querySelector('.proj-items');
  var mixer = mixitup(containerEl, {
    animation: {
      duration: 1000
        }
    });
  $('.design-slider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    });

    $('.iinput-sq').bind("change keyup input click", function() {
      if (this.value.match(/[^0-9]/g)) {
          this.value = this.value.replace(/[^0-9]/g, '');
      }
    });

    $('.j_tel').mask("9-999-999-99-99");
    $('.input-tel').mask("9-999-999-99-99");

    $('.j_select').selectmenu();


      
        
  new WOW().init();  
}); // конец document.ready
function initialize() {
  //получаем наш div куда будем карту добавлять
  var mapCanvas = document.getElementById('map_canvas');
  // задаем параметры карты
  var mapOptions = {
      //Это центр куда спозиционируется наша карта при загрузке
      center: new google.maps.LatLng(55.64253033, 37.63486862),
      //увеличение под которым будет карта, от 0 до 18
      // 0 - минимальное увеличение - карта мира
      // 18 - максимально детальный масштаб
      zoom: 14,
      scrollwheel: true,
      disableDefaultUI: true,
      styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
      //Тип карты - обычная дорожная карта
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //Инициализируем карту
  var map = new google.maps.Map(mapCanvas, mapOptions);

  //Объявляем массив с нашими местами и маркерами
  var markers = [],
      myPlaces = [];
  //Добавляем места в массив
  myPlaces.push(new Place('', 55.64253033, 37.63486862, ''));
  //Теперь добавим маркеры для каждого места
  for (var i = 0, n = myPlaces.length; i < n; i++) {

      var companyImage = new google.maps.MarkerImage('img/marker.png',
        new google.maps.Size(100,123),
        new google.maps.Point(0,0),
        new google.maps.Point(0,45)
      );

      var marker = new google.maps.Marker({
          //расположение на карте
          position: new google.maps.LatLng(myPlaces[i].latitude, myPlaces[i].longitude),
          map: map,
          icon: companyImage,
          //То что мы увидим при наведении мышкой на маркер
          // title: myPlaces[i].name
        });
      //Добавим попап, который будет появляться при клике на маркер
      var infowindow = new google.maps.InfoWindow({
        content: myPlaces[i].name
      });
      //привязываем попап к маркеру на карте
      makeInfoWindowEvent(map, infowindow, marker);
      markers.push(marker);
  }
}
function makeInfoWindowEvent(map, infowindow, marker) {
  //Привязываем событие КЛИК к маркеру
  google.maps.event.addListener(marker, 'click', function() {
      // infowindow.open(map, marker);
  });
}
//Это класс для удобного манипулирования местами
function Place(name, latitude, longitude, description){
  this.name = name;  // название
  this.latitude = latitude;  // широта
  this.longitude = longitude;  // долгота
  this.description = description;  // описание места
}
//Когда документ загружен полностью - запускаем инициализацию карты.
google.maps.event.addDomListener(window, 'load', initialize);