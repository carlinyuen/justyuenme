
/**
* Handles the sign out button press.
*/
function signOut() {
  // Disable buttons for now to prevent multiple calls
  document.getElementById('signin-button').disabled = true;
  document.getElementById('signout-button').disabled = true;
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

}

/**
* Sends password reset/change email to email account
*/
function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    alert('Password Reset Email Sent!');
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
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
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      // Hack to personalize name by cutting off last name
      // if (displayName && displayName.length > 0) {
      //   displayName = displayName.substring(0, displayName.lastIndexOf(' '));
      // }

      console.log('Signed in');
      $('#login-page').addClass('logged-in');
      $('#login-page .loginInfo').find('button').prop('disabled', true);
      $('#login-page .welcomeInfo').find('button').prop('disabled', false);
      $('#email-input').val(email);   // Populate email field
      $('#password-input').val('');   // Clear password
      $('#welcome-name').text(displayName + '!');
      document.querySelector('.mdl-textfield').MaterialTextfield.checkDirty();
      console.log(JSON.stringify(user, null, '  '));
    } else {
      // User is signed out.
      $('#login-page').removeClass('logged-in');
      $('#login-page .loginInfo').find('button').prop('disabled', false);
      $('#login-page .welcomeInfo').find('button').prop('disabled', true);
    }
  });
  // [END authstatelistener]

  document.getElementById('signin-button').addEventListener('click', signIn, false);
  document.getElementById('signout-button').addEventListener('click', signOut, false);
  document.getElementById('enter-site').addEventListener('click', enterSite, false);
  document.getElementById('changepassword-button').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
  initApp();
};
