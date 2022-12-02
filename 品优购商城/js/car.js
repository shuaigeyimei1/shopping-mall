$(function() {
    //全选反选
    $('.checkall').change(function() {
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))
        //选中的添加背景
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item')
        } else {
            $('.cart-item').removeClass('check-cart-item')
        }
        sum()
        priceSum()
    })
    $('.j-checkbox').change(function() {
        //第一种写法
        // var flag = true
        // for (var i = 0; i < $('.j-checkbox').length; i++) {
        //     if (!$('.j-checkbox').eq(i).prop('checked')) {
        //         flag = false
        //         break
        //     }
        // }
        // $('.checkall').prop('checked', flag)
        //第二种写法
        if ($('.j-checkbox:checked').length == $('.j-checkbox').length && $('.j-checkbox').length != 0) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }
        //选中的添加背景
        $(this).parents('.cart-item').toggleClass('check-cart-item')
        sum()
        priceSum()
    })
    //增商品数量
    $('.increment').click(function() {
        var num = $(this).siblings('.itxt').val()
        $(this).siblings('.itxt').val(++num)
        //修改商品小计
        singleSum($(this), num)
        //总计 .amount-sum em
        sum()
        // 总价 .price-sum em
        priceSum()
    })
    //减商品数量
    $('.decrement').click(function() {
        var num = $(this).siblings('.itxt').val()
        if (num == 1) {
            return false
        } else {
            $(this).siblings('.itxt').val(--num)
        }
        //修改商品小计
        singleSum($(this), num)
        //总计 .amount-sum em
        sum()
        // 总价 .price-sum em
        priceSum()
    })
    //手动修改数量
    $('.itxt').change(function() {
        var num = $(this).val()
        //修改商品小计
        singleSum($(this), num)
        //总计 .amount-sum em
        sum()
        // 总价 .price-sum em
        priceSum()
    })
    //修改商品小计
    function singleSum(obj, num) {
        var price = obj.parents('.p-num').siblings('.p-price').text()
        price = price.substr(1)
        var sum = '￥' + (price * num).toFixed(2)
        obj.parents('.p-num').siblings('.p-sum').text(sum)
    }
    //总计 .amount-sum em
    function sum() {
        var sum = 0
        $.each($('.itxt'), function(i, element) {
            if ($(element).parents('.p-num').siblings('.p-checkbox').children().prop('checked') == true) {
                sum += Number($(element).val())
            }
            
        })
        $('.amount-sum em').html(sum)
    }
    sum()
    // 总价 .price-sum em
    function priceSum() {
        var sum = 0
        $.each($('.p-sum'), function(i, element) {
            if ($(element).siblings('.p-checkbox').children().prop('checked') == true) {
                var tem = parseFloat($(element).html().substr(1))
                sum += tem
            }
            
        })
        $('.price-sum em').html('￥' + sum.toFixed(2))
    }
    priceSum()
    //删除单个商品
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove()
        sum()
        priceSum()
    })
    //删除选中
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove()
        sum()
        priceSum()
    })
    //清理购物车
    $('.clear-all').click(function() {
        $('.cart-item').remove()
        sum()
        priceSum()
    })
})