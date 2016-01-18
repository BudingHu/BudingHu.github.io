$(function(){

		// 当我们鼠标移上按钮的时候我们希望 当前按钮编号所对应的那个list 显示出来。其它的全部隐藏掉。
	$('.notice_tit ul li').mouseover(function(){

		// 需要拿到当前按钮的编号
		var $index  = $(this).index();

		// 利用当前的编号将对应的ul显示出来
		$('.notic_con .mod ul').eq($index).addClass('cur').siblings().removeClass('cur');

		// 鼠标移上按钮的时候同样需要将自身的样式改变，然后将其它的span样式变成统一
		$(this).addClass('act').siblings().removeClass('act');
	})
})