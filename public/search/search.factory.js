angular.module('app')
  .factory('searchFactory', ($http, authFactory) => {

    let currentTemp;
    let userInput;

    return {
      // Take users zipcode input and call Weather Underground API for the current temp
      currentTemp (zipcode) {
        return $http
          .get(`http://api.wunderground.com/api/94f0d7223bd72613/conditions/q/${zipcode}.json`)
          .then(result => {
            currentTemp = result.data.current_observation;
            // console.log("currentTemp in searchFactory", currentTemp);
            return currentTemp
          });
      },
      getCurrentTemp () {
        return currentTemp;
      },
      getUserInput () {
        return userInput;
      },
      setUserInput (formValues) {
        userInput = formValues;
      }
    }
  })
