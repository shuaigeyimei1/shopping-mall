window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img')
    var mask = document.querySelector('.mask')
    var big = document.querySelector('.big')
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block'
        big.style.display = 'block'
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none'
        big.style.display = 'none'
    })
    preview_img.addEventListener('mousemove', function (e) {
        var x = e.pageX - this.offsetLeft
        var y = e.pageY - this.offsetTop
        maskX = x - mask.offsetWidth / 2
        maskY = y - mask.offsetHeight / 2
        maskMax = this.offsetWidth - mask.offsetWidth
        if (maskX < 0) {
            maskX = 0
        } else if (maskX > maskMax) {
            maskX = maskMax
        }
        if (maskY < 0) {
            maskY = 0
        } else if (maskY > maskMax) {
            maskY = maskMax
        }
        mask.style.left = maskX + 'px'
        mask.style.top = maskY + 'px'
        var bigImg = document.querySelector('.big_Img')
        bigImgMax = bigImg.offsetWidth - big.offsetWidth
        bigImg.style.left = -maskX * bigImgMax / maskMax + 'px'
        bigImg.style.top = -maskY * bigImgMax / maskMax + 'px'
    })
})