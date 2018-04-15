'use strict';

// Load the main page
function loadMainPage() {
  if (checkAuthOrSignin()) {
    // Fade out login page, load in data, and fade in main page
    console.log('fireflies fade out');
    $('#firefly-field').addClass('blur');
    $('body').removeClass('gravity');
    PAUSE_GRAVITY_SIMULATION = true;  // Pause firefly field in the background
    $('#login-page').fadeOut('fast', function() {
      console.log('login page fade out');
      firebase.database().ref('content').once('value').then(populateMainPage);
      setupParallaxIntro();
      $('.main-page').fadeIn('fast', function() {
        console.log('main page fade in');
      });
    });
  }
}

// Setup parallax intro scene
function setupParallaxIntro() {
  console.log('setupParallaxIntro');

  var container = $('#parallax');
  // container.children('.parallax').each(function(i) {
  //   var url = PARALLAX_PRELOADED_IMAGES['parallax/' + i + '.png'];
  //   if (url) {
  //     $(this).css('background-image', 'url(' + url + ')');
  //   } else {
  //     console.log('Invalid image path!');
  //   }

    // var $this = $(this);
    // getDownloadURL('parallax/' + i + '.png', function(url) {
    //   $this.css('background-image', 'url(' + url + ')');
    // });
  // });
  // container.delay(2000).fadeIn('fast');
  container.fadeIn('fast');
  // TODO: try loading in background using CSS and then show?

  /* Using rellax.min.js from Open Source */
  // var rellax = new Rellax('.parallax');

  /* Using parallax.js from Google Developers */
  // initializeParallax(document.querySelector('#main-page'));
}

// Get download URL from cloud storage
function getDownloadURL(path, callback) {
  console.log('getDownloadURL:', path);
  if (!callback) {
    console.log('Error! Callback DNE');
    return;
  }
  // Create a reference to the file we want to download
  firebase.storage().ref(path).getDownloadURL().then(callback
    // Insert url into an <img> tag to "download"
    // jQuery.get(url);   // Preload/cache images
  ).catch(function(error) {
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/canceled': break;
      case 'storage/object_not_found':  // DNE
      case 'storage/unauthorized':      // Not auth'd
      case 'storage/unknown':           // Unknown error
      default:
        console.log(error);
    }
  });
}

// Populate main page data
function populateMainPage(pagedata) {
  console.log('populateMainPage:', pagedata.val());

  // Sanity check
  if (!pagedata.val()) {
    return alert('Could not load data! Please let us know if you see this error.');
  }
  var data, container, temp;

  // START: our-story
  data = pagedata.val()['our-story'];
  if (data) {
    container = $('#our-story');
    data.forEach(function(section) {
      $.each(section, function(key, value) {
        $(document.createElement('h3'))
          .addClass('main-page__data')
          .text(key)
          .appendTo(container);
        temp = value.split('\n');
        temp.forEach(function(text) {
          $(document.createElement('p'))
            .addClass('main-page__data')
            .text(text)
            .appendTo(container);
        });
      });
    });
  }
  // END: our-story

  // START: event-details
  data = pagedata.val()['event-details'];
  if (data) {
    container = $('#location');
    $(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.location['venue-name'])
      .appendTo(container);
    $(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.location['address'])
      .appendTo(container);

    container = $('#schedule');
    $(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.schedule['date'])
      .appendTo(container);
    $(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.schedule['time'])
      .appendTo(container);

    container = $('#dresscode');
    $(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.dresscode)
      .appendTo(container);
  }
  // END: event-details

  // START: transportation
  data = pagedata.val()['transportation'];
  if (data) {
    container = $('#transportation');
    data.forEach(function(mode) {
      $.each(mode, function(key, value) {
        $(document.createElement('h3'))
          .addClass('main-page__data')
          .text(key)
          .appendTo(container);
        $(document.createElement('p'))
          .addClass('main-page__data')
          .text(value)
          .appendTo(container);
      });
    });
  }
  // END: transportation

  // START: accommodations
  data = pagedata.val()['accommodations'];
  if (data) {
    container = $('#accommodations');
    data.forEach(function(hotel) {
      $(document.createElement('h3'))
        .addClass('main-page__data')
        .text(hotel.name)
        .appendTo(container);
      $(document.createElement('p'))
        .addClass('main-page__data')
        .text(hotel.address)
        .appendTo(container);
      $(document.createElement('p'))
        .addClass('main-page__data')
        .text(hotel.description)
        .appendTo(container);
      $(document.createElement('a'))
        .addClass('main-page__data')
        .text(hotel.url)
        .attr('href', hotel.url)
        .attr('target', '_blank')
        .appendTo(container);
    });
  }
  // END: accommodations

  // START: gift-registry
  data = pagedata.val()['gift-registry'];
  if (data) {
    container = $('#gift-registry');
    $(document.createElement('p'))
      .addClass('main-page__data')
      .html(data.split('\n').join('<br>'))
      .appendTo(container);
  }
  // END: gift-registry
}
