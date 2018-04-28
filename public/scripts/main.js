'use strict';
const TIME_DURATION_XL = 2500
  , TIME_DURATION_LONG = 1500
  , TIME_DURATION_MEDIUM = 1000
  , TIME_DURATION_FAST = 400
;
var db = firebase.database();

/**
* Throttle event handlers that may be called many times, from http://sampsonblog.com/simple-throttle-function/
*/
const THROTTLE_60FPS = 1000 / 60;
function throttle(callback, limit) {
  var wait = false;                 // Initially, we're not waiting
  return function () {              // We return a throttled function
    if (!wait) {                    // If we're not waiting
      callback.call();              // Execute users function
      wait = true;                  // Prevent future invocations
      setTimeout(function () {      // After a period of time
        wait = false;               // And allow future invocations
      }, limit);
    }
  }
}

/**
* Get URL param, from https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
*/
function getURLParam(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1))
    , sURLVariables = sPageURL.split('&')
    , sParameterName
    , i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

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
    $('.main-page__data').remove();     // Clear out any data we loaded
    $('#main-page').removeClass('light');
    if (screenfull.enabled) {
      screenfull.exit();   // Go back to normal
    }
    gravityAnimation.start();           // Restart firefly simulation
    if (rellax) {                       // Remove parallax
      rellax.destroy();
    }
    $('#parallax').css('visibility', 'hidden');
    $('body').addClass('gravity');
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
  // console.log('signIn');
  event.preventDefault();   // Prevent default form submit
  // Disable buttons for now to prevent multiple calls
  $('.signout-button, #signin-button').prop('disabled', true);

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
      $('#signin-button').prop('disabled', false);
    });
  }
}

/**
* Load the main page if user is auth'd
*/
function loadMainPage() {
  $('#entersite-button').prop('disabled', true);
  if (checkAuthOrSignin()) {
    // Go fullscreen if on mobile to avoid browser header jank
    if (window.mobilecheck() && screenfull.enabled) {
      screenfull.request();
    }
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !window.MSStream) {
      window.scrollTo(0,1);   // TODO: detects iOS, but doesn't seem to work
    }

    // Fade out login page, load in data, and fade in main page
    gravityAnimation.stop();              // Stop firefly animation
    $('#firefly-field').fadeOut(TIME_DURATION_FAST, function() {
      $('body').removeClass('gravity');
    });
    $('#login-page').fadeOut(TIME_DURATION_FAST, function() {
      db.ref('content').once('value')
        .then(populateMainPage, contentErrorHandler); // TODO: consider moving this to before the button click for optimization
      setupParallaxIntro();
      $('#header').fadeIn(TIME_DURATION_FAST);
      $('#main-page').removeClass('no-access')
        .fadeIn(TIME_DURATION_FAST, function() {
          // console.log('main page fade in');
          $(window).scroll(scrollHandler);  // Add scroll position listener
          $('#submitRSVP-button, #rsvp-button').prop('disabled', false);  // Enable RSVP
          setTimeout(function() {
            $('#title').toggleClass('expanded', false);
          }, TIME_DURATION_XL);
        });
    });
  }
}

/**
* Handle errors in case someone is trying to access
* content they don't have access to
*/
function contentErrorHandler(error) {
  console.log(error);
  if (checkAuthOrSignin()) {  // If signed in, guest access
    $('#main-page').addClass('no-access');
  }
}

/**
* Setup parallax intro scene
*/
var rellax;   // Reference to rellax object
function setupParallaxIntro() {
  // console.log('setupParallaxIntro');

  /* Using rellax.min.js from Open Source */
  if (rellax) {
    rellax.destroy();
  }
  $('#parallax').css('visibility', 'visible')
    .fadeTo(TIME_DURATION_LONG, 1, function() {
      rellax = new Rellax('.parallax');
      $('#main-page').addClass('light');
    });

  /* Using parallax.js from Google Developers */
  // initializeParallax(document.querySelector('#main-page'));
}

