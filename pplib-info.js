//Примеры использования библиотеки PPLIB


// Описание функций

// 1. Инициализация
PPLIB.init(website, data, debug, callback);
// website(0-255) - числовой значение веб сайта, data(object) - массив параметров,  debug (boolean) - вывод логов в консоль, callback - функция обратного вызова
// website
// 0 - сайт (Xsolla)
// 1 - VK
// 2 - Одноклассники
// 3 - Мой мир
// 4 - Фотострана
// 5 - Рамблер Игры
// 6 - РБК 
// 7 - games@mail.ru
// 10 - Android/ioS

// data
// client_key - клиентский ключ из настроек. Необходим для Мой мир, Фотострана
// api_id - айди приложения из настроек. Необходим для Фотострана(буквенный) и games@mail.ru
// test_mode(0-1) - тестовый режим, необходим для выключенного приложения в VK(не рекомендуется использовать) и в sandbox.games.rambler.ru

// callback - работает везде кроме РБК



// 2. Методы API
PPLIB.api(method, data, callback);
// method - метод API, data(object) - массив параметров, callback - функция обратного вызова
// metod
// pp.getCurrentUser, {} - текущая информация о пользователе. Не работает в РБК и Рамблер
	// пример ответа
	// bdate : 18.6.1920 (полученная дата от соц сети. Может быть не полная)
	// sex : 1 (ISO 5218)
	// first_name : Алексей (имя)
	// last_name : Лебедев (фамилия)
	// photo_mini : https://u03.fotocdn.net/109/user_t/221/2286345324.jpg (около 50px)
	// photo_small : https://u03.fotocdn.net/109/user_xs/221/2286345324.jpg (около 100px)
	// photo_big : https://i03.fotocdn.net/s9/109/user_s/221/2286345324.jpg?20140929193308 (около 200px)
	// photo_max : https://i03.fotocdn.net/s9/109/user_m/221/2286345324.jpg?20140929193308 (максимально возможная)
	// uid : 78525319 //айди в соц сети
// Обязательно проверяйте значения полей на различных площадках

// pp.getProfiles, {user_ids: 'user1,userd2,user3'} - информация о конкретных пользователях
// ответ содержит объект объектов формата ответа метода pp.getCurrentUser
// {"1":{"bdate":"10.10.1984","sex":1,"first_name":"Павел","last_name":"Дуров" ... }, "1111": {}}

// pp.getAppFriends {}  - друзья в приложении. Не работает в РБК, Рамблер и games@mail.ru
// возвращает массив айди друзей [1,2,3,4,5]

// pp.getFriends {}  - друзья в приложении. Не работает в Мой мир, РБК, Рамблер. Частично работает в games@mail.ru.
// возвращает массив айди друзей [1,2,3,4,5]
// в games@mail.ru возврат уже содержит информацию о именах и аватарок друзей. Рекомендуются его изучить более делатально

// pp.hasPhotoPermission {} - проверка на разрешение загрузки фотографий в альбоме. Работвет в VK, Одноклассники, Мой мир и Фотострана.  
// возвращает true, false 
// Используйте на свой страх и риск

//Методы площадки
// Через библиотеку можно вызывать базовые методы площадок. Примеры ниже
// Вызов execute для ВК
// PPLIB.api('execute', {code: 'return [API.users.isAppUser(), API.friends.get(), API.status.get()];'}, function(data) { console.log(data)});

// //Вызов нестандартного метода для ОК
// PPLIB.api('users.getInfo', {uids: PPLIB.soc_id, fields:'BIRTHDAY'}, function(data) { console.log(data)});

// //Вызов нестандартного метода для Мой мир
// PPLIB.api('mailru.common.users.hasAppPermission', ['photos'], function(data){ console.log(data)})


// //Вызов нестандартного метода для Фотострана
// PPLIB.api('User.getProfiles', {userIds: PPLIB.soc_id, fields: 'user_name'}, function(data){ console.log(data)})


// 3. Методы
PPLIB.callMethod(method, param1, param2, param3);
// method - метод, param[1-10] - параметры метода 
// pp.buyItem, param1 содержимое
// 
//  { 
  //   item: 10001, //10001 //лучше везде использовать целые числа
  //   title: 'Название предмета', // нужно для некоторых площадок
  //   description: 'Описание предмета', // нужно для некоторых площадок
  //   price: price_arr[0], // либо число вручную либо результат PPLIB.convPrice(rub_price)[0] //стоимость предмета 70 рублей
  //   img: url_game+'img/1.png' // картинка нужна для некоторых площадок
  // }

// pp.showInviteBox, param1 - текст приглашения для Мой мир и Одноклассников. Не доступен для Рамблер, РБК, games@mail.ru

// pp.post param1 - текст, param2 - изображение, param3 - ссылка.  Не доступен для Рамблер, РБК, games@mail.ru
// изображение - ссылка, но в случае VK и Одноклассников используем айди объекта



// 4. Callback

 PPLIB.addCallback(method, callback);

// Пока доступен только для платежей
 PPLIB.addCallback('pp.onOrder', function(status) {
  if(status=='success')
  {
      alert('Оплата прошла');
  }
  else
  {
      alert('Оплата не прошла'); //Работает не везде
  }

}); 

 //5. Полезные функции и переменные

PPLIB.website; //  айди веб сайт
PPLIB.api_id; //  айди приложения на площадке
PPLIB.debug; // статус отладки
PPLIB.moble; // 1 - мобильная версия 0 - обычный сайт
PPLIB.test_mode; // 1 - тестовый режим, 0 - обычный режим


PPLIB.getGameLink(); //ссылка на игру, не доступно для РБК
PPLIB.convPrice(price_rub); // цена предмета в различных соц сетях // число для вызова в платежном скрипте ,число для отображения на кнопке покупка, название валюты площадки с учетом числительного
PPLIB.sys.getJsonFromUrl(); //объект параметров в адресной строке


