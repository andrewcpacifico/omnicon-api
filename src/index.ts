import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json(req.query);
});

app.listen(7163, () => {
  console.log('App online');
});


