const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

const IA_POSITIONING_API_KEY = process.env.IA_API_KEY;

app.get('/venue/:venueId', function (req, res) {
  const venueId = req.params.venueId;
  console.log("fetching venue " + venueId);
  const venueUrl = "https://positioning-api.indooratlas.com/v1/venues/" + venueId
  request(venueUrl + '?key=' + IA_POSITIONING_API_KEY, (err, resp, body) => {
    if (err) res.status(404).send("Invalid Venue ID");

    const newBody = JSON.parse(body);
    newBody.floorPlans.forEach(floorplan => floorplan.image.url = "/fp?q=" +
        encodeURIComponent(floorplan.image.url));
    res.send(newBody);
  });
});

app.use('/fp', function(req, res, next) {
  request(req.query.q).pipe(res);
});

app.use(express.static('public'));

app.listen(3000, () => console.log('Floor plan backend proxy started'));
