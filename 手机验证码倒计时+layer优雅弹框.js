// �ֻ�����֤����֤
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
            layer.msg('�ֻ��Ų���ȷ', {icon: 5,anim: 6});
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
                        layer.msg('��֤�뷢��ʧ�ܣ����Ժ����ԣ�', {icon:2,anim: 6});
                    }else if(judge[0] == '200' && judge[1] == '���ͳɹ�'){
                        layer.msg('��֤�뷢�ͳɹ�����ע����գ�', {icon:1,anim: 3});
                    }else if(judge[0] == '-2'){
                        layer.msg('����Ƶ������', {icon:2,anim: 6});
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
        $(obj).val('��ȡ��֤��');
        countdown = 60;
        return;
    } else {
        $(obj).attr("disabled",'disabled').addClass('disabled');
        $(obj).val(countdown +' s'+' �����»�ȡ');
        countdown--;
    }
    setTimeout(function() {sendCode(obj) },1000)
}