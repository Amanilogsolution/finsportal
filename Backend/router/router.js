const express = require('express');
const router = express.Router();

const statesController = require('../controller/state');
const countryController = require('../controller/country');

router.get('/Totalstate', statesController.TotalStates);
router.post('/deleteState', statesController.deleteState);
router.post('/state', statesController.state);
router.post('/showstate', statesController.showstate);
router.post('/EditState', statesController.EditState);

router.get('/Totalcountry', countryController.countries);
router.post('/InsertCountry', countryController.InsertCountry);
router.post('/Showcountry', countryController.showcountry);
router.post('/Updatecountry', countryController.updatecountry);
router.post('/deleteCountry', countryController.deletecountry);



module.exports = router;