var PPLIB={};


//Settings 
PPLIB.vk_version='5.74';


//System
PPLIB.sys={};
PPLIB.sys.info=function(text, error) { 
	if(error || PPLIB.debug)
	{
		if(error)
		{
			console.log('%c '+text, 'color: #ff0000');
		}
		else
		{
			console.log('%c '+text, 'color: #0000ff');
		}
		
	}	
};


PPLIB.sys.lexNum=function(num, lang_key) {
	var tmp_lang={};
	
	tmp_lang['5_votes']='голосов';
	tmp_lang['2_votes']='голоса';
	tmp_lang['1_votes']='голос';

	tmp_lang['5_ok'] = 'ОК';
	tmp_lang['2_ok'] = 'ОК';
	tmp_lang['1_ok'] = 'ОК';

	tmp_lang['5_malic'] = 'мэйликов';
	tmp_lang['2_malic'] = 'мэйлика';
	tmp_lang['1_malic'] = 'мэйлик';

	tmp_lang['5_fm'] = 'ФМ';
	tmp_lang['2_fm'] = 'ФМ';
	tmp_lang['1_fm'] = 'ФМ';

	tmp_lang['5_rub'] = 'рублей';
	tmp_lang['2_rub'] = 'рубля';
	tmp_lang['1_rub'] = 'рубль';


	tmp_lang['5_coins'] = 'монет';
	tmp_lang['2_coins'] = 'монеты';
	tmp_lang['1_coins'] = 'монету';

	
    if ((num % 100 < 5) || (num % 100 > 20)) {
        if (num % 10 == 1) {
            return tmp_lang['1_' + lang_key];
        } else if (num % 10 < 5 && num % 10 != 0) {
            return tmp_lang['2_' + lang_key];
        } else {
            return tmp_lang['5_' + lang_key];
        }
    } else {
        return tmp_lang['5_' + lang_key];
    }
}


PPLIB.convPrice=function(price_rub)
{
	if(PPLIB.website==1)
	{
		return [Math.ceil((1.0*price_rub)/7), Math.ceil((1.0*price_rub)/7), PPLIB.sys.lexNum(Math.ceil((1.0*price_rub)/7),'votes')];
	}
	if(PPLIB.website==2)
	{
		return [price_rub, price_rub, PPLIB.sys.lexNum(price_rub,'ok')];
	}
	if(PPLIB.website==3)
	{
		return [price_rub, price_rub, PPLIB.sys.lexNum(price_rub,'malic')];
	}
	if(PPLIB.website==4)
	{
		return [price_rub*6, price_rub*0.06, PPLIB.sys.lexNum(price_rub*0.06,'fm')];
	}
	if(PPLIB.website==5)
	{
		return [price_rub, price_rub, PPLIB.sys.lexNum(price_rub,'rub')];
	}
	if(PPLIB.website==6)
	{
		return [price_rub, price_rub, PPLIB.sys.lexNum(price_rub,'coins')];
	}
	if(PPLIB.website==7)
	{
		return [price_rub, price_rub, PPLIB.sys.lexNum(price_rub,'rub')];
	}
};


PPLIB.getGameLink=function()
{
	if(PPLIB.website==1)
	{
		return 'https://vk.com/app'+PPLIB.sys.getJsonFromUrl()['api_id'];
	}
	if(PPLIB.website==2)
	{
		return 'https://ok.ru/game/'+PPLIB.sys.getJsonFromUrl()['apiconnection'].split('_')[0];
	}
	if(PPLIB.website==3)
	{
		return 'https://my.mail.ru/apps/'+PPLIB.sys.getJsonFromUrl()['app_id'];
	}
	if(PPLIB.website==4)
	{
		return 'https://fotostrana.ru/app/'+PPLIB.sys.getJsonFromUrl()['apiId'];
	}
	if(PPLIB.website==5)
	{
		return 'https://games.rambler.ru/online/'+PPLIB.sys.getJsonFromUrl()['slug'];
	}
	if(PPLIB.website==6)
	{
		return '';
	}
	if(PPLIB.website==7)
	{
		return 'https://games.mail.ru/app/'+PPLIB.api_id;
	}
};


