
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments('id').primary();
    table.string('comment').notNullable();
    table.string('post_date');
    table.string('lid');
    table.string('did');
    table.string('uid');
  })
};

exports.down = function(knex, Promise) {

};
