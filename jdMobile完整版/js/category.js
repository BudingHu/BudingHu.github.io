/**
 * Created by zhousg on 2015/12/19.
 */
window.onload = function(){
    leftCategory();
    rightCategory();
};
/*左边分类*/
var leftCategory = function(){
    /*父盒子*/
    var parentBox = document.getElementsByClassName('jd_category_left')[0];
    /*子盒子*/
    var childBox = parentBox.getElementsByClassName('jd_category_left_box')[0];

    /*父盒子*/
    var rightBox = document.getElementsByClassName('jd_category_right')[0];

    var childBoxLiList = childBox.getElementsByTagName('li');

    var height = parentBox.offsetHeight;

    var topHeight = document.getElementsByClassName('jd_topBar')[0].offsetHeight;

    /*想要的*/
    var parentH = height - topHeight;

    var childH = childBox.offsetHeight;



    var startY = 0;
    var endY = 0;
    var moveY = 0;

    var currY = 0;
    /*晃动的范围*/
    var upDownY = 150;

    /*时间*/
    var startTime = 0, endTime = 0;


    /*加过渡*/
    var addTransition = function(){
        childBox.style.transition = "all .3s ease 0s";
        childBox.style.webkitTransition = "all .3s ease 0s";
    }
    /*减过渡*/
    var removeTransition = function(){
        childBox.style.transition = "none";
        childBox.style.webkitTransition = "none";
    }
    /*改变位子*/
    var setTransform = function(t){
        childBox.style.transform = 'translateY('+t+'px)';
        childBox.style.webkitTransform = 'translateY('+t+'px)';
    }


    childBox.addEventListener('touchstart',function(e){
        console.time('tap');
        startTime = new Date().getTime();
        startY = e.touches[0].clientY;
    },false);
    childBox.addEventListener('touchmove',function(e){
        e.preventDefault();

        endY = e.touches[0].clientY;
        moveY = startY - endY;


        /*上下的间距不大于upDownY*/
        if( currY - moveY < upDownY && currY - moveY > ( -(childH - parentH) - upDownY )){
            removeTransition();
            setTransform(currY - moveY);
        }

    },false);
    childBox.addEventListener('touchend',function(e){
        console.timeEnd('tap');
        endTime = new Date().getTime();

        console.log(endTime-startTime);
        /*当前的滑动的位置*/
        /*上面满足吸附的条件*/
        if((currY - moveY) >= 0 　){
            addTransition();
            setTransform(0);
            currY = 0;
        }
        /*下面满足吸附的条件*/
        else if((currY - moveY) <= ( -(childH - parentH) )){
            addTransition();
            setTransform(-(childH - parentH));
            currY = -(childH - parentH);
        }
        /*正常情况*/
        else{
            currY = currY - moveY;
        }

        /*tap*/
        if(endTime-startTime < 150 && moveY == 0){
            for(var i = 0 ; i < childBoxLiList.length ; i ++){
                childBoxLiList[i].className = " ";
                childBoxLiList[i].index = i;
            }
            var li = e.target.parentNode;
                li.className = "now";
            /*移动的距离*/
            var translateY = li.index * 50 ;

            if(translateY < childH - parentH){
                addTransition();
                setTransform(- translateY);
                currY = - translateY;
            }else{
                addTransition();
                setTransform(-( childH - parentH));
                currY = -( childH - parentH);
            }

            rightBox.style.transition = 'all .2s ease 0s';
            rightBox.style.webkitTransition = 'all .2s ease 0s';
            rightBox.style.opacity = 0;
            setTimeout(function(){
                rightBox.style.opacity = 1;
            },200);
        }
    },false);

};

/*右边分类*/
var rightCategory = function(){
    /*父盒子*/
    var parentBox = document.getElementsByClassName('jd_category_right')[0];
    /*子盒子*/
    var childBox = parentBox.getElementsByClassName('jd_category_right_box')[0];


    var height = parentBox.offsetHeight;

    /*想要的*/
    var parentH = height;

    var childH = childBox.offsetHeight;



    var startY = 0;
    var endY = 0;
    var moveY = 0;

    var currY = 0;
    /*晃动的范围*/
    var upDownY = 150;

    /*时间*/
    var startTime = 0, endTime = 0;


    /*加过渡*/
    var addTransition = function(){
        childBox.style.transition = "all .3s ease 0s";
        childBox.style.webkitTransition = "all .3s ease 0s";
    }
    /*减过渡*/
    var removeTransition = function(){
        childBox.style.transition = "none";
        childBox.style.webkitTransition = "none";
    }
    /*改变位子*/
    var setTransform = function(t){
        childBox.style.transform = 'translateY('+t+'px)';
        childBox.style.webkitTransform = 'translateY('+t+'px)';
    }


    childBox.addEventListener('touchstart',function(e){
        console.time('tap');
        startTime = new Date().getTime();
        startY = e.touches[0].clientY;
    },false);
    childBox.addEventListener('touchmove',function(e){
        e.preventDefault();

        endY = e.touches[0].clientY;
        moveY = startY - endY;


        /*上下的间距不大于upDownY*/
        if( currY - moveY < upDownY && currY - moveY > ( -(childH - parentH) - upDownY )){
            removeTransition();
            setTransform(currY - moveY);
        }

    },false);
    childBox.addEventListener('touchend',function(e){
        console.timeEnd('tap');
        endTime = new Date().getTime();

        console.log(endTime-startTime);
        /*当前的滑动的位置*/
        /*上面满足吸附的条件*/
        if((currY - moveY) >= 0 　){
            addTransition();
            setTransform(0);
            currY = 0;
        }
        /*下面满足吸附的条件*/
        else if((currY - moveY) <= ( -(childH - parentH) )){
            addTransition();
            setTransform(-(childH - parentH));
            currY = -(childH - parentH);
        }
        /*正常情况*/
        else{
            currY = currY - moveY;
        }

    },false);

};
