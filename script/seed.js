'use strict';
const {
  db,
  models: { User, Relationship, Posts, Recommendations, Media },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const [cody, murphy, doug, angel, anna, jiayu] = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'doug', password: '123' }),
    User.create({ username: 'angel', password: '123' }),
    User.create({ username: 'anna', password: '123' }),
    User.create({ username: 'jiayu', password: '123' }),
  ]);

  //creating sample posts

  const posts = await Promise.all([
    Posts.create({
      content: 'this is a post for test angel',
      userId: angel.id,
    }),
    Posts.create({ content: 'this is a post for test anna', userId: anna.id }),
    Posts.create({ content: 'this is a post for test doug', userId: doug.id }),
    Posts.create({
      content: 'this is a post for test jiayu',
      userId: jiayu.id,
    }),
  ]);

  console.log(`seeded ${posts.length} posts`);

  const users = [cody, murphy, doug, angel, anna, jiayu];

  const relationships = await Promise.all([
    Relationship.create({
      status: 'accepted',
      recipientId: doug.id,
      senderId: jiayu.id,
    }),
    Relationship.create({
      status: 'accepted',
      recipientId: cody.id,
      senderId: jiayu.id,
    }),
    Relationship.create({ recipientId: murphy.id, senderId: jiayu.id }),
    Relationship.create({ recipientId: jiayu.id, senderId: anna.id }),
  ]);

  const recommendations = await Promise.all([
    Recommendations.create({
      recipientId: doug.id,
      senderId: jiayu.id,
    }),
    Recommendations.create({
      recipientId: cody.id,
      senderId: jiayu.id,
    }),
  ]);
  console.log(`seeded ${recommendations.length} recommendations`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${relationships.length} relationships`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: cody,
      murphy: murphy,
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
