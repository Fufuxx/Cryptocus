const bookshelf = require('../database.js');

var Dummy = bookshelf.Model.extend({
  tableName: 'dummy_table',
  hasTimestamps: true
});

module.exports = bookshelf.model('Dummy', Dummy);