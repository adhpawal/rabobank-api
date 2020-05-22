exports.routesConfig = function (app) {
  var raboService = require('../controllers/raboBankController');

  // tranasction Routes
  app.route('/transactions')
    .get(raboService.list_all_transactions);
};