const router = require('express').Router();
const {pick} = require('lodash');
const {Job} = require('../../models');

router.get('/', async (req, res) => {
  const options = {};
  const jobs = await Job.findAndCountAll(options);
  res.send(jobs);
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const job = await Job.findOne({id});
  if (!job) return res.sendStatus(404);
  res.send(job);
});

router.post('/', async (req, res) => {
  try {
    const newJob = await Job.create(pick(req.body, 
      'companyName',
      'position',
      'dateApplied',
      'rangeMax',
      'rangeMin',
      'location',
      'heardBack',
      'heardBackDate',
      'heardBackResponse',
      'inProgress',
      'denied',
      'deniedResponse',
      'companySummary',
      'tasks',
      'requirements',
      'benefits',
      'jobUrl',
    ));
    res.send(newJob);
  } catch (e) {
    console.error('Error creating job:', e);
    res.status(500).json({ error: 'Could not create job' });
  }
});

router.patch('/:id', async (req, res) => {
  const {id} = req.params;
  const job = await Job.findOne({id});
  if (!job) return res.sendStatus(404);

  try {
    const updatedJob = await job.update(pick(req.body, 
      'companyName',
      'position',
      'dateApplied',
      'rangeMax',
      'rangeMin',
      'location',
      'heardBack',
      'heardBackDate',
      'heardBackResponse',
      'inProgress',
      'denied',
      'deniedResponse',
      'companySummary',
      'tasks',
      'requirements',
      'benefits',
      'jobUrl',
    ));
    res.send(updatedJob);
  } catch (e) {
    console.error('Error updating job:', e);
    res.status(500).json({ error: 'Could not create job' });
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const job = await Job.findOne({id});
  if (!job) return res.sendStatus(404);

  try {
    job.destroy();
    return res.send({});
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
