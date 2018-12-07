const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}\n`;

  fs.appendFile('Server.log', log, (err) => { if (err) { console.log(err); } });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance',
//   });
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/cha', (req, res) => {
  res.render('challenge.hbs', {
    pageTitle: 'Challenge Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({ errorMessage: 'moving' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
