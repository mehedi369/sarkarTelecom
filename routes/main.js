const router = require('express').Router();

// Traveling routes
router.get('/', (req, res) => {
  res.render('main/home');
});

router.get('/about', (req, res) => {
  res.render('main/about');
});

router.get('/xiaomi', (req, res) => {
  res.send('Xiaomi');
});

router.get('/oppo', (req, res) => {
  res.send('Oppo');
});

router.get('/huawei', (req, res) => {
  res.send('Huawei');
});

router.get('/accessories', (req, res) => {
  res.send('Accessories');
});

module.exports = router