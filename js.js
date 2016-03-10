$(function(){
	$('.question .area').html('海淀');
	$('.answer .area').each(function(index,element){
		var item = $(element)
		var jingdu = item.attr('jingdu')
		var weidu = item.attr('weidu')
		$.get('/location',{'jindu':jingdu,'weidu':weidu},function(data){
			if(data.errno==0){
				var city = data.data.city;
				item.html(city);
			}
			else{
				var errcity = data.errmsg;
				item.html('厦门');
			}
		})
	})

})