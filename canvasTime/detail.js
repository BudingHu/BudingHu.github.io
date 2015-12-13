/*初始化操作*/
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=8;
var MARGIN_TOP=30;
var MARGIN_LEFT=60;

/*const endTime = new Date(2015,11,18,18,47,52)*/// 99个小时内

/*var endTime = new Date //距离当前时间时间向后推一个小时
endTime.setTime(endTime.getTime()+3600*1000)*/
var curShowTimeSeconds = 0;

var balls = []
const colors = ['#f40','##ffff80','#ff0080','#00ff40','#00ffff','#ff00ff','#0000ff','#ff0000','#372bd5','#ff0080']



window.onload = function(){

	//屏幕自适应
WINDOW_WIDTH=window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;

	WINDOW_HEIGHT=window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight;
	MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1//108是MARGIN_LEFT  93*(RADIUS+1)+(MARGIN+1)

    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);



	var c = document.getElementById('canvas')
	var cxt = c.getContext("2d")

	c.width = WINDOW_WIDTH;
	c.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getcurShowTimesSeconds();

	 
	setInterval(function(){
		render(cxt)
		update()
	}, 50)
}



function getcurShowTimesSeconds(){

	var curTime = new Date
	var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();

	/*var ret = endTime.getTime()-curTime.getTime() //计算现在距结束时间的差
	ret =Math.round(ret/1000)*/

	/*return ret >=0 ? ret:0; //结束时间早，则返回时间是0*/
	return ret
}


function update(){
	var nextShowTimeSeconds = getcurShowTimesSeconds();

	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds = curShowTimeSeconds%60;

	if(nextSeconds != curSeconds){

		/*hours*/
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
		}
		if (parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
		}

		/*minutes*/
		if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10))
		}
		if (parseInt(curMinutes%10) != parseInt(nextMinutes%10)) {
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10))
		};

		/*seconds*/
		if (parseInt(curSeconds/10) !=parseInt(nextSeconds/10)) {
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10))
		};
		if ( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
	/*	console.log(balls.length)*/
}


function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
    //优化性能
    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
    	if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH)
    		balls[cnt++] = balls[i]

    	while(balls.length>Math.min(300,cnt)){ 
    		balls.pop()
    	}
}


function addBalls( x , y , num ){
    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),

                    y:y+i*2*(RADIUS+1)+(RADIUS+1),

                    g:1.5+Math.random(),

                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,

                    vy:-5,

                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }
}



function render(cxt){

	cxt.clearRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT)

	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;
	/*hours*/
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	/*分号*/
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	/*miutes*/
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	/*分号*/
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	/*seconds*/
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);



	for( var i = 0;i <balls.length; i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath()
		cxt.arc(balls[i].x, balls[i].y, RADIUS,0, 2*Math.PI, true);
		cxt.closePath()

		cxt.fill()
	}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle = "rgb(0,102,153)";
	for( var i = 0; i<digit[i].length; i++){
		for( var j = 0;j<digit[num][j].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath()
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI)
				cxt.closePath()
				cxt.fill()
			}
		}
	}
}

