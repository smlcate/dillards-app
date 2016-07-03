
exports.up = function(knex, Promise) {
  return knex.schema.createTable('departments', function(table) {
    table.string('department');
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('departments');
};
