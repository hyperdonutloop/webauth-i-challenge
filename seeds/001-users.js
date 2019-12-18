
exports.seed = function(knex) {
  // deletes ALL existing entries
  // 000- cleanup already truncated
      return knex('users').insert([
        {username: 'Ryan', password: 'pizza'},
        {username: 'Kristin', password: 'donuts'},
        {username: 'Odin', password: 'cookies'}
      ]);
   
};
