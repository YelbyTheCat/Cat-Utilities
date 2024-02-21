const router = require('express').Router();
const {pick} = require('lodash');
const {Job} = require('../../models');

// const {google} = require('googleapis');

router.get('/', async (req, res) => {
  const options = {
    order: [['dateApplied', 'ASC']]
  };
  try {
    const jobs = await Job.findAndCountAll(options);
    res.send(jobs);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const job = await Job.findOne({where: {id}});
    if (!job) return res.sendStatus(404);
    res.send(job);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
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
  const job = await Job.findOne({where: {id}});
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
  const job = await Job.findOne({where: {id}});
  if (!job) return res.sendStatus(404);

  try {
    job.destroy();
    return res.send({});
  } catch (e) {
    res.sendStatus(500);
  }
});

// const authGoogleApi = async () => {
//   console.log('Doing auth');
//   const auth = new google.auth.GoogleAuth({
//     keyFile: 'secret.json',
//     scopes: 'https://www.googleapis.com/auth/spreadsheets'
//   });
//   const client = await auth.getClient();
//   const googleSheets = google.sheets({version: 'v4', auth: {client}});
//   console.log('Auth success');
//   return {googleSheets, auth};
// };

// const jobHeader = [{
//   property: 'id',
//   column: 'A',
//   type: 'number'
// },
// {
//   property: 'companyName',
//   column: 'B',
//   type: 'text'
// },
// {
//   property: 'position',
//   column: 'C',
//   type: 'text'
// },
// {
//   property: 'dateApplied',
//   column: 'D',
//   type: 'date'
// },
// {
//   property: 'rangeMax',
//   column: 'E',
//   type: 'number'
// },
// {
//   property: 'rangeMin',
//   column: 'F',
//   type: 'number'
// },
// {
//   property: 'location',
//   column: 'G',
//   type: 'text'
// },
// {
//   property: 'heardBack',
//   column: 'H',
//   type: 'boolean'
// },
// {
//   property: 'heardBackDate',
//   column: 'I',
//   type: 'date'
// },
// {
//   property: 'heardBackResponse',
//   column: 'J',
//   type: 'text'
// },
// {
//   property: 'inProgress',
//   column: 'K',
//   type: 'boolean'
// },
// {
//   property: 'denied',
//   column: 'L',
//   type: 'boolean'
// },
// {
//   property: 'deniedResponse',
//   column: 'M',
//   type: 'text'
// },
// {
//   property: 'companySummary',
//   column: 'N',
//   type: 'text'
// },
// {
//   property: 'tasks',
//   column: 'O',
//   type: 'text'
// },
// {
//   property: 'requirements',
//   column: 'P',
//   type: 'text'
// },
// {
//   property: 'benefits',
//   column: 'Q',
//   type: 'text'
// },
// {
//   property: 'jobUrl',
//   column: 'R',
//   type: 'text'
// }];

// const createObjectFromHeader = (header, row) => {
//   const dataObject = {};
//   for (let i = 0; i < header.length; i++) {
//     dataObject[header[i].property] = row.length > i ? row[i] : null;
//   }
//   return dataObject;
// };

// /**
//  * Takes in JOB 2d array and turns it into an array of objects
//  * @param {array} data array of arrays
//  * @return {array} An array of objects
//  */
// const formatJobsArrayOfArraysToObjectArray = data => {
//   return data.map(row => (createObjectFromHeader(jobHeader, row)));
// };

// router.get('/import', async (req, res) => {

//   let values = null;

//   try {
//     const {googleSheets, auth} = await authGoogleApi();

//     // Get metadata about spreadsheet
//     const getRows = await googleSheets.spreadsheets.values.get({
//       auth,
//       spreadsheetId: '1cra4sYalp314PgGYmpmfD-zFUFh20reacfUklqcD59I',
//       range: 'jobs'
//     });

//     console.log('I have authed');
//     getRows.data.values.shift(); // Remove headers
//     values = getRows.data.values;
//   } catch (e) {
//     console.error(e);
//     res.send(500);
//   }

//   const dataArray = formatJobsArrayOfArraysToObjectArray(values);

//   console.log(dataArray[0], dataArray[1], dataArray[2]);

//   // console.log('-----------------------------------------', dataArray);
//   const isValidDate = date => {
//     return !isNaN(date.getTime());
//   };
  
//   // Helper function to parse date strings in the format 'YYYY-MM-DD'
//   const parseDate = dateStr => {
//     if (!dateStr) return null;
//     const parts = dateStr.split('-');
//     const year = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
//     const day = parseInt(parts[2], 10);
  
//     // Create a new Date object with the parsed year, month, and day
//     const date = new Date(year, month, day);
  
//     // Check if the parsed date is valid
//     if (isValidDate(date)) {
//       return date;
//     } else {
//       // Return null if the parsed date is invalid
//       return null;
//     }
//   };

//   // const smallDateArray = [dataArray[0], dataArray[1], dataArray[2], dataArray[3], dataArray[4]];

//   try {
//     const jobsData = dataArray.map(data => {
//       // let heardBackDate = null;
//       // if (data.heardBackDate) {
//       //   heardBackDate = new Date (data.heardBackDate);
//       //   heardBackDate = isValidDate(heardBackDate) ? heardBackDate : null;
//       // }
//       return {
//         companyName: data.companyName,
//         position: data.position,
//         dateApplied: parseDate(data.dateApplied),
//         rangeMax: data.rangeMax,
//         rangeMin: data.rangeMin,
//         location: data.location,
//         heardBack: data.heardBack === 'TRUE',
//         heardBackDate: parseDate(data.heardBackDate),
//         heardBackResponse: data.heardBackResponse,
//         inProgress: data.inProgress === 'TRUE',
//         denied: data.denied === 'TRUE',
//         deniedResponse: data.deniedResponse,
//         companySummary: data.companySummary,
//         tasks: data.tasks,
//         requirements: data.requirements,
//         benefits: data.benefits,
//         jobUrl: data.jobUrl
//       };});

//     console.log(jobsData);

//     await Job.bulkCreate(jobsData);

//     res.status(201).send('Data imported successfully');
//   } catch (e) {
//     console.error(e);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;
