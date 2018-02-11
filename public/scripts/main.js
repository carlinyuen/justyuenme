'use strict';

// Load the main page
function loadMainPage() {
  if (checkAuthOrSignin()) {
    // Fade out login page, load in data, and fade in main page
    $('#firefly-field').fadeOut('fast', function() {
      console.log('fireflies fade out');
      PAUSE_GRAVITY_SIMULATION = true;  // Pause firefly field in the background
    });
    $('#login-page').fadeOut('fast', function() {
      console.log('login page fade out');
      firebase.database().ref('content').once('value').then(populateMainPage);
      $('#main-page').fadeIn('fast', function() {
        console.log('main page fade in');
      });
    });
  }
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
          .text(key)
          .appendTo(container);
        temp = value.split('\n');
        temp.forEach(function(text) {
          $(document.createElement('p'))
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
      .text(data.location['venue-name'])
      .appendTo(container);
    $(document.createElement('p'))
      .text(data.location['address'])
      .appendTo(container);

    container = $('#schedule');
    $(document.createElement('p'))
      .text(data.schedule['date'])
      .appendTo(container);
    $(document.createElement('p'))
      .text(data.schedule['time'])
      .appendTo(container);

    container = $('#dresscode');
    $(document.createElement('p'))
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
          .text(key)
          .appendTo(container);
        $(document.createElement('p'))
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
        .text(hotel.name)
        .appendTo(container);
      $(document.createElement('p'))
        .text(hotel.address)
        .appendTo(container);
      $(document.createElement('p'))
        .text(hotel.description)
        .appendTo(container);
      $(document.createElement('a'))
        .text(hotel.url)
        .attr('href', hotel.url)
        .appendTo(container);
    });
  }
  // END: accommodations

  // START: gift-registry
  data = pagedata.val()['gift-registry'];
  if (data) {
    container = $('#gift-registry');
    $(document.createElement('p'))
      .text(data)
      .appendTo(container);
  }
  // END: gift-registry
}
