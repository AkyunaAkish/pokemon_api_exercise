custom_directives.directive('gsAngularLogo', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/firstTemplate.html',
    scope: {
      yoyos: '=yoyos'
    }
  };
});