/**
* Scroll handler for parallax, etc.
*/
function scrollHandler(event) {
  var scrollPos = $(this).scrollTop();
  // console.log('scrollHandler:', scrollPos);

  hideScrollIndicator(scrollPos);   // Hide scroll indicator
  updateNavColor(scrollPos);        // Update navigation text color
  updateParallaxDisplay(scrollPos); // Update which parallax images to display
}

/**
* Hide scroll indicator after scrolling down
*/
const SCROLL_INDICATOR_HIDE_POS = 256;
var scrollIndicatorHidden = false;
function hideScrollIndicator(scrollPos) {
  if (!scrollIndicatorHidden && scrollPos >= SCROLL_INDICATOR_HIDE_POS) {
    $('#scroll-indicator').addClass('transparent');
    scrollIndicatorHidden = true;
  }
}

/**
* Update the text color of the navigation links based on
* scroll position to account for gradient background
*/
const BACKGROUND_GRADIENT_START_POS = 1420
  , BACKGROUND_GRADIENT_END_POS = 1980
  , NAV_STATE_PRE_GRADIENT = 0
  , NAV_STATE_DURING_GRADIENT = 1
  , NAV_STATE_POST_GRADIENT = 2
;
var navStatePrevious = 0
  , navStateChanged = false
;
function updateNavColor(scrollPos) {
  var startColor = [255, 229, 187]
    , endColor = [5, 11, 33]
    , textColor = [0, 0, 0]
  switch (true) {
    case scrollPos <= BACKGROUND_GRADIENT_START_POS:
      textColor = startColor;
      checkNavState(NAV_STATE_PRE_GRADIENT);
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
      checkNavState(NAV_STATE_DURING_GRADIENT);
      break;
    case scrollPos >= BACKGROUND_GRADIENT_END_POS:
      textColor = endColor;
      checkNavState(NAV_STATE_POST_GRADIENT);
      break;
  }
  // console.log(textColor);
  switch (true) {
    case navStateChanged:
      $('#nav').toggleClass('light', (navStatePrevious === NAV_STATE_POST_GRADIENT));
    case (navStatePrevious === NAV_STATE_DURING_GRADIENT):
      $('#nav > a, #menu-button').css('color', 'rgb('
        + textColor[0] + ', ' + textColor[1] + ', ' + textColor[2] + ')');
      $('.navicon').css('background-color', 'rgb('
        + textColor[0] + ', ' + textColor[1] + ', ' + textColor[2] + ')');
    default:
      navStateChanged = false;
  }
}

/**
* Check nav state and mark as changed if needed
*/
function checkNavState(state) {
  if (navStatePrevious != state) {
    navStateChanged = true;
  }
  navStatePrevious = state;
}

/**
* Update which parallax images to display, in an effort
* to conserve CPU and reduce performance lag
*/
const PARALLAX_CLOUDS_SHOW_POS = 350
  , PARALLAX_BUILDINGS_HIDE_POS = 1000
;
function updateParallaxDisplay(scrollPos) {
  $('.scenery, .buildings').toggleClass('invisible', (scrollPos >= PARALLAX_BUILDINGS_HIDE_POS));
  $('.clouds').toggleClass('invisible', (scrollPos < PARALLAX_CLOUDS_SHOW_POS));
}

/**
* Populate main page data
*/
const DEFAULT_PHOTO_EXTENSION = '.jpg'
  , GALLERY_THUMBNAIL_PATH = '/images/gallery/'
  , FEATURED_THUMBNAIL_PATH = '/images/featured/'
