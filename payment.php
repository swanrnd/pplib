<?php  

// $file = "/var/www/html/test-api/logs.txt";
// file_put_contents($file, '(((444');


// функция получения информации о предмете. Адаптируйте ее!! 
function getItem($item_id, $website) //возвращает массив с индексами: 0 - стоимость в рублях, 1 - стоимость в валюте площадке, 2 - название, 3 - иконка (ссылка)
{
    global $game_path;
    //Если такой товар есть, то получаем из БД или массива
    if (true) {
        $price=7; //RUB
        if($item_id==10002)
        {
            $price=70;
        }
        $name='Товар'; //название
        $img=$game_path.'img/1.png'; //Картинка
        $price_arr=getPrice($price, $website);
        //Говорим что именно хотим купить
        return array($price_arr[0],  $price_arr[1], $name, $img);
    }   
    else
    {
        return array(-1, -1, 'NULL', 'NULL');
    }
}


function getPrice($price, $website)
{
    if($website==1)
    {
        return array($price, $price/7);
    }
    if($website==2)
    {
        return array($price, $price);
    }
    if($website==3)
    {
        return array($price, $price);
    }
    if($website==4)
    {
        return array($price, $price*6);
    }
    if($website==5)
    {
        return array($price, $price);
    }
    if($website==7)
    {
        return array($price, $price);
    }
    return array($price, $price);
}

