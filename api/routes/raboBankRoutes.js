exports.routesConfig  = function(app) {
  var raboService = require('../controllers/raboBankController');

  // todoList Routes
  app.route('/transactions')
    .get(raboService.list_all_transactions);
};