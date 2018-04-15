'use strict';

/**
* Handles the sign out button press.
*/
function signOut() {
  // Disable buttons for now to prevent multiple calls
  $('.signout-button, #signin-button').prop('disabled', true);
  firebase.auth().signOut();

  // Switch back to login page
  $('.main-page').fadeOut('fast', function() {
    console.log('main page fade out');
    $('.main-page__data').remove();     // Clear out any data we loaded from auth
    PAUSE_GRAVITY_SIMULATION = false;   // Unpause firefly simulation
    if (rellax) {                       // Remove parallax
      rellax.destroy();
    }
    $('.parallax').css('background-image', ''); // Kill images
    $('body').addClass('gravity');
    // $('#firefly-field').removeClass('blur');
    $('#firefly-field').fadeIn('fast');
    $('#login-page').fadeIn('fast');
  });
}

// Check if current user is logged in, otherwise signout
function checkAuthOrSignin() {
  var user = firebase.auth().currentUser;
  if (user) {
    return user;
  } else {
    $('#user-warnings').text('Session expired. Please log in again.');
    signOut();
    return false;
  }
}

/**
* Handles the sign in button press.
*/
function signIn(event) {
  event.preventDefault();   // Prevent default form submit

  // Try to sign in user
  if (firebase.auth().currentUser) {
    alert('Already signed in!');
  } else {
    var email = $('#email-input').val();
    var password = $('#password-input').val();
    if (email.length < 4) {
      $('#email-error').text('Please enter a valid email address.');
      $('#email-container').addClass('is-invalid');
      return;
    }
    if (password.length < 6) {
      $('#password-error').text('Wrong password. Check invite email.');
      $('#password-container').addClass('is-invalid');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      switch (errorCode) {
        case 'auth/invalid-email':
          $('#email-error').text('Invalid email format');
          $('#email-container').addClass('is-invalid');
          break;
        case 'auth/user-not-found':
        case 'auth/user-disabled':
          $('#email-error').text('Email not in guest invite list, sorry! :)');
          $('#email-container').addClass('is-invalid');
          break;
        case 'auth/wrong-password':
          $('#password-error').text('Wrong password. Check invite email.');
          $('#password-container').addClass('is-invalid');
          break;
        default:
          alert(errorMessage);
          break;
      }
      console.log(error);
      document.getElementById('signin-button').disabled = false;
    });
    // [END authwithemail]
  }

  // Disable buttons for now to prevent multiple calls
  $('.signout-button, #signin-button').prop('disabled', true);
}

/**
* Serves site content if the user is auth'd
*/
function enterSite() {
  document.getElementById('entersite-button').disabled = true;
  loadMainPage();
}


// Load the main page
function loadMainPage() {
  if (checkAuthOrSignin()) {
    // Fade out login page, load in data, and fade in main page
    console.log('fireflies fade out');
    // $('#firefly-field').addClass('blur');
    $('#firefly-field').fadeOut('fast');
    $('body').removeClass('gravity');
    PAUSE_GRAVITY_SIMULATION = true;  // Pause firefly field in the background
    $('#login-page').fadeOut('fast', function() {
      console.log('login page fade out');
      firebase.database().ref('content').once('value').then(populateMainPage);
      setupParallaxIntro();
      $('.main-page').fadeIn('fast', function() {
        console.log('main page fade in');
        $(window).scroll(scrollHandler);
      });
    });
  }
}

// Setup parallax intro scene
var rellax;   // Reference to rellax object
function setupParallaxIntro() {
  console.log('setupParallaxIntro');

  /* Using rellax.min.js from Open Source */
  if (rellax) {
    rellax.destroy();
  }
  $('#parallax').fadeIn(1500, function() {
    rellax = new Rellax('.parallax');
  });

  /* Using parallax.js from Google Developers */
  // initializeParallax(document.querySelector('#main-page'));
}

// Scroll handler
var BACKGROUND_GRADIENT_START_POS = 1420
  , BACKGROUND_GRADIENT_END_POS = 1820;
