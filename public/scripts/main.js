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

  // START: our-story
  data = pagedata.val()['event-details'];
  if (data) {
    container = $('#event-details');
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
}
