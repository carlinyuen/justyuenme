
/**
* Handles the sign out button press.
*/
function signOut() {
  // Disable buttons for now to prevent multiple calls
  document.getElementById('sign-in').disabled = true;
  document.getElementById('sign-out').disabled = true;
  firebase.auth().signOut();
}

/**
* Handles the sign in button press.
*/
function signIn() {
  if (firebase.auth().currentUser) {
    alert('Already signed in!');
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
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
      // [START_EXCLUDE]
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
      document.getElementById('sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }

  // Disable buttons for now to prevent multiple calls
  document.getElementById('sign-in').disabled = true;
  document.getElementById('sign-out').disabled = true;
}

/**
* Serves site content if the user is auth'd
*/
function enterSite() {

}

/**
* Handles the sign up button press.
*/
// function handleSignUp() {
//   var email = document.getElementById('email').value;
//   var password = document.getElementById('password').value;
//   if (email.length < 4) {
//     alert('Please enter an email address.');
//     return;
//   }
//   if (password.length < 4) {
//     alert('Please enter a password.');
//     return;
//   }
//   // Sign in with email and pass.
//   // [START createwithemail]
//   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // [START_EXCLUDE]
//     if (errorCode == 'auth/weak-password') {
//       alert('The password is too weak.');
//     } else {
//       alert(errorMessage);
//     }
//     console.log(error);
//     // [END_EXCLUDE]
//   });
//   // [END createwithemail]
// }

/**
* Sends an email verification to the user.
*/
// function sendEmailVerification() {
//   // [START sendemailverification]
//   firebase.auth().currentUser.sendEmailVerification().then(function() {
//     // Email Verification sent!
//     // [START_EXCLUDE]
//     alert('Email Verification Sent!');
//     // [END_EXCLUDE]
//   });
//   // [END sendemailverification]
// }

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
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
    // [START_EXCLUDE silent]
    // document.getElementById('verify-email').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      // Hack to personalize name by cutting off last name
      if (displayName && displayName.length > 0) {
        displayName = displayName.substring(0, displayName.lastIndexOf(' '));
      }

      // [START_EXCLUDE]
      // document.getElementById('sign-in-status').textContent = 'Signed in';
      console.log('Signed in');
      // document.getElementById('sign-in').textContent = 'Sign out';
      $('#login').addClass('logged-in');
      $('#login .loginField').find('button').prop('disabled', true);
      $('#login .welcomeActions').find('button').prop('disabled', false);
      $('#email').val(email);   // Populate email field
      $('#password').val('');   // Clear password
      $('#welcome-name').text(displayName + '!');
      document.querySelector('.mdl-textfield').MaterialTextfield.checkDirty();
      console.log(JSON.stringify(user, null, '  '));
      // document.getElementById('account-details').textContent = JSON.stringify(user, null, '  ');
      // if (!emailVerified) {
      //   document.getElementById('verify-email').disabled = false;
      // }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      // document.getElementById('sign-in-status').textContent = 'Signed out';
      // document.getElementById('sign-in').textContent = 'Sign in';
      $('#login').removeClass('logged-in');
      $('#login .loginField').find('button').prop('disabled', false);
      $('#login .welcomeActions').find('button').prop('disabled', true);
      // document.getElementById('account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    // document.getElementById('sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]

  document.getElementById('sign-in').addEventListener('click', signIn, false);
  document.getElementById('sign-out').addEventListener('click', signOut, false);
  document.getElementById('enter-site').addEventListener('click', enterSite, false);
  // document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
  // document.getElementById('verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
  initApp();
};
