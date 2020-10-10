function startMove(node, cssObj, complete) {
    clearInterval(node.timer);
    node.timer = setInterval(function () {
        var isEnd = true; //假设都到达目的值了
        for (var attr in cssObj) {

            var iTarget = cssObj[attr];

            var iCur = null;

            if (attr == "opacity") {
                iCur = parseInt(parseFloat(getStyle(node, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(node, attr));
            }

            var speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            //node.style["width"]
            if (attr == "opacity") {
                iCur += speed;
                node.style.opacity = iCur / 100;
                node.style.filter = "alpha(opacity=" + iCur + ")";
            } else {
                node.style[attr] = iCur + speed + 'px';
            }

            if(iTarget != iCur){
                isEnd = false;
            }
        }
        //定时器关闭的条件是，所有动画都达到目的值
        if(isEnd){
            clearInterval(node.timer);
            if(complete){
                complete.call(node);
            }
        }
    }, 30);
}


//获取当前有效样式的浏览器兼容
function getStyle(node, cssAttr) {
    if (node.currentStyle) {
        return node.currentStyle[cssAttr];
    } else {
        return getComputedStyle(node)[cssAttr];
    }
}