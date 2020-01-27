<?php

//Заголовки
header("Content-Type: text/html; charset=UTF-8");

//Подключим конфиг
require_once("config.php");

?>

<!DOCTYPE html>
<html>
<head>
	<style>

	</style>
</head>

<body>
<button id="play_but">Играть</button>
</body>





<script type="text/javascript" src="js/pplib.min.js" charset="utf-8"></script>

<script>

var debug_pplib=true;
var gm_api_id  = '<?php echo $gm_app_id; ?>';

PPLIB.init(7, {api_id: gm_api_id}, debug_pplib, function(data) { 
	console.log(data);
	if(data==0)
    {
    	play_but.onclick=function () { externalApi.authUser(); };
    }
	if(data==1)
    {
    	play_but.onclick=function () { externalApi.registerUser(); };
    }
	if(data==2)
    {
		window.top.location.href = 'https://games.mail.ru/app/'+PPLIB.api_id;
    }
});



</script>

</html>