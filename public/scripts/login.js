'use strict';

/**
* Handles the sign out button press.
*/
function signOut() {
  // Disable buttons for now to prevent multiple calls
  document.getElementById('signin-button').disabled = true;
  document.getElementById('signout-button').disabled = true;
  firebase.auth().signOut();

  // Unpause firefly simulation
  PAUSE_GRAVITY_SIMULATION = false;
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
  document.getElementById('signin-button').disabled = true;
  document.getElementById('signout-button').disabled = true;
}

/**
* Serves site content if the user is auth'd
*/
function enterSite() {
  // Disable button for now to prevent multiple calls
  document.getElementById('entersite-button').disabled = true;

  // Check user is logged in
  if (firebase.auth().currentUser) {
    // Pause firefly field in the background
    PAUSE_GRAVITY_SIMULATION = true;

    // Load new js and switch views
    $.getScript("scripts/main.js", function() {
      console.log("main.js loaded and executed.");
    });
  } else {
    $('#user-warnings').text('Session expired. Please log in again.');
    signOut();
  }
}

/**
* Sends password reset/change email to email account
*/
function sendPasswordReset() {
  var email = $('#email-input').val();
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    $('#user-warnings').text('Password reset email sent.');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      $('#user-warnings').text(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      $('#user-warnings').text(errorMessage);
    }
    console.log(error);
  });
  // [END sendpasswordemail];
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
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      $('#login-page').addClass('logged-in');
      $('#login-page .loginInfo').find('button').prop('disabled', true);
      $('#login-page .welcomeInfo').find('button').prop('disabled', false);
      $('#email-input').val(email);   // Populate email field
      $('#password-input').val('');   // Clear password
      $('#welcome-name').text(displayName + '!');
      document.querySelector('.mdl-textfield').MaterialTextfield.checkDirty();
    } else {
      console.log('user signed out')
      $('#login-page').removeClass('logged-in');
      $('#login-page .loginInfo').find('button').prop('disabled', false);
      $('#login-page .welcomeInfo').find('button').prop('disabled', true);
    }
  });
  // [END authstatelistener]

  $('#signin-button').on('click', signIn);
  $('#signout-button').on('click', signOut);
  $('#entersite-button').on('click', enterSite);
  $('#changepassword-button').on('click', sendPasswordReset);
  $('#login-form').submit(signIn);
}

window.onload = function() {
  initApp();
};