function scrollHandler(event) {
  // console.log('scrollHandler:', event);

  var scrollPos = $(this).scrollTop();
  if (scrollPos > BACKGROUND_GRADIENT_START_POS && scrollPos < BACKGROUND_GRADIENT_END_POS) {
    console.log('changing nav color');
    var startColor = [255, 229, 187]
      , endColor = [5, 11, 33]
      , scale = (scrollPos - BACKGROUND_GRADIENT_START_POS) / (BACKGROUND_GRADIENT_END_POS - BACKGROUND_GRADIENT_START_POS)
      , textColor = [0, 0, 0];
    console.log(scale);
    $.each(textColor, function(i) {
      textColor[i] = ((endColor[i] - startColor[i]) * scale) + startColor[i];
    });
    console.log(textColor);
    $('#nav > a').css('color', 'rgb('
      + Math.round(textColor[0]) + ', '
      + Math.round(textColor[1]) + ', '
      + Math.round(textColor[2]) + ')');
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

/**
* Sends password reset/change email to email account
*/
function sendPasswordReset() {
  var email = $('#email-input').val();
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    if ($('#user-warnings').is(':visible')) {
      $('#user-warnings').text('Password reset email sent.');
    } else {
      alert('Password reset email sent.');
    }
  }).catch(function(error) {
    var errorCode = error.code
      , errorMessage = error.message
      , $warning = $('#user-warnings')
      , fn_warn = ($warning.is(':visible') ? $warning.text : alert);
    switch (errorCode) {
      case 'auth/invalid-email':
      case 'auth/user-not-found':
        fn_warn(errorMessage);
        break;
      default:
        console.log(error);
    }
  });
  // [END sendpasswordemail];
}

/**
* Preloads parallax images
*/
function preloadParallaxImages() {
  console.log('preloadParallaxImages');
  $('.parallax').each(function(i) {
    var path = 'parallax/' + i + '.png';
    var $el = $(this);
    getDownloadURL(path, function(url) {
      console.log('prefetch url:', url);
      /* Preload image: https://stackoverflow.com/questions/5057990/how-can-i-check-if-a-background-image-is-loaded */
      $('<img/>').attr('src', url).on('load', function() {
        $(this).remove(); // prevent memory leaks
        $el.css('background-image', 'url(' + url + ')');
      });
    });
  });
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

/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*/
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(JSON.stringify(user, null, '  '));
      var uid = user.uid;

      // Grab intended displayName and email from database
      firebase.database().ref('users/' + uid) .once('value').then(function(userData) {
        var displayName = userData.val().username;
        var email = userData.val().email;
        $('#login-page').addClass('logged-in');
        $('#login-page .loginInfo').find('button').prop('disabled', true);
        $('#login-page .welcomeInfo').find('button').prop('disabled', false);
        $('#email-input').val(email);   // Populate email field
        $('#password-input').val('');   // Clear password
        if (displayName) {
          $('#welcome-name').text(', ' + displayName + '!');
        }

        // Update login fields
        document.querySelector('.mdl-textfield').MaterialTextfield.checkDirty();

        // Preload the parallax images
        preloadParallaxImages();
      });
    } else {
      console.log('user signed out')
      $('#login-page').removeClass('logged-in');
      $('#login-page .loginInfo').find('button').prop('disabled', false);
      $('#login-page .welcomeInfo').find('button').prop('disabled', true);
    }
  });
  // [END authstatelistener]

  $('.nav .nav-link').on('click', function(event) {
    console.log('nav clicked');
    event.preventDefault();
    $('.mdl-layout__content').animate({
        scrollTop: $($(event.target).attr('href')).offset().top
    }, 1000);
  });
  $('#signin-button').click(signIn);
  $('.signout-button').click(signOut);
  $('#entersite-button').click(enterSite);
  $('.changepassword-button').click(sendPasswordReset);
  $('#login-form').submit(signIn);
  $('#navicon').click(function() {
    $('#title').toggleClass('expanded');
  });
}

window.onload = function() {
  initApp();
};
