'use strict';


// Initialize databse queries and listeners
function initializeDatabase() {
}

// On load
(function() {
  $('#login-page, #firefly-field').fadeOut('fast', function() {
    console.log('login page fade out');
    // TODO: populate main page

    // Pause firefly field in the background
    PAUSE_GRAVITY_SIMULATION = true;

    // Switch view and fade in main page
    $('#main-page').fadeIn('fast', function() {
      console.log('main page fade in');
    });
  });
})();
