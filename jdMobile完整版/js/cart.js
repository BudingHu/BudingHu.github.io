/**
 * Created by zhousg on 2015/12/19.
 */
window.onload = function(){
    checkBox();
    deleteFuc();
};

/*复选框*/
var checkBox = function(){
    var checkBoxList = document.getElementsByClassName('jd_check_box');
    console.log(checkBoxList.length);
    for(var i = 0; i < checkBoxList.length ; i ++){
        checkBoxList[i].onclick = function(){
            var hasChecked = this.getAttribute('checked');//如果没的话是  null
            if(hasChecked !== null){
                this.removeAttribute('checked');
            }else{
                this.setAttribute('checked',' ');
            }
        };
    }
}
/*删除方法*/
var deleteFuc = function(){
    /*删除按钮集合*/
    var deleteList = document.getElementsByClassName('delete_box');

    /*弹出层*/
    var win = document.getElementsByClassName('jd_win')[0];
    /*弹出层的子盒子*/
    var winBox = document.getElementsByClassName('jd_win_box')[0];

    var up;

    for(var i = 0; i < deleteList.length ; i ++){
        deleteList[i].onclick = function(){
            win.style.display = 'block';
            winBox.className = 'jd_win_box jumpOut';

            var deleteObj = this;

            up = deleteObj.getElementsByClassName('delete_box_top')[0];

            up.style.transition = 'all 1s ease 0s';
            up.style.webkitTransition = 'all 1s ease 0s';

            up.style.transform = 'translateY(-5px) translateX(-2px) rotate(-45deg)';
            up.style.webkitTransform = 'translateY(-5px) translateX(-2px) rotate(-45deg)';
        };

    }

    winBox.getElementsByClassName('cancel')[0].onclick = function(){
        console.log(0);
        win.style.display = 'none';
        winBox.className = 'jd_win_box';

        if(up){
            up.style.transform = 'translateY(0px) translateX(0px) rotate(0deg)';
            up.style.webkitTransform = 'translateY(0px) translateX(0px) rotate(0deg)';
        }


    }
    winBox.getElementsByClassName('submit')[0].onclick = function(){
        console.log(1);
    }
}
