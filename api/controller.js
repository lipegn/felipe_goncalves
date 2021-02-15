'use strict';

var properties = require('../package.json')
var distance = require('../service/distance');

var controllers = {
   sobre: function(req, res) {
       res.json({nome:'Felipe Gonçalves', empresa:'Playscores'});
   },
   getDistance: function(req, res) {
           distance.find(req, res, function(err, dist) {
               if (err)
                   res.send(err);
               res.json(dist);
           });
       },
};

module.exports = controllers;