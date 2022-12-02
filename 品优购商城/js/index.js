window.addEventListener('load', function() {
    var focus = document.querySelector('.foucs')
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    //鼠标经过，显示向左向右按钮，并关闭定时器
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(autoPlay)
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        autoPlay = setInterval(function() {
            arrow_r.click()
        }, 3000)
    })
    var ul = focus.querySelector('ul')
    var ol = focus.querySelector('.circle')
    var focusWidth = focus.offsetWidth//一张图的宽度
    var num = 0 //箭头控制标记
    var circle = 0 //圆圈控制标记
    for (var i = 0; i < ul.children.length; i++) {
        //动态生成小圆圈
        var li = document.createElement('li')
        ol.appendChild(li)
        li.setAttribute('index', i)
        //小圆圈点击事件
        li.addEventListener('click', function() {
            //点击小圆圈变颜色
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
                this.className = 'current'
            }
            //点击小圆圈换图片 ul的left值=-（li的索引号*图片宽度）
            var index = this.getAttribute('index')
            var target = -focusWidth * index
            animate(ul, target)
            //将当前索引号同步
            num = circle = index
        })
    }
    ol.children[0].className = 'current'
    //克隆第一张图片放到最后
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
    //点击右侧按钮,滚动一张图片
    var flag = true//设置节流阀，防止点击过快，图片快速滚动
    arrow_r.addEventListener('click', function() {
        //判断节流阀是否为true
        if (flag) {
            flag = false //关闭节流阀
            //无缝滚动：把第一张图复制一份给最后.如果到了最后一张图片再点击的时候，先left=0直接回到第一张图，再翻页
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++
            animate(ul, -num * focusWidth, function() {
                flag = true //开启节流阀
            })
            circle++
            if (circle == ul.children.length - 1) {
                circle = 0
            }
            //调用函数
            circleChange()
        }
    })
    //点击左侧按钮,滚动一张图片
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false
            //无缝滚动：如果到了第一张图片再点击的时候，先left=最后，直接回到最后一张图，再翻页
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num * focusWidth + 'px'
            }
            num--
            animate(ul, -num * focusWidth, function() {
                flag = true
            })
            circle--
            if (circle == -1) {
                circle = ul.children.length - 2
            }
            //调用函数
            circleChange()
        }
    })
    var circleChange = function() {
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
            ol.children[circle].className = 'current'
        }
    }
    //轮播图自动播放
    var autoPlay = setInterval(function() {
        arrow_r.click()
    }, 3000)
    //电梯导航
    var flag = true //节流阀 互斥锁
    var distance = $('.recom-hd').offset().top
    // 滚动到今日推荐时显示导航,且滑动变色
    function show() {
        if ($(document).scrollTop() >= distance) {
            $('.fixedtool').fadeIn()
            current()
        } else {
            $('.fixedtool').fadeOut()
        }
    }
    function current() {
        if (flag) {
            $.each($('.floor .w'), function(i, element) {
                var top = $(document).scrollTop()
                if (top >= $(element).offset().top-2) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current')
                    console.log(i)
                }
            })
        }
    }
    show()
    $(window).scroll(function() {
        show()
    })
    //点击相应按钮跳转到区域
    $('.fixedtool li').click(function() {
        flag = false
        $(this).addClass('current').siblings().removeClass('current')
        var distance = $('.floor .w').eq($(this).index()).offset().top
        $('html').animate({
            scrollTop: distance
        }, function() {
            setTimeout(function() {
                flag = true
            })
        })
    })
})