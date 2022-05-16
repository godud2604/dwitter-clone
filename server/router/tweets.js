import express from 'express';
import 'express-async-errors';

const router = express.Router();

let tweets = [
  {
    id: '1',
    text: '드림코딩에서 강의 들으면 너무 좋으다',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    text: 'gdgd',
    createdAt: Date.now().toString(),
    name: 'Bob2',
    username: 'bob2',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];


// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res) => {
  const username = req.query.username;
  const data = username ? tweets.filter(tweet => tweet.username === username) : tweets;
  res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found`});
  }
});

// POST /tweets
router.post('/', (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    createdAt: new Date(),
    name,
    username,
    text,
  };
  tweets = [tweet, ...tweets];

  res.status(201).json(tweet);
})

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const { text } = req.body;
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  if (!tweets) {
    throw new Error('tweet not found!');
  }

  res.sendStatus(204);
})

export default router;
