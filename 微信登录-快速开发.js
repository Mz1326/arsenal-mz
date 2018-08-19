<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script>
    var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
    var plat = function() {
        if(navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ){
            return true;
        }
        else {
            return false;
        }
    }
    $(function(){
        layui.use('layer', function() {
            var $ = layui.jquery, layer = layui.layer;
        })
            $("#wlogin").click(function(){
            $.ajax({
                url:'/s/login/wxlogin',
                type:'post',
                dataType:'json',
                success:function(data){
                    console.log(data); //{code: "200", msg: "2d00c28bd9556b0eb2fdb48a1774b82c"}
                    if(plat()) {
                        if (is_weixin) {
                            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5b9782020d551a72&redirect_uri=https%3A%2F%2Fwww.shinelab.cn%2Fwechat%2Flogin%2Fing&response_type=code&scope=snsapi_userinfo&state=' + data.msg + '#wechat_redirect';
                        } else {
                            layer.msg('移动端只能在微信客户端内使用微信登陆', {
                                time: 2000, //2s后自动关闭
                                btn: ['知道了']
                            });
                        }
                        return false;
                    }
                    if(data.code==200){
                        var obj = new WxLogin({
                            id:"wechatcode",
                            appid: "wx2bccddf4d562806d",
                            scope: "snsapi_login",
                            redirect_uri: "https%3A%2F%2Fwww.shinelab.cn%2Fwechat%2Flogin%2Fin",
                            state: data.msg,
                            style: "black",
                            href: "https://www.shinelab.cn/bundles/new/css/wechat.css"
                        });
                        $('.other-login').addClass('MT0')
                        $('.login-form').addClass('MT5VH')
                    }else{
                        layer.msg('未知错误', {
                            time: 2000, //2s后自动关闭
                            btn: ['知道了']
                        });
                    }
                },
                error:function(){
                    layer.msg('网络错误', {
                        time: 2000, //2s后自动关闭
                        btn: ['知道了']
                    });
                }
            });
        });
    });
</script>