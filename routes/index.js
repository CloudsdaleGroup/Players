var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cloudsdale Radio' });
});

router.get('/cloudsdaleradio', function(req, res, next) {
  res.render('player/cloudsdaleradio', { title: 'Player Cloudsdale Radio'});
});

router.get('/animefm', function(req, res, next) {
  res.render('player/animefm', { title: 'Player AnimeFM', layout: 'player' });
});

router.get('/rs', function(req, res, next) {
  res.render('player/rs', { title: 'Player Radio Silence', layout: 'player' });
});

module.exports = router;
