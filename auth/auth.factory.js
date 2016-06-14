angular.module('app')
  .factory('authFactory', ($timeout, $location, $http) => {

    let currentUser = null;

    // Listener that fires on login or logout state of change
    firebase.auth().onAuthStateChanged(function(user) {

      console.log("user of onAuthStateChanged: ", user);
      console.log("Fired state of change function on auth.factory.js");

      if (user) {
        currentUser = user;
        $location.path('main-page');
        $timeout();
      } else {
        currentUser = null;
        $location.path('/');
        $timeout();
      }
    });


    // Making of the object via users info, be registering, FB returns
    // an object that call (below??) then I pass 'user' into this function
    // to have the objects information, then I make an object called newUser.
    createUser = function (user) {
      let newUser = { // makes two keys and adds the FB objects keys values to the keys made
        email: user.email,
        uid: user.uid,
      }
      console.log("newUser: ", newUser );

      // This 'post', post to FB via the key we made in FB called user.
      // The second argument 'newUser' is the object we made to be posted in FB.
      $http.post(`https://fed-capstone.firebaseio.com.json`, newUser). then();
    }


    // This is all being returned into authFactory for used elsewhere
    return {
      // Register function and grabs users infor crom createUser function below
      register (email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)

        // This below, once the user registers, makes an argument called user,
        // that executes a function called 'createUser' below and pass in the arugment user.
        // The function on line 27 is where it is being executed
        .then(user => createUser(user))
        .catch(function(error) {
          console.log(".catch (error): ", error);
          let errorCode = error.code;
          let errorMessage = error.message;
        });
      },

      // Login Function
      login (email, password) {
        firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
          console.log("Error via login function: ", error.message);
          let errorCode = error.code;
          let errorMessage = error.message;
        });
      },

      // Returning 'currentUser' so it can be accessed through 'authFactory' in other files
      getUser () {
        return currentUser;
      }

    } // end of the return

  }) // end of factory