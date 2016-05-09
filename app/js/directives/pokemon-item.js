custom_directives.directive('pokemonItem', [ function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/pokemonItem.html',
    scope: {
      pokemon: '=pokemon'
    }
  };
}]);