;
function populateMainPage(response) {
  var pageData = response.val(), data, container, temp;
  // console.log('populateMainPage:', pageData);
  if (!pageData) {  // Sanity check
    return alert('Could not load data! Please let us know if you see this error.');
  }

  data = pageData['our-story'];
  if (data) {
    container = $('#our-story');

    // Load text copy first
    data['text'].forEach(function(section) {
      $.each(section, function(key, value) {
        container.append($(document.createElement('h3'))
          .addClass('main-page__data')
          .text(key)
        );
        temp = value.split('\n');
        temp.forEach(function(text) {
          container.append($(document.createElement('p'))
            .addClass('main-page__data')
            .text(text)
          );
        });
      });
    });

    // Create featured photos
    $.each(data['photos'], function(i, item) {
      item['photoURL'] = i + DEFAULT_PHOTO_EXTENSION;
      item['thumbnailURL'] = FEATURED_THUMBNAIL_PATH + item.photoURL;
      temp = generatePhotoHTML(item);
      temp.addClass('featured');
      container.append(temp);
    });
  }

  data = pageData['gallery'];
  if (data) {
    container = $('#carousel');

    // Generate thumbnails and containers for photos
    $.each(data, function(i, item) {
      item['photoURL'] = i + DEFAULT_PHOTO_EXTENSION;
      item['thumbnailURL'] = GALLERY_THUMBNAIL_PATH + item.photoURL;
      temp = generatePhotoHTML(item);
      temp.addClass('gallery');
      container.append(temp);
    });
  }

  data = pageData['event-details'];
  if (data) {
    container = $('#location');
    container.append($(document.createElement('h3'))
      .addClass('main-page__data')
      .text(data.location['title'])
    ).append($(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.location['venue-name'])
    ).append($(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.location['address'])
    );

    container = $('#schedule');
    container.append($(document.createElement('h3'))
      .addClass('main-page__data')
      .text(data.schedule['title'])
    ).append($(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.schedule['date'])
    ).append($(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.schedule['time'])
    );

    container = $('#dresscode');
    container.append($(document.createElement('h3'))
      .addClass('main-page__data')
      .text(data.dresscode['title'])
    ).append($(document.createElement('p'))
      .addClass('main-page__data')
      .text(data.dresscode['text'])
    );
  }

  data = pageData['rsvp'];
  if (data) {
    container = $('#wedding-rsvp');
    temp = new Date(data['datetime'] + (1000 * 60 * 60 * 24));  // Set to 1 day after deadline
    console.log('rsvp date:', temp);
    temp = (new Date() > temp);
    console.log('today is after deadline:', temp);
    container.append($(document.createElement('button'))
      .addClass('main-page__data')
      .attr('id', 'rsvp-button')
      .text(data['title'])
      .prop('disabled', temp)
      .click(loadRSVPForm)
    ).append($(document.createElement('p'))
      .addClass('main-page__data')
      .text((temp ? data['errorText'] : data['text']))
    );
  }

  data = pageData['transportation'];
  if (data) {
    container = $('#transportation');
    data.forEach(function(mode) {
      $.each(mode, function(key, value) {
        container.append($(document.createElement('h3'))
          .addClass('main-page__data')
          .text(key)
        ).append($(document.createElement('p'))
          .addClass('main-page__data')
          .text(value)
        );
      });
    });
  }

  data = pageData['accommodations'];
  if (data) {
    container = $('#accommodations');
    data.forEach(function(hotel) {
      container.append($(document.createElement('h3'))
        .addClass('main-page__data')
        .text(hotel.name)
      ).append($(document.createElement('p'))
        .addClass('main-page__data')
        .text(hotel.address)
      ).append($(document.createElement('p'))
        .addClass('main-page__data')
        .text(hotel.description)
      ).append($(document.createElement('a'))
        .addClass('main-page__data')
        .text(hotel.url)
        .attr('href', hotel.url)
        .attr('target', '_blank')
      );
    });
  }

  data = pageData['gift-registry'];
  if (data) {
    container = $('#gift-registry');
    container.append($(document.createElement('p'))
      .addClass('main-page__data')
      .html(data.split('\n').join('<br>'))
    );
  }
}

