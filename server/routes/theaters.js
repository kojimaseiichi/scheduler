const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const theaterSchema = require('../schema/theater-schema')

router.get('/count', (req, res, next) => {
  console.log('count theaters');
  theaterSchema.count((err, count) => {
    if (err) {
      return err;
    }
    res.json(count);
  });
});

router.get('/', (req, res, next) => {
  console.log('get all theaters');
  theaterSchema.find((err, theaters) => {
    if (err) {
      return err;
    }
    res.json(theaters);
  });
});

router.get('/:id', (req, res, next) => {
  console.log('get one theater');
  theaterSchema.findById(req.params.id, (err, theater) => {
    if (err) {
      return err;
    }
    res.json(theater);
  })
});

router.post('/', (req, res, next) => {
  console.log('add one theater');
  theaterSchema.create(req.body, (err, post) => {
    if (err) {
      console.log(err);
      return err;
    }
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  console.log('update one theater');
  theaterSchema.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      return res.json(err);
    }
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  console.log('remove one theater');
  theaterSchema.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) {
      return res.json(err);
    }
    return res.json(post)
  });
});

module.exports = router;