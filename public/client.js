/* global
$
*/

$(function () {
   const validator = /^[0-9]{1}$/;
   $('.shotBtn').on('click', function (e) {
      // проверка на пустые поля
      if ($('.inputX').val() === '' || $('.inputY').val() === '') {
         alert('Заполните пустые поля');
         return false;
      }
      // приводим к числу кординаты для дальнейшего сопостовления с регуляркой
      const X = +($('.inputX').val());
      const Y = +($('.inputY').val());
      if (!validator.test(X) || !validator.test(Y)) {
         alert('Вы ввели некоррекные значения');
         return false;
      }
   });
});
