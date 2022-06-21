const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.put('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const updatedUser = await user.update({
      username: req.body.username,
      bio: req.body.bio,
      avatarUrl: req.body.avatarUrl,
      wallpaperUrl: req.body.wallpaperUrl,
    });
    res.send(updatedUser);
  } catch (ex) {
    next(ex);
  }
});
