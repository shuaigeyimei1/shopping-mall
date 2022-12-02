//target为该元素最终所在的left值
function animate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        obj.step = (target - obj.offsetLeft) / 10
        obj.step = obj.step > 0 ? Math.ceil(obj.step) : Math.floor(obj.step)
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
            callback && callback()//逻辑中断的逻辑与运算
        } else {
            obj.style.left = obj.offsetLeft + obj.step + 'px'
        }
    }, 15)
}