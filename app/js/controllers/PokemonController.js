custom_directives.controller('PokemonController', ['$scope', 'PokemonService','$log','$q', function($scope,PokemonService,$log,$q){

  PokemonService.getRandomPokemon()
  .then(function(pokeData){
    var pokemon = pokeData.pokemon;
    var sprites = pokeData.sprites;

    for (var i = 0; i < pokemon.length; i++) {
      pokemon[i].data.sprites = sprites[i];
    }

    $scope.pokemon = pokemon;
  });




}]);
