const router = require('express').Router();
// const {pick} = require('lodash');
const {Finance} = require('../../models');

router.get('/', async (req, res) => {
  const options = {
    order: [['date', 'DESC']]
  };
  try {
    const finances = await Finance.findAndCountAll(options);
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

module.exports = router;