/**
* Generate photo image template HTML
*  returns a jquery object
*/
const DEFAULT_PHOTO_SIZE = '1600x1200';
function generatePhotoHTML(metadata) {
  var html = $(document.createElement('figure'))
    .addClass('photo')
    .prop('itemscope', true)
    .prop('itemprop', 'associatedMedia')
    .prop('itemtype', 'http://schema.org/ImageObject');
  html.append($(document.createElement('a'))
    .attr('href', metadata.photoURL)                 // Needs to be replaced
    .prop('data-size', DEFAULT_PHOTO_SIZE)  // Needs to be replaced
    .prop('itemprop', 'contentUrl')
    .append($(document.createElement('img'))
      .attr('src', metadata.thumbnailURL)
      .prop('itemprop', 'thumbnail')
      .attr('alt', (metadata.alt || metadata.caption))
    )
  );
  var copyright = '';
  if (metadata.copyright) {
    copyright = $(document.createElement('span'))
      .prop('itemprop', 'copyrightHolder')
      .text(metadata.copyright)
    ;
  }
  if (metadata.caption) {
    html.append($(document.createElement('figcaption'))
      .prop('itemprop', 'caption description')
      .text(metadata.caption)
      .append(copyright)
    );
  }
  return html;
}

/**
* Load form for RSVPing
*/
function loadRSVPForm() {
  // console.log('loadRSVPForm');
  $('#rsvp-button').prop('disabled', true);
  var user = checkAuthOrSignin();
  if (user) {
    getRSVPCandidates(user.uid, function(candidates) {
      console.log('candidates:', candidates);
      if (candidates && candidates.length) {
        getAdditionalGuests(candidates, function(additionalGuests) {
          console.log('addlGuests:', additionalGuests);
          // Add guest info into the candidate user profile info
          if (additionalGuests && additionalGuests.length) {
            for (var i = 0, l = candidates.length; i < l; i++) {
              candidates[i]['rsvp'] = additionalGuests[i];
            }
          }
          populateRSVPForm(user, candidates);
        });
      }
    });
  }
}

/**
* Get list of people who the user can RSVP for
*/
function getRSVPCandidates(uid, callback) {
  // Get the current user's information
  getUserProfile(uid, function(user) {
    if (user) {
      // If they are part of a group, get all group members
      if (user['group'] != null) {
        getGroupMembers(user['group'], function(members) {
          if (members) {
            Promise.all(Object.keys(members).map(function(u, i) {
              return getUserProfile(u);
            })).then(callback);
          }
        });
      } else {    // Otherwise just send with current user
        user['uid'] = uid;
        callback([user]);
      }
    }
  });
}

/**
* Get member UIDs of a group
*/
const groupRef = db.ref('groups');
function getGroupMembers(gid, callback) {
  // console.log('getGroupMembers:', gid);
  return groupRef.child(gid).once('value').then(function(members) {
    // console.log('members:', members.val());
    if (callback) {
      callback(members.val());
    } else {
      return members.val();
    }
  });
}

/**
* Get user profile info of a uid
*/
const userRef = db.ref('users');
function getUserProfile(uid, callback) {
  // console.log('getUserProfile:', uid);
  return userRef.child(uid).once('value').then(function(user) {
    var data = user.val();
    if (data) {
      data['uid'] = uid;
    }
    // console.log('user:', data);
    if (callback) {
      callback(data);
    } else {
      return data;
    }
  });
}

/**
* Gather all additional guests that we need to account for
*/
function getAdditionalGuests(candidates, callback) {
  if (candidates && candidates.length) {
    Promise.all(candidates.map(function(user, i) {
      return getRSVPInfo(user.uid);
    })).then(callback);
  }
}

