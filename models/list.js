const { Schema, model } = require('mongoose');
// шаблон которому должны соответсвовать все документы созданные через new List
const schema = new Schema({
   title: {
      type: String,
      // указываем что поле title является обязательным
      required: true
   }
});
// предоставляем схему для создания документов по ключу List
module.exports = model('List', schema);
