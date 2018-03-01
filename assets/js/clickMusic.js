$(document).ready(function(){
	var introSrc = 'assets/audio/intro2.mp3',
		blank = 'assets/audio/blank.mp3',
		learn = 'assets/audio/learnObj.mp3';
		intro = document.getElementById("intro").src;
	
	$('.music').click(function(){
		$(this).toggleClass('muted');
		if($(this).hasClass('muted')){
			$(this).find('img').attr('src','assets/images/footerIcons/noMusic.png');
			document.getElementById("intro").src = blank;
		}else{
			$(this).find('img').attr('src','assets/images/footerIcons/music.png');
			document.getElementById("intro").src = introSrc;
		}

	});
	$('.learn').click(function(){
		document.getElementById("learningObj").play();
		document.getElementById("learningObj").catch(function(error){
			console.log(error);
		});
	});
	$('.modal-footer button, #myModal').click(function(){
		document.getElementById("learningObj").pause();
	});

});