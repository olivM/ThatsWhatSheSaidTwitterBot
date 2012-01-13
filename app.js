var twitter = require('ntwitter');

var twss_nbc = require('twss');
twss_nbc.algo = 'nbc';

var twss_knn = require('twss');
twss_knn.algo = 'knn';
twss_nbc.threshold = twss_knn.threshold = 0.1;

var LanguageDetect = require('languagedetect');
var lngDetector = new LanguageDetect();


var twit = new twitter({
  consumer_key: 'IxaMqu3dzMq124EuqKpg',
  consumer_secret: 'GyYvjFjy8kXdpMzpsRzcppD1TnnWa8kBRfuOEHfpkNs',
  access_token_key: '1501751-K9ekhtHLa51MQBpnW9dGJ49xLNokzx2NkKpqL7xjks',
  access_token_secret: 'kE19A9rVammfVjXon4JpGPJPDrSqorcadIryQAufc'
});

twit.stream('statuses/sample', function(stream) {
  stream.on('data', function (data) {
    if ( data.user.lang == 'en' ) {
      try {
        if ( lngDetector.detect(data.text, 1)[0][0] == 'english') {
          if ( twss_nbc.is(data.text) && twss_knn.is(data.text) ) {
            console.log( data.user.lang + ' - ' + data.text);
          }
        }
      }
      catch(e) {
      }
    }
  });
});


