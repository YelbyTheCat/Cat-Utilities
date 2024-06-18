const router = require('express').Router();
const {pick} = require('lodash');
const {Finance} = require('../../models');

const fields = [
  'amount',
  'transactionType',
  'companyName',
  'date',
  'details'
];

router.get('/', async (req, res) => {
  const options = {
    order: [['date', 'DESC']]
  };
  try {
    const finances = await Finance.findAndCountAll(options);

    // const organizedData = finances.reduce((acc, finance) => {
    //   const date = new Date(finance.date);
    //   const year = date.getFullYear();
    //   const month = date.toLocaleDateString('default', {month: 'long'}).toLowerCase();

    //   if (!acc[year]) acc[year] = {};

    //   if (!acc[year][month]) acc[year][month] = [];

    //   acc[year][month].push(finance);

    //   return acc;
    // }, {});

    res.send(finances);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const finance = await Finance.findOne({where: {id}});
    if (!finance) return res.sendStatus(404);
    res.send(finance);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const newFinance = await Finance.create(pick(req.body, fields));
    res.send(newFinance);
  } catch (e) {
    console.log('Error creating finance:', e);
    res.status(500).json({error: 'Could not create finance'});
  }
});

router.patch('/:id', async (req, res) => {
  const {id} = req.params;
  const finance = await Finance.findOne({where: {id}});
  if (!finance) return res.sendStatus(404);

  try {
    const updatedFinance = await finance.update(pick(req.body, fields));
    res.send(updatedFinance);
  } catch (e) {
    console.error('Error updating finance:', e);
    res.status(500).json({error: 'Could not create finance'});
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const finance = await Finance.findOne({where: {id}});
  if (!finance) return res.sendStatus(404);

  try {
    finance.destroy();
    return res.send({});
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
