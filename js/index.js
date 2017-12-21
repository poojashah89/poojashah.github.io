var inputReady = true;
var input = $('.landing-input');
var txt = "Hi";
var chatFlag = 0;
input.focus();
$('.container').on('click', function(e)
{
  input.focus();
});

input.on('keyup', function(e)
{
  $('.new-output').text(input.val());
  // console.log(inputReady);
});

$('.landing-form').on('submit', function(e)
{
  e.preventDefault();
  var val = $(this).children($('.landing-input')).val().toLowerCase();
  var color;
  
  if(chatFlag == 1)
  {
	txt = val;
	val = "chat";
  }
  
  if(val.indexOf("color") >= 0)
  {
	  var temp = val.split(" ");
	  val = temp[0];
	  color = temp[1];
	  setCookie("color",color,28);
  }
  var href;

	
	switch(val)
	{
		case "akshay":
			showAkshayASCII();
			break;
		case "help":
			showHelp();
			break;
		case "chat":
			startChat(txt);
			break;
		case "cmd":
			startCmd();
			break;
		case "cls":
			clearscreen();
			break;
		case "reset":
			resetCmd();
			break;
		case "color":
			changeColor(color,false);
			break;
		case "time":
			showTime();
			break;
		case "date":
			showDate();
			break;
		case "exit":
			redirect();
			break;
		default:
			resetForm();
	}
});

function resetForm(state)
{
  var message = "Sorry that command is not recognized."
  var input = $('.landing-input');

  if (state){
    $('.asciicanvas').removeClass('asciicanvas');
    message = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  }

  $('.new-output').removeClass('new-output');
  input.val('');
  $('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');

  $('.new-output').velocity(
    'scroll'
  ), {duration: 100}
}

function startChat(val)
{	
	chatFlag = 1;
	
	if(val.indexOf("bye") >= 0)
	{
		stopChat();
	}
	else
	{
		$.post('/profilecmd/chatservice/chatserver.php', { p1: val }, function(response) {
			if(response.indexOf("console.log") >= 0)
			{
				$('.terminal').append('<p class="prompt">Sorry, chatbot appears to be under maintenance. Exiting chat.</p>');
				stopChat();
			}
			else
			{
				$('.terminal').append('<p class="prompt">' + response + '</p>');
			}
			
			newline();
		});
	}
}

function stopChat()
{
	chatFlag = 0;
	txt = "hi";
	$('.terminal').append('<p class="prompt">Bye Bye !!</p>');
	resetForm(true);
}

function changeColor(color,fromCookie)
{
	if(!fromCookie)
	{
		newline();
	}
	
	document.styleSheets[0].addRule(".terminal .prompt", "color: "+color+"!important; text-shadow: initial;");
	document.styleSheets[0].addRule(".terminal .new-output:after", "background: "+color+"!important; box-shadow: initial;");
	
}

function showHelp()
{
	$('.terminal').append("<div class='prompt'>" +
								"<table>" +
									"<caption>Commands</caption>" +
									"<col width='130'>" +
									"<tr>" +
										"<td>akshay</td>" +
										"<td>print ascii art.</td>" +
									"</tr>" +
									/* "<tr>" +
										"<td>chat</td>" +
										"<td>spawns a chatbot. type \"bye\" to stop chatting.</td>" +
									"</tr>" + */
									"<tr>" +
										"<td>cmd</td>" +
										"<td>Starts a new instance of the command prompt.</td>" +
									"</tr>" +
									"<tr>" +
										"<td>cls</td>" +
										"<td>Clears the screen.</td>" +
									"</tr>" +
									"<tr>" +
										"<td>reset</td>" +
										"<td>Resets the command prompt.</td>" +
									"</tr>" +
									"<tr>" +
										"<td>color</td>" +
										"<td>set console text color. Format: color [color name] Example: color white</td>" +
									"</tr>" +
									"<tr>" +
										"<td>date</td>" +
										"<td>displays the date.</td>" +
									"</tr>" +
									"<tr>" +
										"<td>time</td>" +
										"<td>displays the time.</td>" +
									"</tr>" +
									"<tr>" +
										"<td>exit</td>" +
										"<td>redirects to non-geeky website.</td>" +
									"</tr>" +
								"</table>" +
							"</div>");
									
									
	
	newline();
}

