// Scripts.js
$(document).ready(function() {

  console.log('Scripts.js');

  // Fixed Header on Scroll
  var controller = new ScrollMagic.Controller({});
  new ScrollMagic.Scene({
    duration: 8000,	// the scene should last for a scroll distance of 100px
    offset: 80		// start this scene after scrolling for 80px
  }).setClassToggle('.header', 'fixed')
    .addTo(controller); // assign the scene to the controller
  new ScrollMagic.Scene({
    duration: 8000,	// the scene should last for a scroll distance of 100px
    offset: 80		// start this scene after scrolling for 80px
  }).setClassToggle('.page', 'fixed')
    .addTo(controller); // assign the scene to the controller


  // Hamburger Icon Trigger
  $('#hamburger').on('click', function (e) {
    console.log($(this));
    console.log($(this).hasClass('open'));
    if ($(this).hasClass('open')) {
      $('.wrapper').removeClass('open');
      $(this).removeClass('open');
      $(this).removeClass('is-active');
      $('#menu-mobile').removeClass('open');
    } else {
      $('.wrapper').addClass('open');
      $(this).addClass('open');
      $(this).addClass('is-active');
      $('#menu-mobile').addClass('open');
    }
  });


  // Responsive Menu On Canvas
  $("#menu-mobile").mmenu({
    offCanvas: false,
    slidingSubmenus: true,
    "extensions": [
      "theme-dark"
    ],
    "navbar": {
      "add": true,
      "title": "",
      "titleLink": "parent"
    }
  });

  // Responsive Menu Off Canvas
  // var $menu = $("#menu-mobile").mmenu({
  //   offCanvas: true
  // });

  // var $icon = $("#hamburger");
  // var API = $menu.data( "mmenu" );
  //
  // $icon.on( "click", function() {
  //   API.open();
  // });

  // API.bind( "open:start", function() {
  //   setTimeout(function() {
  //     $icon.addClass( "is-active" );
  //   }, 10);
  // });
  // API.bind( "close:start", function() {
  //   setTimeout(function() {
  //     $icon.removeClass( "is-active" );
  //   }, 10);
  // });


  // Basic Tabs
  $('.panel-tabs ul li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $(this).parent().children('.panel-tab-link').removeClass('current');
    $(this).parent().parent().children('.panel-tabs-content').children('.panel-tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  });

  // Owl Carousel
  $(".owl-carousel").owlCarousel({
    margin: 10,
    autoWidth: false,
    nav: true,
    loop: true,
    items: 1,
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
  });

  // Tooltip
  $('.tooltip').tooltipster({
    animation: 'fade',
    delay: 200,
    // theme: 'tooltipster-punk',
    trigger: 'hover',
    // interactive: true
  });

  // Toggle Advanced Search
  $('#toggle-advanced-search').click(function() {
    $('.advanced-search').toggle();
    $(this).toggleClass('open');
  });

  // Toggle Different Currencies
  $('#toggle-different-currencies').click(function() {
    $('.different-currencies').toggle();
    $(this).toggleClass('open');
  });

  // Toggle Write Review
  $('#review-form-trigger').click(function() {
    $('#review-form').toggle();
    $(this).toggleClass('open');
  });

  // Sticky Table Headers
  // $('.panel-table-fixed').stickyTableHeaders({fixedOffset: $('.header')});

  // Freeze Table Headers
  // $('.panel-table-fixed').freezeHeader({'offset' : '100px'});

  // Expand/Collapse
  $('.panel-toggle-trigger').click(function() {
    $(this).toggleClass('open');
    $(this).siblings('.panel-toggle-content').toggleClass('open');
  });

  // Slicker Slider
  $('.slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true
  });

  $(document).on('click', '.yamm .dropdown-menu', function(e) {
    e.stopPropagation()
  })

});
