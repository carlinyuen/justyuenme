'use strict';
var TIME_DURATION_XL = 2000
  , TIME_DURATION_LONG = 1500
  , TIME_DURATION_MEDIUM = 1000
  , TIME_DURATION_FAST = 400
;

/**
* Check for mobile browser, from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
*/
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

/**
* Handles the sign out button press.
*/
function signOut(event) {
  // Disable buttons for now to prevent multiple calls
  $('.signout-button, #signin-button').prop('disabled', true);
  firebase.auth().signOut();

  // Switch back to login page
  $('#header').fadeOut(TIME_DURATION_FAST);
  $('#main-page').fadeOut(TIME_DURATION_FAST, function() {
    // console.log('main page fade out');
    $('.main-page__data').remove();     // Clear out any data we loaded from auth
    $('#main-page').removeClass('light');
    if (screenfull.enabled) {
      screenfull.exit();   // Go back to normal
    }
    gravityAnimation.start();           // Restart firefly simulation
    if (rellax) {                       // Remove parallax
      rellax.destroy();
    }
    $('.parallax').css('background-image', ''); // Kill images
    $('#parallax').css('visibility', 'hidden');
    $('body').addClass('gravity');
    // $('#firefly-field').removeClass('blur');
    $('#firefly-field').fadeIn(TIME_DURATION_FAST);
    $('#login-page').fadeIn(TIME_DURATION_FAST);
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
function enterSite(event) {
  document.getElementById('entersite-button').disabled = true;
  loadMainPage();
}


// Load the main page
function loadMainPage() {
  if (checkAuthOrSignin()) {
    // Go fullscreen if on mobile
    if (window.mobilecheck() && screenfull.enabled) {
      screenfull.request();
    }
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !window.MSStream) {
      window.scrollTo(0,1);   // Tested, this doesn't seem to work, but detects iOS
    }

    // Fade out login page, load in data, and fade in main page
    // console.log('fireflies fade out');
    // $('#firefly-field').addClass('blur');
    gravityAnimation.stop();         // Stop firefly animation in background
    $('#firefly-field').fadeOut(TIME_DURATION_FAST, function() {
      $('body').removeClass('gravity');
    });
    $('#login-page').fadeOut(TIME_DURATION_FAST, function() {
      // console.log('login page fade out');
      firebase.database().ref('content').once('value').then(populateMainPage);
      setupParallaxIntro();
      $('#header').fadeIn(TIME_DURATION_FAST);
      $('#main-page').fadeIn(TIME_DURATION_FAST, function() {
        // console.log('main page fade in');
        $(window).scroll(scrollHandler);  // Add scroll position listener for effects
        setTimeout(function() {
          $('#title').toggleClass('expanded', false);
        }, TIME_DURATION_XL);
      });
    });
  }
}

// Setup parallax intro scene
var rellax;   // Reference to rellax object
function setupParallaxIntro() {
  // console.log('setupParallaxIntro');

  /* Using rellax.min.js from Open Source */
  if (rellax) {
    rellax.destroy();
  }
  $('#parallax').css('visibility', 'visible').fadeTo(TIME_DURATION_LONG, 1, function() {
    rellax = new Rellax('.parallax');
    $('#main-page').addClass('light');
  });

  /* Using parallax.js from Google Developers */
  // initializeParallax(document.querySelector('#main-page'));
}

// Scroll handler
function scrollHandler(event) {
  var scrollPos = $(this).scrollTop();
  // console.log('scrollHandler:', scrollPos);

  // Update navigation text color
  updateNavColor(scrollPos);

  // Update background color
  // updateBackgroundColor(scrollPos);

  // Update which parallax images to display
  updateParallaxDisplay(scrollPos);
}

// Update the text color of the navigation links based on scroll position to account for gradient background
var BACKGROUND_GRADIENT_START_POS = 1420
  , BACKGROUND_GRADIENT_END_POS = 1820
;
function updateNavColor(scrollPos) {
  var startColor = [255, 229, 187]
    , endColor = [5, 11, 33]
    , textColor = [0, 0, 0]
  switch (true) {
    case scrollPos <= BACKGROUND_GRADIENT_START_POS:
      textColor =  startColor;
      break;
    case scrollPos > BACKGROUND_GRADIENT_START_POS && scrollPos < BACKGROUND_GRADIENT_END_POS:
      $.each(textColor, function(i) {
        textColor[i] = Math.round((
          (endColor[i] - startColor[i])
          * (
            (scrollPos - BACKGROUND_GRADIENT_START_POS)
            / (BACKGROUND_GRADIENT_END_POS - BACKGROUND_GRADIENT_START_POS)
          )
        ) + startColor[i]);
      });
      break;
    case scrollPos >= BACKGROUND_GRADIENT_END_POS:
      textColor =  endColor;
      break;
  }
  // console.log(textColor);
  $('#nav > a, #menu-button').css('color', 'rgb('
    + textColor[0] + ', ' + textColor[1] + ', ' + textColor[2] + ')');
  $('.navicon').css('background-color', 'rgb('
    + textColor[0] + ', ' + textColor[1] + ', ' + textColor[2] + ')');
}

// Update the background color of the main content div once the user has scrolled far enough
var BACKGROUND_LIGHT_START_POS = 1000;
function updateBackgroundColor(scrollPos) {
  $('#main-page').toggleClass('light', (scrollPos >= BACKGROUND_LIGHT_START_POS));
}

// Update which parallax images to display, in an effort to conserve CPU and reduce performance lag
var PARALLAX_CLOUDS_SHOW_POS = 350
  , PARALLAX_BUILDINGS_HIDE_POS = 1000
;
function updateParallaxDisplay(scrollPos) {
  $('.scenery, .buildings').toggleClass('invisible', (scrollPos >= PARALLAX_BUILDINGS_HIDE_POS));
  // $('.clouds').toggleClass('invisible', (scrollPos < PARALLAX_CLOUDS_SHOW_POS));
}

// Populate main page data
function populateMainPage(pagedata) {
  // console.log('populateMainPage:', pagedata.val());

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
* Toggles debug mode to show element layers
*/
function toggleDebugMode() {
  // $('body').find('*').toggleClass('parallax__debug');
  $('.mdl-layout').find('*').toggleClass('parallax__debug');
}

/**
* Preloads parallax images
*/
function preloadParallaxImages() {
  // console.log('preloadParallaxImages');
  $('.parallax').each(function(i) {
    var path = 'parallax/' + i + '.png';
    var $el = $(this);
    getDownloadURL(path, function(url) {
      // console.log('prefetch url:', url);
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
  // console.log('getDownloadURL:', path);
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
      // console.log(JSON.stringify(user, null, '  '));
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
        // preloadParallaxImages();
      });
    } else {
      // console.log('user signed out')
      $('#login-page').removeClass('logged-in');
      $('#login-page .loginInfo').find('button').prop('disabled', false);
      $('#login-page .welcomeInfo').find('button').prop('disabled', true);
    }
  });
  // [END authstatelistener]

  $('.nav .nav-link').on('click', function(e) {
    // console.log('nav clicked:', e.target);
    e.preventDefault();
    $('#title').toggleClass('expanded', false);
    $('html, body').animate({   // Need 'body' for Safari
      scrollTop: $($(e.target).attr('href')).offset().top
    }, TIME_DURATION_MEDIUM);
  });
  $('#signin-button').click(signIn);
  $('#entersite-button').click(enterSite);
  $('#login-form').submit(signIn);
  $('.changepassword-button').click(sendPasswordReset);
  // $('.debug-button').click(toggleDebugMode);
  $('.signout-button').click(signOut);
  $('#navicon').click(function() {
    $('#title').toggleClass('expanded');
  });
}

window.onload = function() {
  gravityAnimation.start();
  initApp();
};
