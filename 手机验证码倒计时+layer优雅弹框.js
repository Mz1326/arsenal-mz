// 手机号验证码验证
layui.use('layer', function(){
    var layer = layui.layer;
});
let countdown=60;
function sendCode(obj) {
    const phonergx= /^1[3|4|5|7|8|9][0-9]{9}$/;
    let isEmpty = $(obj).parents('.layui-form').find('.phone-input').val();
    // console.log($(this).parents('.layui-form'));
    // alert(isEmpty)
    let f = 1;
    if(countdown == 60){
        // console.log(isEmpty);
        (function () {
            if(phonergx.test(isEmpty)){
                f = 1;
            }else {
                f = 0;
            }
            return phonergx.test(isEmpty);
        })()
        if(!isEmpty || (f==0)){
            layer.msg('手机号不正确', {icon: 5,anim: 6});
            return false;
        }else {
            $.ajax({
                url:'/s/register/doverify',
                type:'POST',
                async:false,
                data:{mobile:isEmpty,category:'common'},
                success:function (data) {
                    // console.log('data: ',data);
                    let judge = data.split(';');
                    if(judge[0] == '500'){
                        layer.msg('验证码发送失败，请稍后重试！', {icon:2,anim: 6});
                    }else if(judge[0] == '200' && judge[1] == '发送成功'){
                        layer.msg('验证码发送成功，请注意查收！', {icon:1,anim: 3});
                    }else if(judge[0] == '-2'){
                        layer.msg('请勿频繁请求', {icon:2,anim: 6});
                    }
                    // console.log(judge);
                },
                err:function (err) {
                    console.log(err);
                }
            })
        }
    }
    if (countdown == 0) {
        $(obj).removeAttr("disabled",'disabled').removeClass('disabled');
        $(obj).val('获取验证码');
        countdown = 60;
        return;
    } else {
        $(obj).attr("disabled",'disabled').addClass('disabled');
        $(obj).val(countdown +' s'+' 后重新获取');
        countdown--;
    }
    setTimeout(function() {sendCode(obj) },1000)
}