const { Router } = require('express');
const List = require('../models/List');
const router = Router();
let game = require('../seaBattel.js');

router.get('/', async (req, res) => {
   const lists = await List.find({}).lean();
   // предоставляем шаблонизатору массив lists для отображения
   res.render('index', {
      lists
   });
});

router.post('/', async (req, res) => {
   try {
      let inputTitle = '';
      const data = game.createSeaBattle();
      // проверка на пустое поле поскольку пустая строка '' ---> 0 при приведении к числу
      if (req.body.titleX === '' || req.body.titleY === '') {
         throw new Error('Вы ввели пустое поле');
      }
      // формируем тескт сообщения для записи в новый документ и дальнейшего вывода в историю
      const result = data(+req.body.titleX)(+req.body.titleY);
      if (result === 1) {
         inputTitle = 'User shot x: ' + req.body.titleX + ', y: ' + req.body.titleY + '. Result: ' + result;
      }
      if (result === -1) {
         inputTitle = 'User shot x: ' + req.body.titleX + ', y: ' + req.body.titleY + '. Result: ' + result;
      }
      if (result === 0) {
         inputTitle = 'User shot x: ' + req.body.titleX + ', y: ' + req.body.titleY + '. Result: ' + result;
      }
      const list = new List({
         title: await inputTitle
      });
      // сохраняем в Mongo новый файл
      await list.save();
      res.redirect('/');
   } catch (error) {
      const list = new List({
         title: 'Error: ' + await error.message
      });
      await list.save();
      res.redirect('/');
   }
});

router.get('/delete', async (req, res) => {
   try {
      await List.deleteMany({});
      const list = new List({
         title: 'New game started!'
      });
      await list.save();
      // чистим кэш require для обновления поля с кораблями для новой игры
      delete require.cache[require.resolve('../seaBattel.js')];
      game = require('../seaBattel.js');
      res.redirect('/');
   } catch (error) {
      console.log(error);
   }
});

module.exports = router;