function error($error_code, $website) // функция ошибок
{
    if($website==1 || $website==5)
    {
        if($error_code==1)
        {
            echo "{\"error\": {\"error_code\": 1, \"error_msg\": \"Неверное приложение\", \"critical\": 1}}";
        }
        if($error_code==2)
        {
            echo "{\"error\": {\"error_code\": 2, \"error_msg\": \"Временная ошибка базы данных\", \"critical\": 0}}";
        }
        if($error_code==10)
        {
            echo "{\"error\": {\"error_code\": 10, \"error_msg\": \"Несовпадение вычисленной и переданной подписи\", \"critical\": 1}}";
        }
        if($error_code==20)
        {
            echo "{\"error\": {\"error_code\": 20, \"error_msg\": \"Товара не существует\", \"critical\": 1}}";
        }
        if($error_code==22)
        {
            echo "{\"error\": {\"error_code\": 22, \"error_msg\": \"Пользователя не существует\", \"critical\": 1}}";
        }            
    }
    if($website==2)
    {            
        if($error_code==1)
        {
            header("Invocation-error: 1"); 
            echo ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            echo ("<ns2:error_response xmlns:ns2='http://api.forticom.com/1.0/'>");
            echo ("<error_code>1</error_code>");
            echo ("<error_msg>UNKNOWN: please, try again later. If error repeats, contact application support team.</error_msg>");
            echo ("</ns2:error_response>");
        }
        if($error_code==2)
        {
            header("Invocation-error: 2"); 
            echo ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            echo ("<ns2:error_response xmlns:ns2='http://api.forticom.com/1.0/'>");
            echo ("<error_code>2</error_code>");
            echo ("<error_msg>SERVICE: service temporary unavailible. Please try again later.</error_msg>");
            echo ("</ns2:error_response>");
        }
        if($error_code==10)
        {
            header("Invocation-error: 104"); 
            echo ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            echo ("<ns2:error_response xmlns:ns2='http://api.forticom.com/1.0/'>");
            echo ("<error_code>104</error_code>");
            echo ("<error_msg>PARAM_SIGNATURE: invalid signature. Please contact application support team.</error_msg>");
            echo ("</ns2:error_response>");
        }
        if($error_code==20)
        {
            header("Invocation-error: 3"); 
            echo ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            echo ("<ns2:error_response xmlns:ns2='http://api.forticom.com/1.0/'>");
            echo ("<error_code>3</error_code>");
            echo ("<error_msg>CALLBACK_INVALID_PAYMENT: invalid payment data. Please try again later. If error repeats, contact application support team.</error_msg>");
            echo ("</ns2:error_response>");
        }
        if($error_code==22)
        {
            header("Invocation-error: 9999"); 
            echo ("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            echo ("<ns2:error_response xmlns:ns2='http://api.forticom.com/1.0/'>");
            echo ("<error_code>9999</error_code>");
            echo ("<error_msg>SYSTEM: critical system error. Please contact application support team.</error_msg>");
            echo ("</ns2:error_response>");
        }            
    }       
    if($website==3)
    {
        if($error_code==1)
        {
            echo "{\"status\": 2, \"error_code\": 700}";
        }
        if($error_code==2)
        {
            echo "{\"status\": 0, \"error_code\": 700}";
        }
        if($error_code==10)
        {
            echo "{\"status\": 2, \"error_code\": 700}";
        }
        if($error_code==20)
        {
            echo "{\"status\": 2, \"error_code\": 703}";
        }
        if($error_code==22)
        {
            echo "{\"status\": 2, \"error_code\": 701}";
        }               
    }
    if($website==4)
    {
        if($error_code==1)
        {
            echo "{\"result\": 0, \"isTemp\": 0}";
        }
        if($error_code==2)
        {
            echo "{\"result\": 0, \"isTemp\": 1}";
        }
        if($error_code==10)
        {
           echo "{\"result\": 0, \"isTemp\": 0}";
        }
        if($error_code==20)
        {
            echo "{\"result\": 0, \"isTemp\": 0}";
        }
        if($error_code==22)
        {
            echo "{\"result\": 0, \"isTemp\": 0}";
        }            
    }
    if($website==7)
    {
         echo "{\"error\": "+$error_code+"}";
    }
}



ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


//Конфигурационный файл с ключами и айди приложений
require_once('config.php');

$website=-1;

$notification_type='order_status_change';



if(isset($_POST["app_id"]) && $_POST["app_id"]==$vk_app_id)   
{
    $website=1;
}  
else if(isset($_GET["mailiki_price"]))   
{
    $website=3;
}
else if(isset($_GET["product_code"]))   
{
    $website=2;
}
else if(isset($_POST["appUid"]))   
{
    $website=4;
}  
else if(isset($_GET["app_id"]) && $_GET["app_id"]==$ram_app_id)   
{
    $website=5;
} 
else if(isset($_GET["tid"]))   
{
    $website=7;
} 
else
{
    $website=0;
}


if($website==0)
{    
    //Работа с Xsolla
    die();
}
else if($website==1) //vk.com
{                
    header("Content-Type: application/json; encoding=utf-8"); 
    $input=$_POST;
    $pay_key=$vk_pay_key;

    $receiver_id=$input['receiver_id'];
    $notification_type=$input['notification_type'];

}
else if($website==2) //ok.ru
{
    header("Content-Type: application/xml; encoding=utf-8"); 
    $input=$_GET;

    $receiver_id=$input['uid'];
    $pay_key=$ok_pay_key;
}
else if($website==3) //my.mail.ru
{
    header("Content-Type: application/json; encoding=utf-8"); 
    $input=$_GET;

    $receiver_id=$input['uid'];
    $pay_key=$mm_pay_key;
}
else if($website==4) //fotostrana
{ 
    header("Content-Type: application/json; encoding=utf-8"); 
    $input=$_POST;

    $receiver_id=$input['receiverId'];
    $pay_key=$fs_pay_key;
}
else if($website==5) //rambler
{
    header("Content-Type: application/json; encoding=utf-8"); 
    $input=$_GET;

    $receiver_id=$input['receiver_id'];
    $pay_key=$ram_pay_key;

    $notification_type=$input['notification_type'];
}
else if($website==7) //games@mail.ru
{
    header("Content-Type: application/json; encoding=utf-8"); 
    $input=$_GET;

    $receiver_id=$input['uid'];
    $pay_key=$gm_pay_key;
}
else
{                
    header('HTTP/1.0 401 Unauthorized');
    die();
}


// Параметр с подписью
$sig_name='sig';
if($website==7)
{
    $sig_name='sign';
}




//Собираем sig и сравниваем с переданной
$sig = $input[$sig_name]; 
unset($input[$sig_name]); 
ksort($input); 
$sig_source = ''; 
foreach ($input as $k => $v) { 
  $sig_source .= $k.'='.$v; 
  if($website==5) //У рамблера доп разделитель
  {
    $sig_source.='&';
  }
} 

$sig_source.=$pay_key; //добавляем платежный ключ

if ($sig != md5($sig_source)) { 
    error(10, $website);
    die();
}




if($website==1 || $website==5) //вывести информацию об предмете на этих 2-х площадках
{
    if($notification_type=='get_item' || $notification_type=='get_item_test')
    {
        $item_id = $input['item']; 

        $item_info=getItem($item_id, $website);

        if($website==1) //VK
        {
            echo '{"response":{"title":"'.$item_info[2].'", "photo_url":"'.$item_info[3].'", "item_id": '.$item_id.', "price":'.$item_info[1].'}}';
            // Вы можете добавать параметр "expiration":3600 и выше для кеширования
        }
        else if($website==5) //Rambler
        {
            echo '{"response":{"title":"'.$item_info[2].'", "photo_url":"'.$item_info[3].'", "price":'.$item_info[1].'}}';
        } 
        die();
    }
}



//Проверяем транзакцию в БД
if($website==0)
{    
    //Работа с Xsolla
    die();
}
else if($website==1) //vk.com
{                
    $order_id=$input['order_id'];
}
else if($website==2) //ok.ru
{
    $order_id=$input['transaction_id'];
}
else if($website==3) //my.mail.ru
{
    $order_id=$input['transaction_id'];
}
else if($website==4) //fotostrana
{ 
    $order_id=$input['transactionId'];
}
else if($website==5) //rambler
{
    $order_id=$input['order_id'];
}
else if($website==7) //games@gmail.ru
{
    $order_id=$input['tid'];
}
else
{                
    header('HTTP/1.0 401 Unauthorized');
    die();
}


$in_base=false; 
$app_order_id=0;


//!!!!!!
//ОБЯЗАТЕЛЬ проверяем есть ли в базе этот order_id.
// Проверяем order_id с соответсвующим website. Могут совпадать на разных площадках.
// Если есть, то in_base=true, app_order_id - айди в вашей БД
//!!!!!!

if($in_base)
{
    if($website==1)
    {
        echo '{"response":{"order_id":'.$order_id.', "app_order_id":'.$app_order_id.'}}';        
    }
    if($website==2)
    {
        echo '<?xml version="1.0" encoding="UTF-8"?>';
        echo '<callbacks_payment_response xmlns="http://api.forticom.com/1.0/">true</callbacks_payment_response>';     
    }   
    if($website==3)
    {
        echo '{"status":1}';     
    }
    if($website==4)
    {
        echo '{"result": 1, "transactionId":'.$app_order_id.'}';     
    }
    if($website==5)
    {
        echo '{"response":{"order_id":'.$order_id.'}}';    
    }
    die();
}




//Получаем предмет и проверяем стоимость
if($website==0)
{    
    //Работа с Xsolla
    die();
}
else if($website==1) //vk.com
{                
    $item_id = $input['item_id']; 
    $item_price=$input['item_price'];

}
else if($website==2) //ok.ru
{
    $item_id = $input['product_code']; 
    $item_price=$input['amount'];
}
else if($website==3) //my.mail.ru
{
    $item_id = $input['service_id']; 
    $item_price=$input['mailiki_price'];
}
else if($website==4) //fotostrana
{ 
    $item_id = $input['itemId']; 
    $item_price=$input['priceFmCents'];
}
else if($website==5) //rambler
{
    $item_id = $input['item']; 
    $item_price=$input['item_price'];
}
else if($website==7) //games@gmail.ru
{
    $json_data=json_decode(urldecode($input['merchant_param']), true);
    $item_id = $json_data['item_id']; 
    $item_price=$input['sum'];
}
else
{                
    header('HTTP/1.0 401 Unauthorized');
    die();
}




// 0 - стоимость в рублях, 1 - стоимость в валюте площадке, 2 - название, 3 - иконка (ссылка)
$item_info=getItem($item_id, $website);


if($item_price!=$item_info[1])
{
    //Ошибка платежа
    error(20, $website);
    die();
}


//!!!!!!
//Начисляем валюту игроку $receiver_id и $website
//!!!!!!


if($website==1)
{
    echo '{"response":{"order_id":'.$order_id.', "app_order_id":'.$app_order_id.'}}';        
}
if($website==2)
{
    echo '<?xml version="1.0" encoding="UTF-8"?>';
    echo '<callbacks_payment_response xmlns="http://api.forticom.com/1.0/">true</callbacks_payment_response>';     
}   
if($website==3)
{
    echo '{"status":1}';     
}
if($website==4)
{
    echo '{"result": 1, "transactionId":'.$app_order_id.'}';     
}
if($website==5)
{
    echo '{"response":{"order_id":'.$order_id.'}}';    
}
if($website==7)
{
    echo '{"status":"ok"}';    
}

// расскоментируйте для тестирования вывода
// $file = 'logs.txt';
// file_put_contents($file, $item_id.' '.$item_info[1]);




?>