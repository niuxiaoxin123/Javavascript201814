/*
var  utils = {
    getCss:function (curEle,attr) {
        var  val;
        if("getComputedStyle" in window){
            val = getComputedStyle(curEle)[attr];
        }else{
            val =curEle.currentStyle[attr]
        }
        var reg = /^(width|height|left|top|right|bottom|margin|padding|fontSize)$/;
        if(reg.test(attr)){
            if(!isNaN(parseFloat(val))){
                val = parseFloat(val);
            }
        }
        return val;
    },
    css:function css(...arg) {// 放在形参的位置是剩余运算符
        // 根据参数个数不同，进行校验；然后再根据参数的数据类型进行判断；
        if(arg.length===3){
            setCss(...arg)// 实参就是展开运算符
        }else if(arg.length===2){
            if(toString.call(arg[1])==="[object Object]"){
                setGroupCss(...arg)
            }else{
                return utils.getCss(...arg)
            }
        }
    }
}
*/

var utils = (function () {
    function setCss(curEle,attr,val) {
        var reg = /^(width|height|top|left|right|bottom)$/;
        if(reg.test(attr)){
            if(typeof val==="number"){
                //
                val = val+"px";
            }
        }
        curEle.style[attr]=val;
    }
    function setGroupCss(curEle,option) {
        for(var key in option){
            setCss(curEle,key,option[key])
        }
    }
    function getCss(curEle,attr) {
        var  val;
        if("getComputedStyle" in window){
            val = getComputedStyle(curEle)[attr];
        }else{
            val =curEle.currentStyle[attr]
        }
        var reg = /^(width|height|left|top|right|bottom|margin|padding|fontSize)$/;
        if(reg.test(attr)){
            if(!isNaN(parseFloat(val))){
                val = parseFloat(val);
            }
        }
        return val;
    }
    function css(...arg) {
        if(arg.length===3){
            setCss(...arg)
        }else if(arg.length===2){
            if(toString.call(arg[1])==="[object Object]"){
                setGroupCss(...arg)
            }else{
                return getCss(...arg)
            }
        }
    }
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var  parent = curEle.offsetParent;
        while(parent){
            // 加上父级参照物的边框 + 父级参照物的偏移量；
            l+=parent.clientLeft+parent.offsetLeft;
            t+=parent.clientTop+parent.offsetTop;
            parent= parent.offsetParent;
        }
        return {
            left:l,
            top:t
        }
    }
    function win(attr,val) {
        if(typeof val==="undefined"){
            return document.documentElement[attr]||document.body[attr]
        }else{
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }
    // 如果属性名和属性值名字相同，可以省略一个
    return {
        setCss,
        getCss,
        setGroupCss,
        css,
        offset,
        win
    }
})()
