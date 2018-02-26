$(document).ready(function(){
	$('.start').click(function(){
		$('section.one').hide();
		$('section.two').fadeIn();
	});
	if(window.location.href.indexOf('#section2') > -1){
		console.log('test');
	}
	$('.start').click(function(){
		setTimeout(function(){
			if(window.location.href.indexOf('#section2') > -1){
				$('#myModal').modal('show');
			}
		},200);
	});
	$('.home').click(function(){

	}); 





	var theLabels = [], 
		theWeight = [],
		objItem,
		selectedItem,
		selectedItem2,
		toAppend,
		toAppen2,
		imgPreUrl = "assets/images/qImages/",
		inputVal,
		getDistance,
		jsonLoad = 1,
		weight1,
		weight2,
		lightAnswer,
		heavyAnswer,
		correct = 0,
		incorrect = 0,
		correctAudio = new Audio('assets/audio/correct.mp3'),
		incorrectAudio = new Audio('assets/audio/incorrect.mp3'),
		correctAns = new Audio('assets/audio/correctAnswer.mp3');
		


	

	var json = (function () {
	    var json = null;
	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': 'item.json',
	        'dataType': "json",
	        'success': function (data) {
	            json = data;
	        }
	    });
	    return json;
	})();
	

	function populateJson(){
		objItem = json.items.item;
		selectedItem = random(objItem);
		selectedItem2 = random(objItem);
		toAppend = '<div class="itemName"> ' + selectedItem.name + '<div class="itemLabel">'+selectedItem.label+'<div  class="itemWeight">'+selectedItem.weight+'</div></div></div>';
		toAppend2 = '<div class="itemName"> ' + selectedItem2.name + '<div class="itemLabel">'+selectedItem2.label+'<div class="itemWeight">'+selectedItem2.weight+'</div></div></div>';
		weight1 = Math.abs(selectedItem.weight);
		weight2 = Math.abs(selectedItem2.weight);
		getDistance = getItemDistance(selectedItem.weight, selectedItem2.weight);
		console.log(selectedItem.label + " : " + selectedItem.weight);
		console.log(selectedItem2.label + " : " + selectedItem2.weight);
		console.log(jsonLoad);


		$('.qImage').attr('src',imgPreUrl+selectedItem.label+'.png');
		$('.qImage2').attr('src',imgPreUrl+selectedItem2.label+'.png');
		$('.selectedItem').append(toAppend);
		$('.selectedItem2').append(toAppend2);
		$('.i_label1').text(selectedItem.label);
		$('.i_label2').text(selectedItem2.label+ '.');
		$('.qIndicator').text('Q'+jsonLoad+'/5' );
		$('.nextQuestion').removeClass('active');
		$('#qValue, .lighter, .heavier').prop('disabled', false);
		$('#qValue').val('');
		$('.submit').prop('disabled',true);
	}
	
	populateJson();
	if( selectedItem.label == selectedItem2.label){
		populateJson();
		window.location.reload(true);
	}
	


	$('.qField #qValue').on('keypress keyup',function (event) {
		inputVal = $('.qField #qValue').val();

		//Check if Input value is not empty
		if( inputVal != ''){
			$('.submit').prop('disabled', false);
		}else{
			$('.submit').prop('disabled', false);
		}

		// Accept only numeric value
	  	$(this).val($(this).val().replace(/[^\d].+/, ""));
	    if ((event.which < 48 || event.which > 57)) { event.preventDefault(); }
	});



	$('.lighter').click(function(){
		$('.heavier').removeClass('selected');
		$(this).addClass('selected');
		console.log( inputVal + ":" + getDistance );
		if($('.qField #qValue').val() == ""){
			alert('Please enter a value');
		}
		
		//Check if Input value is equal to Distance and 1st weight item is less than 2nd weigth item
		/*if( inputVal == getDistance && weight1 < weight2){
			console.log( 'correct' );
			lightAnswer = true;
		}else if($('.qField #qValue').val() == ""){
			alert('Please enter a value');
		}else{
			console.log('error');
			lightAnswer = 'false';
		}*/

	});
	$('.heavier').click(function(){
		$('.lighter').removeClass('selected');
		$(this).addClass('selected');

		console.log( inputVal + ":" + getDistance );
		if($('.qField #qValue').val() == ""){
			alert('Please enter a value');
		}
		//Check if Input value is equal to Distance and 1st weight item is greater than 2nd weigth item
		/*if( inputVal == getDistance  && weight1 > weight2){
			console.log( 'correct' );
			heavyAnswer = true;
		}else if($('.qField #qValue').val() == ""){
			alert('Please enter a value');
		}else{
			console.log('wrong');
			heavyAnswer = false;
		}*/
	});
	$('.submit').click(function(){
		
		console.log("light : " + lightAnswer);
		console.log("heavey : " + heavyAnswer);
		console.log(correct);
		console.log(incorrect);
		if($('.lighter').hasClass('selected')){
			console.log($('.lighter').text());
			if( inputVal == getDistance && weight1 < weight2){
				console.log( 'correct' );
				lightAnswer = true;
			}else if($('.qField #qValue').val() == ""){
				alert('Please enter a value');
			}else{
				console.log('error');
				lightAnswer = 'false';
			}
		}else if($('.heavier').hasClass('selected')){
			console.log($('.heavier').text());
			if( inputVal == getDistance  && weight1 > weight2){
			console.log( 'correct' );
			heavyAnswer = true;
		}else if($('.qField #qValue').val() == ""){
			alert('Please enter a value');
		}else{
			console.log('wrong');
			heavyAnswer = false;
		}
		}
		
		/*if( lightAnswer == false ){
			incorrect += 10;
			incorrectAudio.play();
			if( incorrect == 20){
				setTimeout(function(){ correctAns.play(); },100);
				popupError();
				incorrect = 0;
				jsonLoad++;
				disableAddclass();
			}
		}else if( heavyAnswer == false){
			incorrect += 10;
			incorrectAudio.play();
			if( incorrect == 20){
				setTimeout(function(){ correctAns.play(); },100);
				popupError();
				incorrect = 0;
				jsonLoad++;
				disableAddclass();
			}
		}else if( lightAnswer == true){
			alert('correct');
			correctAudio.play();
			correct += 20;
			incorrect = 0;
			jsonLoad++;
			disableAddclass();
		}else if( heavyAnswer == true){
			alert('correct');
			correctAudio.play();
			correct += 20;
			incorrect = 0;
			jsonLoad++;
			disableAddclass();
		}else if($('.qField #qValue').val() == ''){
			alert('Please enter a value');
		}*/
		$('.score').text(correct);

		console.log("incorrect: " + incorrect);
		console.log("correct: " + correct);
		console.log(jsonLoad);



	});

	$('.nextQuestion').click(function(){
		populateJson();
		if(jsonLoad == 5){
			alert('end page');
		}
	});


	
	
	
	
	



	function random(items){
		return items[Math.floor(Math.random()*items.length)];
	}

	function getItemDistance(weight1, weight2){
		if( weight1 > weight2){
			return weight1 - weight2;
		}else{
			return weight2 - weight1;
		}
	}
	function popupError(){
		var result = ( weight1 < weight2) ? 'lighter' : 'heavier';
		alert('The ' + selectedItem.name + ' is ' + getDistance + 'g ' + result + ' than the ' + selectedItem2.name);
	}
	function disableAddclass(){
		$('.qField #qValue, .submit, .lighter, .heavier').prop('disabled', true);
		$('.nextQuestion').addClass('active');
	}
	
	

});