PPLIB.sys.getJsonFromUrl=function()
{
	var query = location.search.substr(1);
    var result = {};
    query.split('&').forEach(function(part) {
        var item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
};

PPLIB.sys.formatDate=function(inputDate) {
	if(inputDate==null)
	{
		return undefined;
	}
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate()+ '.' + (date.getMonth() + 1) +  '.' + date.getFullYear();
    }
    return undefined;
};

PPLIB.sys.formatSex=function(inputSex) {
	var resultSex=0;
	if(PPLIB.website==1)
	{
		if(inputSex==1)
		{
			resultSex=2;
		}
		if(inputSex==2)
		{
			resultSex=1;
		}		
	}
	if(PPLIB.website==2 || PPLIB.website==7)
	{
		if(inputSex=='male')
		{
			resultSex=1;
		}
		if(inputSex=='female')
		{
			resultSex=2;
		}		
	}
	if(PPLIB.website==3)
	{
		if(inputSex==0)
		{
			resultSex=1;
		}
		if(inputSex==1)
		{
			resultSex=2;
		}		
	}	
	if(PPLIB.website==4)
	{
		if(inputSex=='m')
		{
			resultSex=1;
		}
		if(inputSex=='w')
		{
			resultSex=2;
		}		
	}	
	return resultSex;
};


PPLIB.sys.convCurUserInfo=function(user_data)
{
    var new_user_data={};

    //BDATE
    if(PPLIB.website==1)
    {
    	new_user_data.bdate=user_data.bdate;
    }
    if(PPLIB.website==2 || PPLIB.website==4)
    {
    	new_user_data.bdate=PPLIB.sys.formatDate(user_data.birthday);
    }   
    if(PPLIB.website==3)
    {
    	new_user_data.bdate=user_data.birthday;
    }

    //SEX
    if(PPLIB.website==1 || PPLIB.website==3 || PPLIB.website==4)
    {
    	new_user_data.sex=PPLIB.sys.formatSex(user_data.sex);
    }    
    if(PPLIB.website==2)
    {
    	new_user_data.sex=PPLIB.sys.formatSex(user_data.gender);
    }
    if(PPLIB.website==7)
    {
    	new_user_data.sex=PPLIB.sys.formatSex(user_data.sex);
    }

    //NAME
    if(PPLIB.website==1 || PPLIB.website==2 || PPLIB.website==3)
    {
    	new_user_data.first_name=user_data.first_name;
    	new_user_data.last_name=user_data.last_name;
    }
    if(PPLIB.website==4)
    {
    	new_user_data.first_name=user_data.user_name;
    	new_user_data.last_name=user_data.user_lastname;    	 
    }

    if(PPLIB.website==7)
    {
    	new_user_data.first_name=user_data.nick;
    	new_user_data.last_name='';  	 
    }

    //IMG
    if(PPLIB.website==1)
    {
    	new_user_data.photo_mini=user_data.photo_50;
    	new_user_data.photo_small=user_data.photo_100;
    	new_user_data.photo_big=user_data.photo_200;
    	new_user_data.photo_max=user_data.photo_max_orig;
    }    
    if(PPLIB.website==2)
    {
    	new_user_data.photo_mini=user_data.pic50x50;
    	new_user_data.photo_small=user_data.pic128x128;
    	new_user_data.photo_big=user_data.pic224x224;
    	new_user_data.photo_max=user_data.pic_max;
    }   
    if(PPLIB.website==3)
    {
    	new_user_data.photo_mini=user_data.pic_50;
    	new_user_data.photo_small=user_data.pic_128;
    	new_user_data.photo_big=user_data.pic_190;
    	new_user_data.photo_max=user_data.pic_big;
    }   
    if(PPLIB.website==4)
    {
    	new_user_data.photo_mini=user_data.photo_small;
    	new_user_data.photo_small=user_data.photo_97;
    	new_user_data.photo_big=user_data.photo_192;
    	new_user_data.photo_max=user_data.photo_big;
    }      
    if(PPLIB.website==7)
    {
    	new_user_data.photo_mini=user_data.avatar;	 
    	new_user_data.photo_small='';
    	new_user_data.photo_big='';
    	new_user_data.photo_max='';
    }

    if(PPLIB.website==1)
    {
    	new_user_data.uid=user_data.id.toString();
    }
    if(PPLIB.website==2 || PPLIB.website==3)
    {
    	new_user_data.uid=user_data.uid;
    }
    if(PPLIB.website==4)
    {
    	new_user_data.uid=user_data.user_id;
    }
    if(PPLIB.website==7)
    {
    	new_user_data.uid=user_data.uid;	 
    }


    for(var item in new_user_data)
    {
    	if(new_user_data[item]==null || new_user_data[item]==undefined)
    	{
    		delete new_user_data[item];
    	}    	
    }



    return new_user_data;

};

//Init
PPLIB.init=function(website, data, debug, callback) { 
	PPLIB.website=website;
	PPLIB.debug=debug;	

	if(data.test_mode==1)
	{
		PPLIB.test_mode=1;
	}
	else
	{
		PPLIB.test_mode=0;
	}

	if(data.mobile==1)
	{
		PPLIB.mobile=1;
	}
	else
	{
		PPLIB.mobile=0;
	}
	
	var n = document.createElement('script');
	if(PPLIB.website==1)
	{
        n.src = '//vk.com/js/api/xd_connection.js?2';
    }
    else if(PPLIB.website==2)
	{
		PPLIB.soc_id=PPLIB.sys.getJsonFromUrl().logged_user_id;
        
        if(PPLIB.mobile==1)
        {        	
        	if(data.client_key!==undefined &&  data.api_id!==undefined )
			{
				PPLIB.client_key=data.client_key;
				PPLIB.api_id=data.api_id;
			}
			else
			{
				PPLIB.sys.info('ERROR: client_key or api_id is empty', 1);	
				return;
			}

			if(PPLIB.ok_lib_url===undefined)
			{
				PPLIB.sys.info('ERROR: ok_lib_url is empty', 1);	
				return;
			}

			n.src = PPLIB.ok_lib_url;
        }
        else
        {
        	n.src = '//api.ok.ru/js/fapi5.js';
        }
    }
    else if(PPLIB.website==3)
	{
		if(data.client_key!==undefined)
		{
			PPLIB.client_key=data.client_key;
		}
		else
		{
			PPLIB.sys.info('ERROR: client_key is empty', 1);	
			return;
		}
        n.src = '//connect.mail.ru/js/loader.js';
    }
    else if(PPLIB.website==4)
    {
    	PPLIB.soc_id=PPLIB.sys.getJsonFromUrl().viewerId;

		if(data.client_key!==undefined &&  data.api_id!==undefined )
		{
			PPLIB.client_key=data.client_key;
			PPLIB.api_id=data.api_id;
		}
		else
		{
			PPLIB.sys.info('ERROR: client_key or api_id is empty', 1);	
			return;
		}

    	n.src = PPLIB.sys.getJsonFromUrl().fsapi;    	
    }
    else if(PPLIB.website==5)
    {
    	if(PPLIB.test_mode==1)
    	{
    		n.src = '//sandbox.games.rambler.ru/assets/ext/rgames.js';
    	}
    	else
    	{
    		n.src = '//games.rambler.ru/assets/ext/rgames.js';
    	}    	
    }
    else if(PPLIB.website==6)
    {
    	n.src = PPLIB.sys.getJsonFromUrl().api_server+'/bundles/gamesiteapi/js/gsapi.js';
    }
    else if(PPLIB.website==7)
    {
    	if(data.api_id!==undefined )
    	{
    		PPLIB.api_id=data.api_id;
    	}
    	else
    	{
    		PPLIB.sys.info('ERROR: api_id is empty', 1);	
    		return;
    	}
    	n.src = '//games.mail.ru/app/'+PPLIB.api_id+'/static/mailru.core.js';
    }
    document.body.appendChild(n);
    n.onerror = function() {
    	PPLIB.sys.info('ERROR: Platform lib does not loaded', 1);
    };
    n.onload = function() {
    	PPLIB.sys.info('GOOD: Platform lib loaded', 0);
    	if(PPLIB.website==1)
    	{
			window.VK.init(function() 
			{ 
		    	PPLIB.sys.info('GOOD: VK API initialization successed', 0);
		    	PPLIB.sys.callback.genVK();
		    	callback();		     
		  	}, 
		  	function() 
		  	{ 
		  		PPLIB.sys.info('ERROR: VK API initialization failed ', 1);
			}, 
			PPLIB.vk_version);
		}
		else if(PPLIB.website==2)
		{			
			if(PPLIB.mobile==1)
			{
				var config = {
				    app_id: data.api_id,
				    app_key: data.client_key
				};
				window.OKSDK.init(config, function () {
				    PPLIB.sys.info('GOOD: OK API initialization successed', 0);
				    callback();
				}, function (error) {
				    PPLIB.sys.info('ERROR: OK API initialization failed ', 1);
				});
			}
			else
			{
				var rParams = window.FAPI.Util.getRequestParameters();
				window.FAPI.init(rParams.api_server, rParams.apiconnection,
			          function() 
			          {
				    	  PPLIB.sys.info('GOOD: OK API initialization successed', 0);
				    	  callback();
			          },
			          function(error) {
		  				  PPLIB.sys.info('ERROR: OK API initialization failed ', 1);
			          }
				);
			}
		}
		else if(PPLIB.website==3)
		{
			window.mailru.loader.require('api', function() {
	            window.mailru.app.init(PPLIB.client_key);
	            PPLIB.sys.callback.genMail();
	            callback();
	        });
		}
		else if(PPLIB.website==4)
		{
		   window.client = new fsapi(PPLIB.api_id, PPLIB.client_key);
		   window.client.init(function() {PPLIB.sys.info('ERROR: FS API initialization failed ', 1) ;});
		   callback();
		}
		else if(PPLIB.website==5)
		{
			PPLIB.sys.callback.genRam();
			window.rgames.init();
			callback();
		}	
		else if(PPLIB.website==6)
		{
			callback();
		}		
		else if(PPLIB.website==7)
		{
			(function apiHandshake(iframeApi) {
		        window.externalApi = null;

		        console.log(5555);

		        var callbacks = {
		            appid: PPLIB.api_id,
		            getLoginStatusCallback: function (status){
		                var el = document.getElementById('status');
		                if (status.status != 'ok'){
		                    PPLIB.sys.info('ERROR STATUS:');
		                    PPLIB.sys.info(status);
		                } else {
		                	callback(status.loginStatus);
		                }
		            },
		            userInfoCallback: function(info){
		            	console.log(1);
		               // addLog('userInfo', info);
		            },
		            userProfileCallback: function(profile) {
		            	console.log(1111);
		            	API_callback('pp.userProfile', profile);
		            },
		            userFriendsCallback: function(friends) {
		            	API_callback('pp.userFriends', friends);
		            },
		            registerUserCallback: function(status){
		            	externalApi.reloadWindow();
		                // window.top.location.href = 'https://games.mail.ru/app/'+PPLIB.api_id;

		            },
		            paymentReceivedCallback: function(data){
		            	console.log(2);
		                API_callback('paymentReceivedCallback', data);
		            }
		        };

		        function error(err) {
		            throw new Error('Could not init external api ' + err);
		        }

		        function connected(api){
		            externalApi = api;
		            externalApi.getLoginStatus();
		        }

		        iframeApi(callbacks).then(connected, error);
		    }(window.iframeApi));
		}
	};
};




PPLIB.callMethod=function(method, param1, param2, param3, param4, param5, param6, param7, param8, param9)
{
	if(method=='pp.showSettingsPhoto') 
	{
		if(PPLIB.website==1)
		{
			window.VK.callMethod("showSettingsBox", 4);
		}
		else if(PPLIB.website==2)
		{
			window.FAPI.UI.showPermissions(JSON.stringify(["PHOTO_CONTENT"]));
		}
		else if(PPLIB.website==3)
		{
			window.mailru.common.users.requirePermission('photos');
		}
		else if(PPLIB.website==4)
		{
			window.client.event("appSettings", new Function('data', ' PPLIB.sys.callback.main(\'appSettings\', data) '), {"request_permission": 128});
		}
	}
	else if(method=='pp.showRequestBox') //uids (string), text(string), myRequestKey(string), img(string)
	{
		if(PPLIB.website==1)
		{
			window.VK.callMethod("showRequestBox", param1, param2, param3);
		}
		else if(PPLIB.website==2)
		{
			window.FAPI.UI.showNotification(param2, param3, param1.split(','));
		}
		else if(PPLIB.website==3)
		{
			window.mailru.app.friends.request({
			   text: param2,
			   image_url: param4,
			   friends: param1.split(','),
			   hash: param3
			});
		}	
		else if(PPLIB.website==4)
		{
			window.client.event("sendMessages", new Function('data', ' PPLIB.sys.callback.main(\'sendMessages\', data) '), {message: param2, type: 1, friendsIds: param1, params: param3, showCheckAll:1});
		}	
	}
	else if(method=='pp.showInviteBox') //text (string)
	{
		if(PPLIB.website==1)
		{
			window.VK.callMethod("showInviteBox");
		}
		else if(PPLIB.website==2)
		{
			if(PPLIB.mobile==1)
			{
				window.OKSDK.Widgets.invite(window.location);
			}
			else
			{
				window.FAPI.UI.showInvite(param1, 'invite');
			}			
		}
		else if(PPLIB.website==3)
		{
			window.mailru.app.friends.invite(param1);
		}	
		else if(PPLIB.website==4)
		{
			window.client.event("invite", new Function('data', ' PPLIB.sys.callback.main(\'invite\', data) '));
		}	
	}
	else if(method=='pp.resizeWindow') //width (int), height (int)
	{
		if(PPLIB.website==1)
		{
			window.VK.callMethod("resizeWindow", param1, param2);
		}
		else if(PPLIB.website==2)
		{
			window.FAPI.UI.setWindowSize(param1, param2);
		}
		else if(PPLIB.website==3)
		{
			window.mailru.app.utils.setHeight(param2);
		}	
		else if(PPLIB.website==4)
		{
			window.client.event("resize", new Function('data', ' PPLIB.sys.callback.main(\'resize\', data) '), {width: param1, height: param2});
		}
	}
	else if(method=='pp.scrollWindow') //top (int), speed (int)
	{
		if(PPLIB.website==1)
		{
			window.VK.callMethod("scrollWindow", param1, param2);
		}
		else if(PPLIB.website==2)
		{
			window.FAPI.UI.scrollTo(0, param1);
		}
		else if(PPLIB.website==3)
		{
			window.mailru.app.utils.scrollTo(param1);
		}	
		else if(PPLIB.website==4)
		{
			window.client.event("scrollToY", new Function('data', ' PPLIB.sys.callback.main(\'scrollToY\', data) '), {top: param1});
		}
	}
	else if(method=='pp.setTitle') //title (string)
	{
		if(PPLIB.website==1)
		{
			window.VK.callMethod("setTitle", param1);
		}
		else if(PPLIB.website==2)
		{
			//
		}
		else if(PPLIB.website==3)
		{
			window.mailru.app.utils.setTitle(param1);
		}	
		else if(PPLIB.website==4)
		{
			window.client.event("setPageTitle", new Function('data', ' PPLIB.sys.callback.main(\'setPageTitle\', data) '), {title: param1});
		}
	}
	else if(method=='pp.setLocation') //location (string)
	{
		if(PPLIB.website==1)
		{
			window.VK.callMethod("setLocation", param1);
		}
		else if(PPLIB.website==2)
		{
			//
		}
		else if(PPLIB.website==3)
		{
			window.mailru.app.utils.hash.write(param1);
		}	
		else if(PPLIB.website==4)
		{
			///
		}
	}
	else if(method=='pp.post') //text (string), photo (string), url (string)
	{
		if(PPLIB.website==1)
		{
			VK.api("wall.post", {
                message: param1,
                services: "twitter,facebook,instagram",
                attachments: param2 + ',' + param3,
                v: PPLIB.vk_version
            }, function(data) {});
		}
		else if(PPLIB.website==2)
		{
			FAPI.UI.postMediatopic({
	            "media": [{
	                    "type": "text",
	                    "text": param1
	                },
	                {
	                    "type": "photo",
	                    "list": [
	                        { "photoId": param2 }
	                    ]
	                },
	                {
	                    "type": "link",
	                    "url": param3
	                }


	            ]
	        }, true);
		}
		else if(PPLIB.website==3)
		{
			mailru.common.stream.post({ 'title': 'Сообщение', 'text': param1, 'img_url': param2, 'action_links': [{ 'text': 'Играть', 'href': param3 }] });
		}	
		else if(PPLIB.website==4)
		{
			client.event("postUserEventOnWall", null, {text: param1, imgUrl: param2, callToAction: 'Играть'});
		}
	}
	else if(method=='pp.buyItem')
	{
		if(PPLIB.website==1)
		{
		    var params = {
		        type: 'item',
		        item: param1.item
		    };
			window.VK.callMethod('showOrderBox', params);
	        // window.VK.addCallback('onOrderSuccess', function(order_id) {
	        // 	 PPLIB.sys.info('GOOD: OK', 0);
	        // });
		}
		else if (PPLIB.website == 2) {
			if(PPLIB.mobile==1)
			{
				window.OKSDK.Payment.show(param1.title, param1.price, param1.item);
			}
			else
			{
				window.FAPI.UI.showPayment(param1.title, param1.description, param1.item, param1.price, null, null, 'ok', 'true');
			}	        
	    }
		else if (PPLIB.website == 3) {
	        window.mailru.app.payments.showDialog({
	            service_id: param1.item,
	            service_name: param1.title,
	            mailiki_price: param1.price
	        });
	    }
		else if (PPLIB.website == 4) {
			var isDebug=0;
			if(PPLIB.debug)
			{
				isDebug=1;
			}
	    	window.client.event('buyItemCallback', function (data) { API_callback('buyItemCallback', data); }, {
	            itemId: param1.item, 
	            picUrl: param1.img,
	            priceFmCents: param1.price,
	            name: param1.title,
	            isDebug: isDebug
	        });
	    }
	    else if (PPLIB.website == 5) 
	    {
	        window.rgames.showOrderBox({
	            item: param1.item,
	            type: '',
	        });
	    }
	    else if(PPLIB.website == 6)
	    {
	    	var xhr = new XMLHttpRequest();
			xhr.open('GET', PPLIB.rbk_payurl, true);
			xhr.send();
			xhr.onreadystatechange = function() {
			  if (this.readyState != 4) return;
			  console.log(this.responseText);
			  // result from this.responseText or this.responseXML
			};
	    }
	    else if(PPLIB.website == 7)
	    {
	        externalApi.paymentFrame({
	          "merchant_param": {
	            "amount":  param1.price,
	            "description": param1.title,
	            "item_id": param1.item.toString()
	          }
	        });
	    }
	}
	else
	{
		if(PPLIB.website==1)
		{
			if(param1==undefined)
			{
				window.VK.callMethod(method);
			}
			else if(param2==undefined)
			{
				window.VK.callMethod(method, param1);
			}
			else if(param3==undefined)
			{
				window.VK.callMethod(method, param1, param2);
			}
			else if(param4==undefined)
			{
				window.VK.callMethod(method, param1, param2, param3);
			}
			else if(param5==undefined)
			{
				window.VK.callMethod(method, param1, param2, param3, param4);
			}
			else if(param6==undefined)
			{
				window.VK.callMethod(method, param1, param2, param3, param4, param5);
			}			
		}
		else if(PPLIB.website==2)
		{
			if(param1==undefined)
			{
				window.FAPI.UI[method]();
			}
			else if(param2==undefined)
			{
				window.FAPI.UI[method](param1);
			}
			else if(param3==undefined)
			{
				window.FAPI.UI[method](param1, param2);
			}
			else if(param4==undefined)
			{
				window.FAPI.UI[method](param1, param2, param3);
			}
			else if(param5==undefined)
			{
				window.FAPI.UI[method](param1, param2, param3, param4);
			}
			else if(param6==undefined)
			{
				window.FAPI.UI[method](param1, param2, param3, param4, param5);
			}
		}
		else if(PPLIB.website==3)
		{
			var tmp_method=method.split('.');
			var tmp_mailru=window.mailru[tmp_method[1]][tmp_method[2]][tmp_method[3]];

			var tmp_callback=function(){};
			if(param1==undefined)
			{
				tmp_mailru(tmp_callback);
			}
			if(param2==undefined)
			{
				tmp_mailru(tmp_callback, param1);
			}
			if(param3==undefined)
			{
				tmp_mailru(tmp_callback, param1, param2);
			}
			if(param4==undefined)
			{
				tmp_mailru(tmp_callback, param1, param2, param3);
			}
			if(param5==undefined)
			{
				tmp_mailru(tmp_callback, param1, param2, param3, param4);
			}
			if(param6==undefined)
			{
				tmp_mailru(tmp_callback, param1, param2, param3, param4, param5);
			}
		}
		else if(PPLIB.website==4)
		{
			window.client.event(method, null, param1);
		}

	}
};


PPLIB.api=function(method, data, callback)
{
    var tmp_vk_callback = function(data) 
    {
        if (data.error !== undefined) {
        	PPLIB.sys.info('ERROR REQUEST: error_code: '+data.error.error_code+', error_msg: '+data.error.error_msg, 1);
        	return;
        }
        if(method=='pp.getCurrentUser') //not array, one person
        {
        	data=PPLIB.sys.convCurUserInfo(data.response[0]);
        }
        if(method=='pp.getAppFriends') 
        {
        	data=data.response;
        }
        if(method=='pp.getFriends') 
        {
        	data=data.response.items;
        }
        if(method=='pp.hasPhotoPermission')
        {
        	data=(data.response & 4) > 0;
        }
        if(method=='pp.getProfiles') 
        {
			var new_data={};
			for(var i=0; i<data.response.length; i++)
			{
				new_data[data.response[i].id]=PPLIB.sys.convCurUserInfo(data.response[i]);
			}
			data=new_data;
        }
        callback(data);
    };

	var tmp_ok_callback = function(status, data, extra_data) 
	{
        if (!data) {
        	PPLIB.sys.info('ERROR REQUEST: error_code: '+extra_data.error_code+', error_msg: '+extra_data.error_msg, 1);
        	return;         
        }

        if(method=='pp.getCurrentUser') //not array, one person
        {        	
        	data=PPLIB.sys.convCurUserInfo(data[0]);
        }
        if(method=='pp.getAppFriends') 
        {
        	data=data.uids;
        }

        if(method=='pp.getProfiles') 
        {
			var new_data={};
			for(var i=0; i<data.length; i++)
			{
				new_data[data[i].uid]=PPLIB.sys.convCurUserInfo(data[i]);
			}
			data=new_data;
        }
        callback(data);

    };

	var tmp_mail_callback = function(data) 
	{
		if (data.error !== undefined) {
        	PPLIB.sys.info('ERROR REQUEST: error_code: '+data.error.error_code+', error_msg: '+data.error.error_msg, 1);
        	return;
        }
        if(method=='pp.getCurrentUser') //not array, one person
        {
        	data=PPLIB.sys.convCurUserInfo(data[0]);
        }
        if(method=='pp.getProfiles') 
        {
			var new_data={};
			for(var i=0; i<data.length; i++)
			{
				new_data[data[i].uid]=PPLIB.sys.convCurUserInfo(data[i]);
			}
			data=new_data;
        }
        callback(data);
    };

    var tmp_fs_callback = function(data) 
    {
        if (data.error !== undefined) {
        	PPLIB.sys.info('ERROR REQUEST: error_code: '+data.error.error_code+', error_msg: '+data.error.error_msg, 1);
        	return;
        }
        if(method=='pp.getCurrentUser') //not array, one person
        {
        	data=PPLIB.sys.convCurUserInfo(data.response[PPLIB.soc_id]);
        }
        if(method=='pp.getFriends')
        {
        	data=data.response;
        }
        if(method=='pp.getAppFriends')
        {
        	data=data.response;
        }
        if(method=='pp.hasPhotoPermission') 
        {
        	data=(data.response.group_mask & 128) > 0;
        }
        if(method=='pp.getProfiles') 
        {
        	var new_data={};
    	    for(var item in data.response)
		    {
 				new_data[item]=PPLIB.sys.convCurUserInfo(data.response[item]);
		    }
		    data=new_data;
        }
        callback(data);
    };


    var tmp_gm_callback = function(data) 
    {
        if (data.error !== undefined) {
        	PPLIB.sys.info('ERROR REQUEST: error_code: '+data.error.error_code+', error_msg: '+data.error.error_msg, 1);
        	return;
        }
        if(method=='pp.getCurrentUser') //not array, one person
        {
        	data=PPLIB.sys.convCurUserInfo(data);
        }
        if(method=='pp.getFriends')
        {
        	data=data.friends;
        }
        if(method=='pp.hasPhotoPermission') 
        {
        	data=(data.response.group_mask & 128) > 0;
        }
        if(method=='pp.getProfiles') 
        {
        	var new_data={};
    	    for(var item in data.response)
		    {
 				new_data[item]=PPLIB.sys.convCurUserInfo(data.response[item]);
		    }
		    data=new_data;
        }
        callback(data);
    };


	if(method=='pp.getCurrentUser')
	{
		if(PPLIB.website==1)
		{
            window.VK.api('users.get', {
                V: PPLIB.vk_version,
                fields: 'sex, photo_50,photo_100,photo_200, photo_max_orig, bdate',
                test_mode: PPLIB.test_mode
            }, tmp_vk_callback);
		}
		else if(PPLIB.website==2)
		{
			if(PPLIB.mobile==1)
			{
				window.OKSDK.REST.call('users.getInfo', { 'uids': PPLIB.soc_id, 'fields': 'PHOTO_ID, PIC50X50, PIC128X128, PIC224X224, PIC_MAX, BIRTHDAY, FIRST_NAME, LAST_NAME, GENDER' }, tmp_ok_callback);
			}
			else
			{
				window.FAPI.Client.call({'method': 'users.getInfo', 'uids': PPLIB.soc_id, 'fields': 'PHOTO_ID, PIC50X50, PIC128X128, PIC224X224, PIC_MAX, BIRTHDAY, FIRST_NAME, LAST_NAME, GENDER'}, tmp_ok_callback);
			}			
		}
		else if(PPLIB.website==3)
		{
			window.mailru.common.users.getInfo(tmp_mail_callback);
		}
		else if(PPLIB.website==4)
		{
            window.client.api('User.getProfiles', {userIds: PPLIB.soc_id, fields: 'user_name, user_lastname, photo_small, photo_97, photo_192, photo_big, birthday, sex'}, tmp_fs_callback);
		}
		else if(PPLIB.website==7)
		{
			PPLIB.addCallback('pp.userProfile', tmp_gm_callback);
            externalApi.userProfile();
		}		
		else
		{
			PPLIB.sys.info('ERROR: Not for this platform.', 1);
		}
	}
	else if(method=='pp.getAppFriends')
	{
		if(PPLIB.website==1)
		{
            window.VK.api('friends.getAppUsers', {
                V: PPLIB.vk_version,
                test_mode: PPLIB.test_mode
            }, tmp_vk_callback);
		}
		else if(PPLIB.website==2)
		{
			if(PPLIB.mobile==1)
			{
				window.OKSDK.REST.call('friends.getAppUsers', {}, tmp_ok_callback);
			}
			else
			{
				window.FAPI.Client.call({ 'method': 'friends.getAppUsers'}, tmp_ok_callback);
			}			
		}
		else if(PPLIB.website==3)
		{
			window.mailru.common.friends.getAppUsers(tmp_mail_callback);
		}
		else if(PPLIB.website==4)
		{
            window.client.api('User.getAppFriends', {} , tmp_fs_callback);
		}
		else
		{
			PPLIB.sys.info('ERROR: Not for this platform.', 1);
		}
	}
	else if(method=='pp.getFriends')
	{
		if(PPLIB.website==1)
		{
            window.VK.api('friends.get', {
                V: PPLIB.vk_version,
                test_mode: PPLIB.test_mode
            }, tmp_vk_callback);
		}
		else if(PPLIB.website==2)
		{
			if(PPLIB.mobile==1)
			{
				window.OKSDK.REST.call('friends.get', {}, tmp_ok_callback);
			}
			else
			{
				window.FAPI.Client.call({ 'method': 'friends.get'}, tmp_ok_callback);
			}
		}
		else if(PPLIB.website==4)
		{
            window.client.api('User.getFriends', {} , tmp_fs_callback);
		}
		else if(PPLIB.website==7)
		{
			PPLIB.addCallback('pp.userFriends', tmp_gm_callback);
			externalApi.userFriends();
		}
		else
		{
			PPLIB.sys.info('ERROR: Not for this platform.', 1);
		}
	}
	else if(method=='pp.getProfiles')
	{
		if(PPLIB.website==1)
		{
            window.VK.api('users.get', {
                V: PPLIB.vk_version,
                user_ids: data.user_ids,
                fields: 'sex, photo_50,photo_100,photo_200, photo_max_orig, bdate',
                test_mode: PPLIB.test_mode
            }, tmp_vk_callback);
		}
		else if(PPLIB.website==2)
		{
			if(PPLIB.mobile==1)
			{
				window.OKSDK.REST.call('users.getInfo', { 'uids': data.user_ids, 'fields': 'PHOTO_ID, PIC50X50, PIC128X128, PIC224X224, PIC_MAX, BIRTHDAY, FIRST_NAME, LAST_NAME, GENDER' }, tmp_ok_callback);
			}
			else
			{
				window.FAPI.Client.call({ 'method': 'users.getInfo', 'uids': data.user_ids, 'fields': 'PHOTO_ID, PIC50X50, PIC128X128, PIC224X224, PIC_MAX, BIRTHDAY, FIRST_NAME, LAST_NAME, GENDER'}, tmp_ok_callback);
			}			
		}
		else if(PPLIB.website==3)
		{
			window.mailru.app.users.getInfo(tmp_mail_callback, data.user_ids);
		}
		else if(PPLIB.website==4)
		{
            window.client.api('User.getProfiles', { userIds: data.user_ids, fields: 'user_name, user_lastname, photo_small, photo_97, photo_192, photo_big, birthday, sex'} , tmp_fs_callback);
		}
		else
		{
			PPLIB.sys.info('ERROR: Not for this platform.', 1);
		}
	}	
	else if(method=='pp.isMember')
	{
		if(PPLIB.website==1)
		{
            window.VK.api('groups.isMember', {
                V: PPLIB.vk_version,
                group_id: data.group_id,
                test_mode: PPLIB.test_mode
            }, tmp_vk_callback);
		}
		else if(PPLIB.website==2)
		{
			if(PPLIB.mobile==1)
			{
				window.OKSDK.REST.call('group.getUserGroupsByIds', { 'group_id': data.group_id, 'uids': PPLIB.soc_id}, tmp_ok_callback);
			}
			else
			{
				window.FAPI.Client.call({ 'method': 'group.getUserGroupsByIds', 'group_id': data.group_id, 'uids': [PPLIB.soc_id] }, tmp_ok_callback);
			}			
		}
		else if(PPLIB.website==3)
		{
            window.mailru.common.users.getInfo(tmp_mail_callback, data.group_id);
		}
		else if(PPLIB.website==4)
		{
            window.client.api('User.checkUserSubscribedGroup', { userId: PPLIB.soc_id, groupId: data.group_id } , tmp_fs_callback);
		}
		else
		{
			PPLIB.sys.info('ERROR: Not for this platform.', 1);
		}
	}	
	else if(method=='pp.hasPhotoPermission')
	{
		if(PPLIB.website==1)
		{
            window.VK.api('account.getAppPermissions', {
                V: PPLIB.vk_version,
                test_mode: PPLIB.test_mode
            }, tmp_vk_callback);
		}
		else if(PPLIB.website==2)
		{
			window.FAPI.Client.call({ 'method': 'users.hasAppPermission', 'ext_perm': 'PHOTO_CONTENT'}, tmp_ok_callback);
		}
		else if(PPLIB.website==3)
		{
            window.mailru.common.users.hasAppPermission(tmp_mail_callback, 'photos');
		}
		else if(PPLIB.website==4)
		{
            window.client.api('User.getUserSettings', { appId: PPLIB.api_id } , tmp_fs_callback);
		}
		else
		{
			PPLIB.sys.info('ERROR: Not for this platform.', 1);
		}
	}	
	else
	{
		if(PPLIB.website==1)
		{
			data['V']=PPLIB.vk_version;
			data['test_mode']=PPLIB.test_mode;
			window.VK.api(method, data, tmp_vk_callback);
		}
		else if(PPLIB.website==2)
		{
			if(PPLIB.mobile==1)
			{
				window.OKSDK.REST.call(method, data, tmp_ok_callback);
			}
			else
			{
				data.method=method;
				window.FAPI.Client.call(data, tmp_ok_callback);			
			}
		}
		else if(PPLIB.website==3)
		{
			if(!Array.isArray(data))
			{
				PPLIB.sys.info('ERROR: param data must be array', 1);
			}
			var tmp_method=method.split('.');
			var tmp_mailru=window.mailru[tmp_method[1]][tmp_method[2]][tmp_method[3]];
			if(data.length==0)
			{
				tmp_mailru(tmp_mail_callback);
			}
			if(data.length==1)
			{
				tmp_mailru(tmp_mail_callback, data[0]);
			}
			if(data.length==2)
			{
				tmp_mailru(tmp_mail_callback, data[0], data[1]);
			}
			if(data.length==3)
			{
				tmp_mailru(tmp_mail_callback, data[0], data[1], data[2]);
			}
			if(data.length==4)
			{
				tmp_mailru(tmp_mail_callback, data[0], data[1], data[2], data[3]);
			}
			if(data.length==5)
			{
				tmp_mailru(tmp_mail_callback, data[0], data[1], data[2], data[3], data[4]);
			}
		}
		else if(PPLIB.website==4)
		{
			window.client.api(method, data, tmp_fs_callback);
		}
	}
};


PPLIB.sys.callback={};
PPLIB.sys.callback.list={};


PPLIB.sys.callback.genVK = function()
{
	var vk_callback_list=['onSettingsChanged', 'onRequestSuccess', 'onRequestFail', 'onOrderCancel', 'onOrderSuccess', 'onOrderFail', 'onWindowBlur', 'onWindowFocus', 'onLocationChanged'];
	for(var i=0; i<vk_callback_list.length; i++)
	{		
		window.VK.addCallback(vk_callback_list[i], new Function('param1, param2, param3, param4, param5', ' PPLIB.sys.callback.main(\''+vk_callback_list[i]+'\', param1, param2, param3, param4, param5)') );
	}
}


PPLIB.sys.callback.genMail = function()
{
	var mail_callback_list=['friendsInvitation', 'friendsRequest', 'paymentDialogStatus', 'incomingPayment', 'readHash'];
	for(var i=0; i<mail_callback_list.length; i++)
	{		
		window.mailru.events.listen(window.mailru.app.events[mail_callback_list[i]], new Function('event', ' PPLIB.sys.callback.main(\''+mail_callback_list[i]+'\', event) '));
	}
}


PPLIB.sys.callback.genRam= function()
{
	var ram_callback_list=['onOrderSuccess', 'onOrderBoxUserClose', 'onOrderBoxUserClose', 'onRequestFullscreen'];
	for(var i=0; i<ram_callback_list.length; i++)
	{		
		window.rgames.addCallback(ram_callback_list[i], new Function('param1, param2, param3, param4, param5', ' PPLIB.sys.callback.main(\''+ram_callback_list[i]+'\', param1, param2, param3, param4, param5)') );
	}
}




PPLIB.sys.callback.main=function(event, param1, param2, param3, param4, param5)
{
	if(PPLIB.website==1)
	{		
		if(event=='onSettingsChanged')
		{
			if(PPLIB.sys.callback.list['pp.onSettingsChanged']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onSettingsChanged'](param1);
			}
		}
		if(event=='onLocationChanged')
		{
			if(PPLIB.sys.callback.list['pp.onLocationChanged']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onLocationChanged'](param1);
			}
		}
		if(event=='onRequestSuccess')
		{
			if(PPLIB.sys.callback.list['pp.onRequest']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onRequest']('success');
			}
		}
		if(event=='onRequestFail')
		{
			if(PPLIB.sys.callback.list['pp.onRequest']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onRequest']('fail');
			}
		}	
		if(event=='onOrderCancel')
		{
			if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onOrder']('cancel');
			}
		}
		if(event=='onOrderSuccess')
		{
			if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onOrder']('success', param1);
			}
		}
		if(event=='onOrderFail')
		{
			if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onOrder']('fail', param1);
			}
		}
		if(event=='onWindowBlur')
		{
			if(PPLIB.sys.callback.list['pp.onWindowBlur']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onWindowBlur'];
			}
		}
		if(event=='onWindowFocus')
		{
			if(PPLIB.sys.callback.list['pp.onWindowFocus']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onWindowFocus'];
			}
		}
	}
	else if(PPLIB.website==2)
	{
		if(event=='showPayment')
		{
			if(param1=='ok')
			{
				if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
				{
					PPLIB.sys.callback.list['pp.onOrder']('success', param1);
				}
			}
			else
			{
				if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
				{
					PPLIB.sys.callback.list['pp.onOrder']('fail', param1);
				}
			}			
		}
	}
	else if(PPLIB.website==3)
	{
		console.log(event);
		console.log(param1);
		console.log(param2);
		if(event=='incomingPayment')
		{
			if(param1.status=='success')
			{
				if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
				{
					PPLIB.sys.callback.list['pp.onOrder']('success', param1);
				}
			}			
		}
	}
	else if(PPLIB.website==4)
	{
		if(event=='buyItemCallback' && param1.result=='success')
		{
			if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onOrder']('success', param1);
			}
		}
	}
	else if(PPLIB.website==5)
	{
		if(event=='onOrderSuccess')
		{
			if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onOrder']('success', param1);
			}
		}
	}
	else if(PPLIB.website==7)
	{
		if(event=='pp.userProfile')
		{
			if(PPLIB.sys.callback.list['pp.userProfile']!==undefined)
			{
				PPLIB.sys.callback.list['pp.userProfile'](param1);
			}
		}
		if(event=='pp.userFriends')
		{
			if(PPLIB.sys.callback.list['pp.userFriends']!==undefined)
			{
				PPLIB.sys.callback.list['pp.userFriends'](param1);
			}
		}
		if(event=='paymentReceivedCallback')
		{
			if(PPLIB.sys.callback.list['pp.onOrder']!==undefined)
			{
				PPLIB.sys.callback.list['pp.onOrder']('success', param1);
			}
		}
	}
}


