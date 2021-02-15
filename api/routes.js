'use strict';

const controller = require('./controller');

module.exports = function(app) {
   app.route('/sobre')
       .get(controller.sobre);
   app.route('/track/:nomeCidade')
       .get(controller.getDistance);
};