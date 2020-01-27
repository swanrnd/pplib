<?php  


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


//Конфигурационный файл с ключами и айди приложений
require_once('config.php');

$website=-1;

$mobile=false;

$gm_unreg=false;

if(isset($_GET["api_id"]) && $_GET["api_id"]==$vk_app_id)
{
    $website=1; //Вконтакте
}
else if(isset($_GET["application_key"]) && $_GET["application_key"]==$ok_client_key)
{
    $website=2; //Одноклассники
    if(isset($_GET["mob"]) && $_GET["mob"]==$true)
    {
        $mobile=true;
    }
}
else if(isset($_GET["app_id"]) && $_GET["app_id"]==$mm_app_id)
{
    $website=3; //Мой мир
}
else if(isset($_GET["apiId"]) && $_GET["apiId"]==$fs_app_id)
{
    $website=4; //Фотострана
}
else if(isset($_GET["game_id"]) && $_GET["game_id"]==$ram_app_id)
{
    $website=5; //Рамблер
}
else if(isset($_GET["application_id"]) && $_GET["application_id"]==$rbk_app_id)
{
    $website=6; //РБК
}
else if(isset($_GET["status"]) && ($_GET["status"]==0 || $_GET["status"]==1))
{
    $website=7; //games@gmail.ru
    $gm_unreg=true;
}
else if(isset($_GET["appid"]) && $_GET["appid"]==$gm_app_id)
{
    $website=7; //games@gmail.ru
}
else
{
	echo 'Wrong website';
	die();
}


if($website==1)
{
    $soc_id = $_GET["viewer_id"];
    $auth_key = $_GET["auth_key"];            
}

if($website==2)
{
    $soc_id = $_GET["logged_user_id"];
    $auth_key = $_GET["auth_sig"];
    $session_key = $_GET["session_key"];
}

if($website==3)
{
    $soc_id = $_GET["vid"];
    $auth_key = $_GET["authentication_key"];
}


if($website==4)
{
    $soc_id = $_GET["viewerId"];
    $auth_key = $_GET["authKey"];
}

if($website==5)
{
    $soc_id = $_GET["user_id"];
    $auth_key = $_GET["sig"];
}

if($website==6)
{
    $soc_id = $_GET["logged_user_id"];    
    $auth_key = $_GET["auth_sig"];
    $session_key = $_GET["session_key"];
} 

if($website==7 && !$gm_unreg)
{
    $soc_id = $_GET["uid"];    
    $auth_key = $_GET["sign"];
} 


//Получение параметров из запроса. Тут можно брать рефералов и прочее
if($website==1)
{
    $soc_id =  $_GET["viewer_id"];
    $auth_key =  $_GET["auth_key"];            
}

if($website==2)
{
    $soc_id = $_GET["logged_user_id"];
    $auth_key = $_GET["auth_sig"];
    $session_key = $_GET["session_key"];
}

if($website==3)
{
    $soc_id = $_GET["vid"];
    $auth_key = $_GET["authentication_key"];
}


if($website==4)
{
    $soc_id = $_GET["viewerId"];
    $auth_key = $_GET["authKey"];
}

if($website==5)
{
    $soc_id = $_GET["user_id"];
    $auth_key = $_GET["sig"];
}

if($website==6)
{
    $soc_id = $_GET["logged_user_id"];    
    $auth_key = $_GET["auth_sig"];
    $session_key = $_GET["session_key"];
}  



if($website==1)
{
    if (md5($vk_app_id."_".$soc_id."_".$vk_pay_key) != $auth_key)
    {
    	echo 'Wrong auth_key';
    	die();
    }            
}
else if($website==2)
{
    if (md5($soc_id.$session_key.$ok_pay_key) != $auth_key)
    {
    	echo 'Wrong auth_key';
    	die();
    }           
}
else if($website==3)
{
    if (md5($mm_app_id."_".$soc_id."_".$mm_pay_key) != $auth_key)
    {
    	echo 'Wrong auth_key';
    	die();
    } 
}
else if($website==4)
{
    if (md5($fs_app_id."_".$soc_id."_".$fs_pay_key) != $auth_key)
    {
    	echo 'Wrong auth_key';
    	die();
    } 
}
else if($website==5)
{
    if (md5("game_id=".$ram_app_id."&slug=".$_GET["slug"]."&timestamp=".$_GET["timestamp"]."&user_id=".$soc_id."&".$ram_pay_key) != $auth_key)
    {
    	echo 'Wrong auth_key';
    	die();
    } 
}
else if($website==6)
{
    if (md5($soc_id.$session_key.$rbk_pay_key) != $auth_key)
    {
    	echo 'Wrong auth_key';
    	die();
    } 
}
else if($website==7 && !$gm_unreg)
{
    if (md5('appid='.$gm_app_id.'uid='.$soc_id.$gm_pay_key) != $auth_key)
    {
     echo 'Wrong auth_key';
     die();
    } 
}

// Создаем страницу с кнопкой авторизации/регистрации
if($website==7 && $gm_unreg)
{
    header('Location: ./gm.php');
    die();
}


// Теперь у вас есть 2 переменные:
echo 'website='.$website; //Айди площадки, необходимо для JS и для работы с БД
echo '<br>';
echo 'soc_id='.$soc_id; //Айди игрока на площадки. Не путать с айди игрока в базе.
echo '<br>';

