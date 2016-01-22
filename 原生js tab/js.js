window.onload = function(){
	//给notice_tit下的li添加鼠标滑过事件
	var notice_tit = document.getElementById('notice_tit');
	var aLis = notice_tit.getElementsByTagName('li');

	var notice_con = document.getElementById('notice_con');
	var aUls = notice_con.getElementsByTagName('ul');

	for(var i = 0;i<aLis.length;i++){
		aLis[i].index = i;//执行完这句之后，所有的li标签都添加上了一个index自定义标签属性，它的值就是索引值。
		aLis[i].onmouseover = function(){
			//排他思想，先排他，在控制自己
			for(var i = 0; i< aLis.length;i++){
				aLis[i].className = '';
			}
			this.className = 'act';


			//排他思想，先排他，在控制自己
			for( var i = 0;i<aUls.length;i++){
				aUls[i].style.display = 'none';
			}
			aUls[this.index].style.display = 'block';
		}
	}
}