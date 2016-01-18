$(function(){

	$('.notice_tit ul li').mouseover(function(){

		var $index  = $(this).index();

		$('.notic_con .mod ul').eq($index).addClass('cur').siblings().removeClass('cur');

		$(this).addClass('act').siblings().removeClass('act');
	})
})