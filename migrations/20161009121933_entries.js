exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('entries', (table) => {
      table.increments(); // integer id

      table.timestamp('created_at').defaultTo(
          knex.raw('now()')
      ).notNullable();

      table.string('user_name');

      table.string('action');

      table.date('action_date');
    }),
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('entries'),
  ]);
};
