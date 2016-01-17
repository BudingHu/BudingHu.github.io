$(function(){
	// 将需要运动的图片复制一份做无缝处理
	var aLi = $('#ulBox li').clone(true);

	// 将复制出来的li插入到ul里面去
	$('#ulBox').append( aLi );

	var n = ($('li').length)/2;

	/*利用JS来给每一个li定位将图片排好 1 2 3 1 2 3,规律-3*960 -2*960 -1*960 0 1*960 2*960 
	所以我们现在需要 -3 -2 -1 0 1 2 */
	var arrnum = [];
	$('li').each(function(i,item){
		arrnum.push( i-n );
	});

	console.log( n );
	// 利用上面的数组来给每一个Li设置left值
	$('li').each(function( i,item ){
		$(item).css({'left':arrnum[i]*960});
	});

	// 将要运动的LI 和 它对应的位置存起来
	var liArr = [];
	var posArr = [];

	$('li').each(function( i,item ){
		// 先将每一个LI的left值存起来
		posArr.push( $(item).get(0).offsetLeft );
		liArr.push( $(item) );
	});

	//点击左按钮，让最左边的图片去最右边---》位置和最右边的换一下
	$('.next').click(function(){
		// 迅速的让当前第一张去到最后一张
		$(liArr[0]).css({'left':posArr[posArr.length-1]});

		// 再将它之前在开头的结点也对应拿一份到最后
		liArr.push(liArr[0]);

		// 上面二步做之后再将前面的二个删除
		liArr.splice(0,1);

		// 开始运动
		$('li').each(function(i,item){
			$(liArr[i]).stop().animate({'left':posArr[i]});
		});

		console.log( posArr );
	});

	$('.prev').click(function(){
		// 让最后一张去到第一张的位置
		$(liArr[liArr.length-1]).css({'left':posArr[0]});

		// 在数组的开头将它加进来
		liArr.unshift( liArr[liArr.length-1] );

		// 再将末尾的删除
		liArr.splice(liArr.length-1,1);

		// 做运动
		$('li').each(function(i,item){
			$(liArr[i]).stop().animate({'left':posArr[i]});
		});
	});

	
	var timer = null;
	function autoplay(){
		// 让最后一张去到第一张的位置
		$(liArr[liArr.length-1]).css({'left':posArr[0]});

		// 在数组的开头将它加进来
		liArr.unshift( liArr[liArr.length-1] );

		// 再将末尾的删除
		liArr.splice(liArr.length-1,1);

		// 做运动
		$('li').each(function(i,item){
			$(liArr[i]).stop().animate({'left':posArr[i]});
		});
	}
	timer = setInterval(autoplay,2000);

	$("#index_b_hero").mouseover(function(){
		clearInterval( timer );
	}).mouseout(function(){
		timer = setInterval(autoplay,2000);
	});
});