function redirect()
{
	setTimeout(function(){
		location.href = "https://akshaysonvane.github.io/global/";
		}, 3000);
		
	$('.terminal').append("<p class='prompt'>Redirecting</p>");
		
	setRedirectingPattern("*");
	
}

function setRedirectingPattern(msg)
{
	setInterval(function(){
		
		$('.new-output').removeClass('new-output');
		input.val('');
		
		$('.terminal').append("<p class='prompt output new-output'>"+msg+"</p>");
		msg = msg + "*";
		
		$('.new-output').velocity(
			'scroll'
		), {duration: 100}
		
	},500);
	
}

function showDate()
{
	var d = new Date();
	var date = d.toLocaleDateString();
	
	$('.terminal').append("<p class='prompt'>The current date is: "+date+"</p>");
	newline();
}

function showTime()
{
	var d = new Date();
	var time = d.toLocaleTimeString();
	
	$('.terminal').append("<p class='prompt'>The current time is: "+time+"</p>");
	newline();
}

function startCmd()
{
	var redirectWindow = window.open('https://akshaysonvane.github.io/', '_blank');
    redirectWindow.location;
	
	newline();
}

function resetCmd()
{
	setCookie("color","",0);
	clearscreen();
}

function clearscreen()
{
	location.reload();
}

	function showAkshayASCII(){
		$('.terminal').append("<div class='asciicanvas'>"+
								 "<p class='prompt'>             _            _                     </p>"+
								 "<p class='prompt'>     /\\     | |          | |                    </p>" +
								 "<p class='prompt'>    /  \\    | | __  ___  | |__     __ _   _   _ </p>" +
								 "<p class='prompt'>   / /\\ \\   | |/ / / __| | '_ \\   / _` | | | | |</p>" +
								 "<p class='prompt'>  / ____ \\  |   <  \\__ \\ | | | | | (_| | | |_| |</p>" +
								 "<p class='prompt'> /_/    \\_\\ |_|\\_\\ |___/ |_| |_|  \\__,_|  \\__, |</p>" +
								 "<p class='prompt'>                                           __/ |</p>" +
								 "<p class='prompt'>                                          |___/ </p></div>");

		
		var lines = $('.asciicanvas p');
		$.each(lines, function(index, line){
			setTimeout(function(){
				$(line).css({
					"opacity": 1
				});

				textEffect($(line))
			}, index * 100);
		});

		$('.new-output').velocity(
			'scroll'
		), {duration: 100}

		setTimeout(function(){
			/* var gif;

			$.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=kittens', function(result){
				gif = result.data.image_url;
				$('.terminal').append('<img class="kitten-gif" src="' + gif + '"">');
				resetForm(true);
			}); */
			resetForm(true);
		}, (lines.length * 100) + 1000);
		
		
	}

	function textEffect(line){
		var alpha = [';', '.', ',', ':', ';', '~', '`'];
		var animationSpeed = 10;
		var index = 0;
		var string = line.text();
		var splitString = string.split("");
		var copyString = splitString.slice(0);

		var emptyString = copyString.map(function(el){
		    return [alpha[Math.floor(Math.random() * (alpha.length))], index++];
		})

		emptyString = shuffle(emptyString);

		$.each(copyString, function(i, el){
		    var newChar = emptyString[i];
		    toUnderscore(copyString, line, newChar);

		    setTimeout(function(){
		      fromUnderscore(copyString, splitString, newChar, line);
		    },i * animationSpeed);
		  })
	}

	function toUnderscore(copyString, line, newChar){
		copyString[newChar[1]] = newChar[0];
		line.text(copyString.join(''));
	}

	function fromUnderscore(copyString, splitString, newChar, line){
		copyString[newChar[1]] = splitString[newChar[1]];
		line.text(copyString.join(""));
	}


	function shuffle(o){
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};
	
function newline()
{
	$('.new-output').removeClass('new-output');
	input.val('');
	$('.terminal').append('<p class="prompt output new-output"></p>');

	$('.new-output').velocity(
		'scroll'
	), {duration: 100}
}

function setCookie(cname, cvalue, exdays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) 
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}