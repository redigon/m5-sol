(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UsersService', 'MenuService'];
  function SignUpController(UsersService, MenuService) {
    var $ctrl = this;
    $ctrl.registered = false;
    $ctrl.favoriteDishFound = false;

    $ctrl.signUp = function(event) {
      $ctrl.registered = true;
      event.preventDefault();
      var user = {
            firstName: $ctrl.firstName,
            lastName: $ctrl.lastName,
            email: $ctrl.email,
            phone: $ctrl.phone,
            favoriteDish: $ctrl.favoriteDish
      };

      MenuService.getMenuItem($ctrl.favoriteDish)
        .then(function(data) {
          user.favoriteMenuItem = data;
          $ctrl.favoriteDishFound = true;
          $ctrl.registered = true;
          UsersService.setUser(user);
        }, function(err) {
          UsersService.setUser(user);
          $ctrl.favoriteDishFound = false;
          $ctrl.registered = true;
        });
    };
  }
})();