PPLIB.addCallback=function(event, callback)
{
	if(event.indexOf('pp.')==0)
	{
		PPLIB.sys.callback.list[event]=callback;
	}	
}



function API_callback(method, result, data) 
{
    PPLIB.sys.callback.main(method, result, data);    
}




/*

test_f=function(data)
{
	console.log(data);
}

VK.addCallback('onLocationChanged', test_f);





*/


//Example:
/*
PPLIB.api('pp.getFriends', {}, function(data) { 
	PPLIB.api('pp.getProfiles', { user_ids: data.slice(0, 50).toString()}, function(data) { 
		for(var item in data)
		{
			console.log(data[item].first_name+' '+data[item].last_name)
		}
	})
});



PPLIB.api('execute', {code: 'return [API.users.isAppUser(), API.friends.get(), API.status.get()];'}, function(data) { console.log(data)});

PPLIB.api('users.getInfo', {uids: '479087674846', fields:'BIRTHDAY'}, function(data) { console.log(data)});

PPLIB.api('mailru.common.users.hasAppPermission', ['photos'], function(data){ console.log(data)})

PPLIB.api('User.getProfiles', {userIds: PPLIB.soc_id, fields: 'user_name'}, function(data){ console.log(data)})

*.


// For OK

/*
 }
}
*/

