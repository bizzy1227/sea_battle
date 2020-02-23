const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const serverRoutes = require('./routes/rout');
const path = require('path');

const PORT = 3000;

const app = express();
const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs'
});

// middleware---------------------------------------------------
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(serverRoutes);
// ---------------------------------------------------------------
async function startWork () {
   try {
      await mongoose.connect('mongodb+srv://tester12:tester27@seabattleapp-qmru3.mongodb.net/test?retryWrites=true&w=majority', {
         useNewUrlParser: true,
         useFindAndModify: false
      });
      app.listen(PORT, () => {
         console.log('Server has been started at 3000');
      });
   } catch (error) {
      console.log(error);
   }
}
startWork();
