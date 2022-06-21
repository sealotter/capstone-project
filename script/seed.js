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
    User.create({ username: 'cody', password: '123', avatarUrl: '', bio: '' }),
    User.create({
      username: 'murphy',
      password: '123',
      avatarUrl: '',
      bio: '',
    }),
    User.create({ username: 'doug', password: '123', avatarUrl: '', bio: '' }),
    User.create({
      username: 'angel',
      password: '123',
      avatarUrl:
        'https://lh3.googleusercontent.com/ogw/ADea4I4QIDvtZGTxFFQm4iseETZ78UUTpL9r85jLQYVecw=s32-c-mo',
      bio: "hi, i'm angel. I will change your life!",
      wallpaperUrl:
        'data:image/png;base64,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',
    }),
    User.create({ username: 'anna', password: '123', avatarUrl: '', bio: '' }),
    User.create({
      username: 'jiayu',
      password: '123',
      avatarUrl: '',
      bio: '',
    }),
  ]);

  //creating sample posts

  const posts = await Promise.all([
    Posts.create({
      content: 'this is a post for test angel',
      userId: angel.id,
      username: angel.username,
      avatarUrl: angel.avatarUrl,
    }),
    Posts.create({
      content: 'this is a post for test anna',
      userId: anna.id,
      username: anna.username,
    }),
    Posts.create({
      content: 'this is a post for test doug',
      userId: doug.id,
      username: doug.username,
    }),
    Posts.create({
      content: 'this is a post for test jiayu',
      userId: jiayu.id,
      username: jiayu.username,
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