/**
* Check if a person is an allowed guest
*/
const rsvpRef = db.ref('rsvps');
function getRSVPInfo(uid, callback) {
  // console.log('getRSVPInfo:', uid);
  return rsvpRef.child(uid).once('value').then(function(rsvp) {
    var data = rsvp.val();
    // console.log('rsvp:', data);
    if (callback) {
      callback(data);
    } else {
      return data;
    }
  });
}

/**
* Populate RSVP form
*/
function populateRSVPForm(user, data) {
  console.log('populateRSVPForm:', data);

  data.sort(function(a, b) {
    if (a.uid === user.uid) { return -1; }
    if (b.uid === user.uid) { return 1; }
    if (a.firstname < b.firstname) { return -1; }
    if (a.firstname > b.firstname) { return 1; }
    return 0;
  });
  // console.log('sorted data:', data);

  // Populate current user's rsvp info first
  var you = data[0], pid, guests, gid;
  $('#your-name').val(you.firstname + ' ' + you.lastname);
  if (you.rsvp.attending === true) {
    $('#your-yes').prop('checked', true);
  } else if (you.rsvp.attending === false) {
    $('#your-no').prop('checked', true);
  }
  guests = you.rsvp['additional-guests'];
  if (guests && guests.length) {
    $.each(guests, function(j, guest) {
      gid = you.uid + '/additional-guests/' + j;
      addRSVPRow(gid, guest.fullname, guest.attending, guest.givenname, you.firstname);
    });
  }

  // Create additional fields for additional guests
  //  and populate with existing rsvp data if any
  $.each(data, function(i, person) {
    if (i === 0) {
      return true;  // Skip "self"
    }
    pid = person.uid;
    addRSVPRow(pid
      , (person.firstname + ' ' + person.lastname)
      , person.rsvp.attending);
    guests = person.rsvp['additional-guests'];
    if (guests && guests.length) {
      $.each(guests, function(j, guest) {
        gid = pid + '/additional-guests/' + j;
        addRSVPRow(gid, guest.fullname, guest.attending, guest.givenname, person.firstname);
      });
    }
  });

  // Show the rsvp modal
  $('#rsvp-form .form-row').last().addClass('no-border');
  $('#rsvp-modal').modal();
  $('#submitRSVP-button').prop('disabled', false);
}

/**
* Adds a new row of RSVP inputs into rsvp form
*/
function addRSVPRow(uid, name, attending, givenname, hostname) {
  var inputNameID = uid;
  var radioGroupID = uid+'-rsvp';
  var radioYesID = uid+'-yes';
  var radioNoID = uid+'-no';
  var nameFeedbackID = uid+'-feedback';
  var radioFeedbackID = uid+'-rsvp-feedback';
  var inputName = $(document.createElement('input'))
    .attr('placeholder', 'Guest\'s Full Name')
    .attr('name', 'fullname')
    .attr('id', inputNameID);
  var radioYes = $(document.createElement('input'))
    .addClass('form-check-input')
    .attr('type', 'radio')
    .attr('name', radioGroupID)
    .attr('id', radioYesID)
    .attr('value', 'true')
  ;
  var radioNo = $(document.createElement('input'))
    .addClass('form-check-input')
    .attr('type', 'radio')
    .attr('name', radioGroupID)
    .attr('id', radioNoID)
    .attr('value', 'false')
  ;
  var formRow = $(document.createElement('div'))
    .addClass('form-row')
    .append($(document.createElement('div'))
      .addClass('form-group col-md-6')
      .append(inputName)
      .append($(document.createElement('div'))
        .addClass('invalid-feedback')
        .attr('id', nameFeedbackID)
      )
    ).append($(document.createElement('div'))
      .addClass('form-group col-md-6')
      .append($(document.createElement('div'))
        .addClass('form-check')
        .append(radioYes)
        .append($(document.createElement('label'))
          .addClass('form-check-label')
          .attr('for', radioYesID)
          .text('Will be there!')
        )
      )
      .append($(document.createElement('div'))
        .addClass('form-check')
        .append(radioNo)
        .append($(document.createElement('label'))
          .addClass('form-check-label')
          .attr('for', radioNoID)
          .text('Can\'t make it. :(')
        )
        .append($(document.createElement('div'))
          .addClass('invalid-feedback')
          .attr('id', radioFeedbackID)
        )
      )
    )
  ;
  if (name && name.length) {
    inputName.addClass('form-control-plaintext form-control-lg')
      .prop('readonly', true)
      .val(name);
  } else {
    inputName.addClass('form-control rsvp-guest-givenname')
      .attr('placeholder', 'Guest\'s Full Name');
    if (givenname && givenname.length) {
      inputName.val(givenname);
    }
    if (hostname && hostname.length) {
      inputName.parent().append($(document.createElement('small'))
        .addClass('form-text text-muted')
        .text(hostname + '\'s additional guest')
      )
    }
  }
  if (attending === true) {
    radioYes.prop('checked', true);
  } else if (attending === false) {
    radioNo.prop('checked', true);
  }
  $('#rsvp-form-extension').append(formRow);
}

