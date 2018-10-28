const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const scheduleSchema = require('../schema/schedule-schema')

router.get('/count', (req, res, next) => {
    console.log('count schedules');
    scheduleSchema.count((err, count) => {
        if (err) {
            return err;
        }
        res.json(count);
    });
});

router.get('/future', (req, res, next) => {
    console.log('future schedules');
    scheduleSchema.find({ date: { $gte: new Date() } })
        .populate('actor')
        .populate('theater')
        .exec((err, schedules) => {
            if (err) {
                return err;
            }
            res.json(schedules);
        });
});

router.get('/', (req, res, next) => {
    console.log('get all schedules');
    scheduleSchema.find()
        .populate('actor')
        .populate('theater')
        .exec((err, schedules) => {
            if (err) {
                return err;
            }
            res.json(schedules);
        });
    // scheduleSchema.find((err, schedules) => {
    //     if (err) {
    //         return err;
    //     }
    //     res.json(schedules);
    // });
});

router.get('/:id', (req, res, next) => {
    console.log(`get one schedule(${req.params.id})`);
    scheduleSchema.findById(req.params.id)
        .populate('actor')
        .populate('theater')
        .exec((err, schedule) => {
            if (err) {
                return err;
            }
            res.json(schedule);
        });
});

router.post('/', (req, res, next) => {
    console.log('add one schedule');
    scheduleSchema.create(req.body, (err, post) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.json(post);
    });
});

router.put('/:id', (req, res, next) => {
    console.log('update one schedule');
    scheduleSchema.findByIdAndUpdate(req.params.id, req.body, (err, put) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.json(put);
    });
});

router.delete('/:id', (req, res, next) => {
    console.log('remove one schedule');
    actorSchema.findByIdAndRemove(req.params.id, (err, del) => {
        if (err) {
            return res.json(err);
        }
        return res.json(del)
    });
});


module.exports = router;