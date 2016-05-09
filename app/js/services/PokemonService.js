custom_directives.service('PokemonService', ['$q', '$log','$http', function($q,$log,$http){
  var baseUrl = 'http://pokeapi.co/';
  var pokemonInfoPath = 'api/v1/pokemon/';
  var pokeList = [];
  var pokemon = [];

  return {
    getRandomInt: function(min,max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    gatherUris: function(){
      var deferred = $q.defer();
      var context = this;

      $http.get('http://pokeapi.co/api/v1/pokedex/1/')
      .then(function(response) {
        for(i=0;i<5;i++){
          pokeList.push(response.data.pokemon[context.getRandomInt(0,778)].resource_uri);
        }
        deferred.resolve(pokeList);
      })

      return deferred.promise;
    },
    gatherSprites: function(pokemonArr){
      var promiseArray = [];

      for (i=0;i<pokemonArr.length;i++) {
        if (pokemonArr[i].data.sprites[0]) {
          promiseArray.push($http.get('http://pokeapi.co/' + pokemonArr[i].data.sprites[0].resource_uri));
        } else {
          promiseArray.push({
            data: {
              image: 'http://www.clevelandheights.com/modules/showimage.aspx?imageid=601',
              placeholder: true
            }
          });
        }
      }

      var final = $q.all(promiseArray).then(function(dataArray) {
        return {pokemon: pokemonArr, sprites: dataArray};
      });

      return final;
    },
    gatherPokemon: function(uriList){
      var promiseArray = [];

      for (i=0;i<uriList.length;i++) {
        promiseArray.push($http.get('http://pokeapi.co/' + uriList[i]));
      }

      var finalArr = $q.all(promiseArray).then(function(dataArray) {
        console.log('data of pokemon', dataArray);
        return dataArray;
      });

      return finalArr;

    },
    getRandomPokemon: function(){
      var context = this;

      return context.gatherUris().then(function(uriList){

        return context.gatherPokemon(uriList);

      })
      .then(function(gatheredPokemon){

        return context.gatherSprites(gatheredPokemon);

      });

    }
  }
}]);