/**
* Submit RSVP form
*/
const MIN_NAME_LENGTH = 3;
function submitRSVP(event) {
  console.log('submitRSVP!');
  event.preventDefault();   // Prevent default form submit
  $('#rsvp-form').removeClass('error');
  $('#submitRSVP-button').prop('disabled', true);

  var user = checkAuthOrSignin();
  if (user) {
    // Gather update for current user's RSVP
    var updates = {}, errors = {}, input;
    input = $('#rsvp-form input:radio[name="your-rsvp"]:checked').val();
    // Sanity check
    if (input === undefined) {
      errors['your-feedback'] = 'Please let us know if you\'re coming!';
    } else if (input != "false" && input != "true") {
      errors['your-feedback'] = 'Invalid selection.';
    } else {
      updates['rsvps/' + user.uid + '/attending'] = (input == "true");
      updates['rsvps/' + user.uid + '/responded'] = true;
    }
    console.log('errors:', errors);
    console.log('updates:', updates);

    // Gather updates for additional guests
    var $el, gid;
    $('#rsvp-form input[name="fullname"]').each(function(i, el)
    {
      console.log(el);
      $el = $(el);
      gid = $el.attr('id');

      // Get RSVP status, add if actual value
      input = $('#rsvp-form input:radio[name="' + gid + '-rsvp"]:checked').val();
      if (input == "false" || input == "true") {
        updates['rsvps/' + gid + '/attending'] = (input == "true");
      } else if (input !== undefined) {
        errors[gid + '-rsvp-feedback'] = 'Invalid selection.';
      }

      // Check for case of givenname (not fixed guest)
      if ($el.hasClass('rsvp-guest-givenname')) {
        input = $el.val().trim();
        if (gid.indexOf('/') < 0) {
          errors[gid + '-feedback'] = 'Name shouldn\'t be editable.';
        } else {
          if (input.length < MIN_NAME_LENGTH) {
            errors[gid + '-feedback'] = 'Name must be at least 3 letters.';
          } else if (input.length > MIN_NAME_LENGTH && input.indexOf(' ') < 0) {
            errors[gid + '-feedback'] = 'Please provide full name.';
          } else {
            updates['rsvps/' + gid + '/givenname'] = input;
          }
        }
      }

      // Record delegate if relevant
      if (gid.indexOf(user.uid) < 0) {
        updates['rsvps/' + gid + '/delegate'] = user.uid;
      }
      console.log('errors:', errors);
      console.log('updates:', updates);
    });

    // Check if there were any blocking errors, show them
    if (!$.isEmptyObject(errors)) {
      console.log('have errors :(');
      $.each(errors, function(eID, message) {
        $('#' + $.escapeSelector(eID)).text(message);
      });
      $('#rsvp-form').addClass('error');
      $('#submitRSVP-button').prop('disabled', false);
      return;
    }

    // Save to database
    if (!$.isEmptyObject(updates)) {
      console.log('saving to database!');
      db.ref().update(updates).then(rsvpSuccess, rsvpFailure);
    }
  }
}