//soc_id - это строка. Не делайте его числом. !!!!!!!


//Далее сделайте проверку на наличие в БД, если нет то добавьте, если да, то выведите информацию об игроке


// Для Мой мир на клиенте необходим клиентский ключ, для моб. оков - клиентский ключ и айди. а для фотостраны клиентский ключ и букввенный айди


// Для мобильной версии
echo 'mobile='.$mobile;
echo '<br>';

if($website==2)
{
    echo 'ok_client_key='.$ok_client_key;
    echo 'ok_app_id='.$ok_app_id;
}
if($website==3)
{
	echo 'mm_client_key='.$mm_client_key;
}
if($website==4)
{
	echo 'fs_client_key='.$fs_client_key;
	echo 'fs_app_id='.$fs_app_id;
}
if($website==7)
{
    echo 'gm_app_id='.$gm_app_id;
}
echo '<br><br>';

echo '<script type="text/javascript" src=js/pplib.min.js></script>';

?>
<button onclick="InviteBox()">Invite</button>
<button onclick="BuyItem(10001)">BuyItem 7 rub</button>
<button onclick="BuyItem(10002)">BuyItem 70 rub</button>
<button onclick="WallPost()">WallPost</button>
<div id="data"></div>
<script>

var website = <?php echo $website; ?>;
var soc_id = '<?php echo $soc_id; ?>';

var gm_app_id  = '<?php echo $gm_app_id; ?>';
var fs_app_id  = '<?php echo $fs_app_id; ?>';

var mm_client_key  = '<?php echo $mm_client_key; ?>';
var fs_client_key  = '<?php echo $fs_client_key; ?>';

var url_game = '<?php echo $game_path; ?>';

var debug_pplib=true;

if(website==1)
{
  // vk.com: {test_mode:1} для отключенного приложения. Лучше включить сразу
  PPLIB.init(1, {}, debug_pplib, Init);
}
else if(website==2)
{
    //OK
    PPLIB.init(2, {}, debug_pplib, Init);
}
else if(website==3)
{
  // my.mail.ru: mm_client_key - клиентский ключ из настроек
  PPLIB.init(3, {client_key: mm_client_key}, debug_pplib, Init);
}
else if(website==4)
{
  // fotostrana.ru: fs_client_key - клиентский ключ из настроек
  // fs_api_id: - буквенный идентификатор приложения
  PPLIB.init(4, {client_key: fs_client_key, api_id: fs_app_id}, debug_pplib, Init);
}
else if(website==5)
{
  // Rambler: {test_mode:1} для приложения в sandbox.games.rambler.ru. Т.е. до релиза
  PPLIB.init(5, {test_mode:1}, debug_pplib, Init);
}
else if(website==6)
{
  // RBK
  PPLIB.init(6, {}, debug_pplib, Init);
}
else if(website==7)
{
    // games@mail.ru: gm_app_id - айди
    PPLIB.init(7, {api_id: gm_app_id}, debug_pplib, Init);
}


//Инициализация
function Init()
{
    //Информация о текущем пользователи. Картинки максимально приближенный к ВК
    PPLIB.api('pp.getCurrentUser', {}, function(data) { 
        console.log(data);
        var tmp='';
        for(var item in data)
        {
            tmp+=item+' : '+data[item]+'<br>';
        }
        document.getElementById('data').innerHTML += tmp;
    });

    PPLIB.api('pp.getAppFriends', {}, function(data) { 
        PPLIB.api('pp.getProfiles', { user_ids: data.slice(0, 50).toString()}, function(data) { 
            console.log(data);
            var tmp='';
            for(var item in data)
            {
                tmp+=data[item].first_name+' '+data[item].last_name+'<br>';
            }
            document.getElementById('data').innerHTML += tmp;
        })
    });

}

function InviteBox()
{
   // текст отобразится в мой мир и ОК
   PPLIB.callMethod('pp.showInviteBox', 'Заходите в мою игру');
}

function BuyItem(item)
{

   // ОБЯЗАТЕЛЬНО закрывайте полноэкранный режим до вызова pp.buyItem
   // в разных соц сетях используются не все параметры, но лучше задать их все 
  var price_rub=7; // стоимость в рублях
  if(item==10002)
  {
    price_rub=70;
  }
  var price_arr=PPLIB.convPrice(price_rub); //массив [число для вызова в платежном скрипте, число для отображения на кнопке покупка, название валюты площадки с учетом числительного]
  alert(price_arr[1]+' '+price_arr[2]+' = '+price_rub+'RUB');

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

  PPLIB.callMethod('pp.buyItem', 
  { 
    item: item, //10001 //лучше везде использовать целые числа
    title: 'Название предмета', // нужно для некоторых площадок
    description: 'Описание предмета', // нужно для некоторых площадок
    price: price_arr[0], // либо число вручную либо результат PPLIB.convPrice(rub_price)[0] //стоимость предмета 70 рублей
    img: url_game+'img/1.png' // картинка нужна для некоторых площадок
  });
}

function WallPost()
{
    var text='Hello';
    var photo=url_game+'img/1.png';
    var link='https://yandex.ru/';

    if(PPLIB.website==1)
    {
        photo='photo5057680_456243372'; //формат фото для ВК
    }
    if(PPLIB.website==2)
    {
        photo='864456041161'; //айди фото для ОК
    }


    PPLIB.callMethod('pp.post', text, photo, link)
}



</script>

