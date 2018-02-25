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
		weight1,
		weight2,
		lightAnswer,
		heavyAnswer,
		correct = 0,
		incorrect = 0;
	

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
		console.log(selectedItem.label + " : " + selectedItem.weight);
		console.log(selectedItem2.label + " : " + selectedItem2.weight);
		weight1 = Math.abs(selectedItem.weight);
		weight2 = Math.abs(selectedItem2.weight);
		getDistance = getItemDistance(selectedItem.weight, selectedItem2.weight);


		$('.qImage').attr('src',imgPreUrl+selectedItem.label+'.png');
		$('.qImage2').attr('src',imgPreUrl+selectedItem2.label+'.png');
		$('.selectedItem').append(toAppend);
		$('.selectedItem2').append(toAppend2);
		$('.i_label1').text(selectedItem.label);
		$('.i_label2').text(selectedItem2.label+ '.');	
	}
	populateJson();


	$('.qField input').on('keypress keyup',function (event) {
		inputVal = $('.qField input').val();

		if( inputVal != ''){
			$('.submit').prop('disabled', false);
		}else{
			$('.submit').prop('disabled', false);
		}
	  	$(this).val($(this).val().replace(/[^\d].+/, ""));
	    if ((event.which < 48 || event.which > 57)) { event.preventDefault(); }
	});



	$('.lighter').click(function(){
		console.log( inputVal + ":" + getDistance );
		
		if( inputVal == getDistance && weight1 < weight2){
			console.log( 'correct' );
			lightAnswer = true;
			correct += 10;
		}else if($('.qField input').val() == ""){
			alert('Please enter a value');
		}else{
			console.log('error');
			lightAnswer = false;
			incorrect += 10;
		}

	});
	$('.heavier').click(function(){
		
		console.log( inputVal + ":" + getDistance );
		if( inputVal == getDistance  && weight1 > weight2){
			console.log( 'correct' );
			heavyAnswer = true;
			correct += 10;
		}else if($('.qField input').val() == ""){
			alert('Please enter a value');
		}else{
			console.log('wrong');
			heavyAnswer = false;
			incorrect += 10;
		}
	});
	$('.submit').click(function(){
		
		console.log("light : " + lightAnswer);
		console.log("heavey : " + heavyAnswer);
		console.log(correct);
		console.log(incorrect);
		if( correct == 30){
			alert( 'Score page ');
		}else if( incorrect == 20){
			var result = ( weight1 < weight2) ? 'lighter' : 'heavier';
			alert('The ' + selectedItem.name + ' is ' + getDistance + 'g ' + result + ' than the ' + selectedItem2.name);

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
	
	

});