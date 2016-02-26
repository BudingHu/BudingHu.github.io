$(document).ready(function(){
	// $('.box>li').mouseover(function(){
	// 	$(this).children('ul').stop().slideDown();
	// })
	// $('.box>li').mouseout(function(){
	// 	$(this).children('ul').stop().slideUp();//stop()每开始一个动画之前，先将上一个动画停止。
	// })
	//jquery里面有.hover()事件，
	//.hover()= mouseover+mouseout。但hover=mouseenter + mouseleave。

	$('.box>li').hover(function(){
		$(this).children('ul').slideToggle();
	})
})