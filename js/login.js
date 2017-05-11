/**
 * Created by liuli on 2016/12/7.
 */

// 记住用户
$(".js-remember").on('click',function(){
    console.log($(this).find('span'))
    if($(this).find('span').hasClass('checked')){
        $(this).find('span').removeClass('checked');
    }else{
        $(this).find('span').addClass('checked');
    }
})


//登录页面 checkbox 选中不选中效果
$('.js-auto').on('click',function(){
    if($(this).hasClass('input-noremember')){
        $(this).removeClass('input-noremember')
    }else{
        $(this).addClass('input-noremember')
    }
})

// 登录 前端验证
$.idcode.setCode();   //加载生成验证码方法
$("#butn").click(function(){
    var username = $('#username').val();
    var password = $('#password').val();
    var Txtidcode = $('#Txtidcode').val();
    if(username == '' || password == '' || Txtidcode == ''){
        ShowFailure('请完整填写登录信息');
    }else{
        var IsBy = $.idcode.validateCode();  //调用返回值，返回值结果为true或者false
        console.log(IsBy)
        if(IsBy){
            console.log('验证码输入正确');
            // window.location.href = "main.html";
        }else {
            ShowFailure('验证码输入错误');
        }
    }

})