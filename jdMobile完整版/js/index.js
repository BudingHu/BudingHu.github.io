/**
 * Created by zhousg on 2015/12/18.
 */
window.onload = function(){
    search();
    secondKill();
    scrollPic();
};
/*头部搜索*/
var search = function(){
    /*搜索框对象*/
    var search = document.getElementsByClassName('jd_header_box')[0];
    /*banner对象*/
    var banner = document.getElementsByClassName('jd_banner')[0];
    /*高度*/
    var height = banner.offsetHeight;

    window.onscroll = function(){
        var top = document.body.scrollTop;
        /*当滚动高度大于banner的高度时候颜色不变*/
        if(top > height){
            search.style.background  = "rgba(201,21,35,0.85)";
        }else{
            var op = top/height * 0.85;
            search.style.background  = "rgba(201,21,35,"+op+")";
        }
    };
};
/*秒杀倒计时*/
var secondKill = function(){
    /*复盒子*/
    var parentTime = document.getElementsByClassName('sk_time')[0];
    /*span时间*/
    var timeList = parentTime.getElementsByClassName('num');


    console.log(parentTime.childNodes);
    console.log(timeList.length);

    var times = 7   * 60 * 60;
    var timer;
    timer = setInterval(function(){
        times  -- ;

        var h = Math.floor(times/(60*60));
        var m = Math.floor(times/60%60);
        var s = times%60;

        //console.log(h+'-'+m+"-"+s);

        timeList[0].innerHTML = h>10?Math.floor(h/10):0;
        timeList[1].innerHTML = h%10;

        timeList[2].innerHTML = m>10?Math.floor(m/10):0;
        timeList[3].innerHTML = m%10;

        timeList[4].innerHTML = s>10?Math.floor(s/10):0;
        timeList[5].innerHTML = s%10;
        if(times <= 0){
           clearInterval(timer);
        }
    },1000);

}

/*轮播图*/
var scrollPic = function(){
    /*banner*/
    var banner = document.getElementsByClassName('jd_banner')[0];
    /*图片的宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imgBox = banner.getElementsByTagName('ul')[0];
    /*点盒子*/
    var pointBox = banner.getElementsByTagName('ul')[1];
    /*点数组*/
    var pointList = pointBox.getElementsByTagName('li');

    var index = 1;
    var timer;

    /*加过渡*/
    var addTransition = function(){
        imgBox.style.transition = "all .3s ease 0s";
        imgBox.style.webkitTransition = "all .3s ease 0s";
    }
    /*减过渡*/
    var removeTransition = function(){
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    }
    /*改变位子*/
    var setTransform = function(t){
        imgBox.style.transform = 'translateX('+t+'px)';
        imgBox.style.webkitTransform = 'translateX('+t+'px)';
    }
    /*改变点*/
    var setPoint = function(){
        var currIndex = index;
        if(index >= 9){
            currIndex = 1;
        }else if(index <= 0){
            currIndex = 8;
        }


        for(var i = 0 ; i < pointList.length ; i ++){
            pointList[i].className = " ";
        }
        pointList[currIndex-1].className = "now";
    }
    /*计时器*/
    timer = setInterval(function(){
        index ++ ;
        addTransition();
        setTransform(-index*width);
    },3000);

    /*过渡结束*/
    imgBox.addEventListener('transitionEnd',function(){
        console.log('过渡完了');
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8;
        }
        removeTransition();
        setTransform(-index*width)
        setPoint();
    },false);
    /*过渡结束*/
    imgBox.addEventListener('webkitTransitionEnd',function(){
        console.log('过渡完了');
        if(index >= 9){
            index = 1;
        }else if(index <= 0){
            index = 8;
        }
        removeTransition();
        setTransform(-index*width);
        setPoint();
    },false);

    /*touch*/
    /*开始的位置*/
    var startX = 0 ;
    /*结束的位置*/
    var endX = 0 ;
    /*移动的距离*/
    var moveX = 0 ;
    /*触摸开始事件*/
    imgBox.addEventListener('touchstart',function(e){
        console.log('start');
        /*记录开始的位置*/
        startX  = e.touches[0].clientX;
    });
    /*触摸滑动事件*/
    imgBox.addEventListener('touchmove',function(e){
        clearInterval(timer);
        /*清除默认的滚动事件*/
        e.preventDefault();

        console.log('move');
        /*记录结束的位置*/
        endX  = e.touches[0].clientX;
        /*记录移动的距离*/
        moveX = startX - endX;
        /*清除定时器*/


        removeTransition();

        setTransform( - index * width - moveX);

    });
    /*触摸结束事件*/
    imgBox.addEventListener('touchend',function(e){
        console.log('end');
        /*如果移动的距离大于三分之一  并且是移动过的*/
        if(Math.abs(moveX) > (1/3*width) && endX !=0 ){
            /*向左*/
            if(moveX > 0){
                index ++ ;
            }
            /*向右*/
            else{
                index -- ;
            }
            /*改变位置*/
            setTransform(- index * width);
        }

        /*回到原来的位置*/
        addTransition();
        setTransform(- index * width);


        /*初始化*/
        startX = 0 ;
        endX = 0 ;

        console.log(timer);
        /*严谨的处理定时器*/
        clearInterval(timer);
        timer = setInterval(function(){
            index ++ ;
            addTransition();
            setTransform(-index*width);
        },3000);

    });
    imgBox.addEventListener('click',function(){
        console.log('click');
    });

}

