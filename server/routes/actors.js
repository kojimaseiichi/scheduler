const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const actorSchema = require('../schema/actor-schema')

router.get('/count', (req, res, next) => {
  console.log('count actors');
  actorSchema.count((err, count) => {
    if (err) {
      return err;
    }
    return res.json(count);
  });
});

router.get('/', (req, res, next) => {
  console.log('get all actors');
  actorSchema.find((err, actors) => {
    if (err) {
      return err;
    }
    res.json(actors);
  });
});

router.get('/:id', (req, res, next) => {
  console.log('get one actor');
  actorSchema.findById(req.params.id, (err, actor) => {
    if (err) {
      return err;
    }
    res.json(actor);
  })
});

router.post('/', (req, res, next) => {
  console.log('add one actor');
  actorSchema.create(req.body, (err, post) => {
    if (err) {
      console.log(err);
      return err;
    }
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  console.log('update one actor');
  actorSchema.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      return res.json(err);
    }
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  console.log('remove one actor');
  actorSchema.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) {
      return res.json(err);
    }
    return res.json(post)
  });
});

module.exports = router;