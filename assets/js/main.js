$(document).ready(function(){
	var theLabels = [], 
		theWeight = [],
		objItem,
		selectedItem,
		selectedItem2,
		toAppend,
		toAppen2,
		imgPreUrl = 'assets/images/qImages/',
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
		correctAns = new Audio('assets/audio/correctAnswer.mp3'),
		outstanding = new Audio('assets/audio/outsEffort.mp3'),
		doBetter = new Audio ('assets/audio/doBetter.mp3');

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

	//Populate Json Item on load
	populateJson();

	//User input and validations
	$('.qField #qValue').on('keypress keyup',function (event) {
		inputVal = $('.qField #qValue').val();
		//Check if Input value is not empty
		if( inputVal != ''){
			$('.submit, .lighter, .heavier').prop('disabled', false);
		}
		// Accept only numeric value
	  	$(this).val($(this).val().replace(/[^\d].+/, ""));
	    if ((event.which < 48 || event.which > 57)) { event.preventDefault(); }
	});

	//Button start
	$('.start').click(function(){
		$('section.one').hide();
		$('section.two').fadeIn();
		$('.home, .learn').css('pointer-events','auto');
	});

	//Button Lighter
	$('.lighter').click(function(){
		// Trigger this class to have condition after submit
		$('.heavier').removeClass('selected');
		$(this).addClass('selected');

		console.log( inputVal + ":" + getDistance );
		if($('.qField #qValue').val() == ""){
			alert('Please enter a value');
		}
	});

	//Button Heavier
	$('.heavier').click(function(){
		// Trigger this class to have condition after submit
		$('.lighter').removeClass('selected');
		$(this).addClass('selected');
		console.log( inputVal + ":" + getDistance );
		if($('.qField #qValue').val() == ""){
			alert('Please enter a value');
		}
	});

	//Submit button
	$('.submit').click(function(){
		console.log("light : " + lightAnswer);
		console.log("heavey : " + heavyAnswer);
		console.log(correct);
		console.log(incorrect);

		//Added condition for lighter and heavier button is clicked
		if($('.lighter').hasClass('selected')){
			console.log($('.lighter').val());
			if( inputVal == getDistance && weight1 < weight2){
				$('.imgChecker').attr('src','assets/images/qImages/correct.png');
				$('.imgChecker').show();
				lightAnswer = true;
				correctAudio.play();
				correct += 20;
				incorrect = 0;
				jsonLoad++;
				disableAddclass();
			}else{
				$('.imgChecker').attr('src','assets/images/qImages/incorrect.png');
				$('.imgChecker').show();
				lightAnswer = 'false';
				incorrect += 10;
				incorrectAudio.play();
				if( incorrect == 20){
					setTimeout(function(){ correctAns.play(); },1000);
					popupCorrect();
					incorrect = 0;
					jsonLoad++;
					disableAddclass();
				}
			}
		}else if($('.heavier').hasClass('selected')){
			console.log($('.heavier').val());
			if( inputVal == getDistance  && weight1 > weight2){
				$('.imgChecker').attr('src','assets/images/qImages/correct.png');
				$('.imgChecker').show();
				heavyAnswer = true;
				correctAudio.play();
				correct += 20;
				incorrect = 0;
				jsonLoad++;
				disableAddclass();
			}else{
				$('.imgChecker').attr('src','assets/images/qImages/incorrect.png');
				$('.imgChecker').show();
				heavyAnswer = false;
				incorrect += 10;
				incorrectAudio.play();
				if( incorrect == 20){
					setTimeout(function(){ correctAns.play(); },1000);
					popupCorrect();
					incorrect = 0;
					jsonLoad++;
					disableAddclass();
				}
			}
		}
		$('.score').text(correct);
		console.log("incorrect: " + incorrect);
		console.log("correct: " + correct);
		console.log(jsonLoad);
	});

	//Next question button
	$('.nextQuestion').click(function(){
		var resultImg = ['<img src="assets/images/qImages/outstanding.png">',
		 				'<img src="assets/images/qImages/doBetter.png">'],
		 	info = '<h1>Your Score : '+ correct +'/100</h1>';

		//Reload json item after clicking next
		populateJson();
		if(jsonLoad == 6){
			if(correct == 100){
				outstanding.play();
				$("#popupResult").on("shown.bs.modal", function () {
	     			$(this).find('.modal-body').append(resultImg[0] + info);
				}).modal('show');
			}else{
				doBetter.play();
				$("#popupResult").on("shown.bs.modal", function () {
	     			$(this).find('.modal-body').append(resultImg[1] + info);
				}).modal('show');
			}
		}
	});

	$('.start').click(function(){
		setTimeout(function(){
			if(window.location.href.indexOf('#section2') > -1){
				$('#myModal').modal('show');
				document.getElementById("learningObj").play();
			}
		},200);
	});
	$('.home').click(function(){
		$("#home").on("shown.bs.modal", function () {
 			$(this).find('.modal-body h1').text('End Activity?');
		}).modal('show');
	});
	


	function populateJson(){
		objItem = json.items.item;
		selectedItem = random(objItem);
		selectedItem2 = random(objItem);
		toAppend = '<div class="itemName"> ' + selectedItem.name + '<div class="itemLabel">'+selectedItem.label+'</div><div  class="itemWeight">'+selectedItem.weight+'</div></div>';
		toAppend2 = '<div class="itemName"> ' + selectedItem2.name + '<div class="itemLabel">'+selectedItem2.label+'</div><div class="itemWeight">'+selectedItem2.weight+'</div></div>';
		weight1 = Math.abs(selectedItem.weight);
		weight2 = Math.abs(selectedItem2.weight);
		getDistance = Math.abs(getItemDistance(selectedItem.weight, selectedItem2.weight));
		console.log(selectedItem.label + " : " + selectedItem.weight);
		console.log(selectedItem2.label + " : " + selectedItem2.weight);
		console.log(jsonLoad);
		if( selectedItem.label == selectedItem2.label){
			populateJson();
			window.location.reload(true);
		}
		
		

		$('.qImage').attr('src',imgPreUrl+selectedItem.label+'.png');
		$('.qImage2').attr('src',imgPreUrl+selectedItem2.label+'.png');
		$('.selectedItem').append(toAppend);
		$('.selectedItem2').append(toAppend2);
		$('.i_label1').text(selectedItem.label);
		$('.i_label2').text(selectedItem2.label+ '.');
		$('.qIndicator').text('Q'+jsonLoad +'/5' );
		$('.nextQuestion').removeClass('active');
		$('#qValue').prop('disabled', false);
		$('#qValue').val('');
		$('.submit, .lighter, .heavier').prop('disabled',true);
		$('.imgChecker').hide();

		$('.qDiv').each(function(){
			var _thisLabel = $(this).find('.itemLabel').text();
			if(_thisLabel){
				$(this).find('.scaleArm').addClass(_thisLabel);
			}
		});
	}

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
	function popupCorrect(){
		var res = ( weight1 < weight2) ? 'lighter' : 'heavier';
		var resMerge = 'The ' + selectedItem.name + ' is ' + getDistance + 'g ' + res + ' than the ' + selectedItem2.name + '.';
		$("#popupCorrect").on("shown.bs.modal", function () {
		     $(this).find('.modal-body').text(resMerge);
		}).modal('show');
	}
	function disableAddclass(){
		$('.qField #qValue, .submit, .lighter, .heavier').prop('disabled', true);
		$('.nextQuestion').addClass('active');
	}

});