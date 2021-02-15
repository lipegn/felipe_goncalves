var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');

const spotfy_KEY = "a57133d41f924c50a7807fa2c1b38e44";
const openWeather_KEY = '1219c224afd0c7b6dc88b9bc702be0d2';

var distance = {
   find: function(req, res, next) {
       
       request(encodeURI(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.nomeCidade}&appid=${openWeather_KEY}&units=metric`),
       function (error, response, body) {

          console.log(JSON.parse(body));

          const temperatura =  JSON.parse(body).main.temp;
          let idCategoria = '';
            // ----------------------------
            if (temperatura > 32) {
               idCategoria = 'party';
            }
            // ----------------------------
            if (temperatura >= 22 && temperatura <= 32) {
               idCategoria = 'pop';
            }
            // ----------------------------
            if (temperatura >= 10 && temperatura <= 22) {
               idCategoria = 'rock';
            }
            // ----------------------------
            if (temperatura < 10) {
               idCategoria = 'classic';
            }
            // ----------------------------

            var spotifyApi = new SpotifyWebApi({
               clientId: spotfy_KEY
             });
            // spotifyApi.setAccessToken(spotfy_KEY);
            // Não consegui gerar o token, pois necessita da client_secret:  SPOTIFY_CLIENT_SECRET

            res.json(JSON.parse(body));

            spotifyApi.searchPlaylists(idCategoria).then(function(data) {
              console.log('Segue sua playlist !!', data.body);
            }, function(err) {
              console.log('Deu erro de token!', err);
            });
       });
   }
};

module.exports = distance;