/**
* Failure / error handler for rsvp form
*/
function rsvpFailure(response) {
  console.log('rsvpFailure:', response);
  alert('Saving response failed. :(\nPlease try again.');
  $('#submitRSVP-button').prop('disabled', false);
}

/**
* Success handler for rsvp form
*/
function rsvpSuccess(response) {
  console.log('rsvpSuccess:', response);

  alert('Response saved!');
  // TODO: animate success?

  $('#rsvp-modal').modal('hide');
}

/**
* Sends password reset/change email to email account
*/
function sendPasswordReset() {
  var email = $('#email-input').val();
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
}

/**
* Preloads images
*/
function preloadImages(paths, callback) {
  console.log('preloadImages:', paths);
  $.each(paths, function(i, path) {
    getDownloadURL(path, function(url) {
      // console.log('prefetch url:', url);
      /* Preload image: https://stackoverflow.com/questions/5057990/how-can-i-check-if-a-background-image-is-loaded */
      $('<img/>').attr('src', url).on('load', function() {
        $(this).remove(); // prevent memory leaks
        if (callback) {
          callback(url);
        }
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
  firebase.storage().ref(path).getDownloadURL()
    .then(callback)
    .catch(function(error) {
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
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log(JSON.stringify(user, null, '  '));
      var uid = user.uid;

      // Grab intended displayName and email from database
      db.ref('users/' + uid).once('value')
        .then(function(userData) {
          var displayName = userData.val().username;
          $('#login-page').addClass('logged-in');
          $('#login-page .loginInfo').find('button').prop('disabled', true);
          $('#login-page .welcomeInfo').find('button').prop('disabled', false);
          $('#email-input').val(userData.val().email);  // Populate email field
          $('#password-input').val('');                 // Clear password
          $('.mdl-textfield').each(function(i) {
            this.MaterialTextfield.checkDirty();  // Update field styling
          });
          if (displayName) {
            $('#welcome-name').text(', ' + displayName + '!');
          }
        });
    } else {
      // console.log('user signed out')
      $('#login-page').removeClass('logged-in');
      $('#login-page .loginInfo').find('button').prop('disabled', false);
      $('#login-page .welcomeInfo').find('button').prop('disabled', true);
    }
  });

  // Initialization of all the handlers
  $('#signin-button').click(signIn);
  $('#entersite-button').click(loadMainPage);
  $('#login-form').submit(signIn);
  $('.changepassword-button').click(sendPasswordReset);
  $('.signout-button').click(signOut);

  // Navigation
  $('#navicon').click(function() {
    $('#title').toggleClass('expanded');
    this.blur();
  });
  $('.nav-link').click(function(e) {
    e.preventDefault();
    $('#title').toggleClass('expanded', false);
    $('html, body').animate({   // Need 'body' for Safari
      scrollTop: $($(e.target).attr('href')).offset().top
    }, TIME_DURATION_MEDIUM);
  });

  // RSVP form
  $('#rsvp-modal').on('shown.bs.modal', function(event) {
    $('#rsvp-form-extension').slideDown();
  });
  $('#rsvp-modal').on('hide.bs.modal', function(event) {
    $('#rsvp-form-extension').slideUp(function() {
      $('#rsvp-button').prop('disabled', false);
      $(this).html('');
    });
  });
  $('#submitRSVP-button').click(submitRSVP);
  $('#rsvp-form').submit(submitRSVP);
}

window.onload = function() {
  initApp();
  setTimeout(function() {
    var email = getURLParam('email');
    if (email) {
      $('#email-input').val(email);
      $('#email-container')[0].MaterialTextfield.checkDirty();
    }
    gravityAnimation.start();
    $('#content').fadeIn();
  }, TIME_DURATION_MEDIUM);
};
