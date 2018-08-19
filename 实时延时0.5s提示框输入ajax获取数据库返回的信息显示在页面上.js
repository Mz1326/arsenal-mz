Html:
<!-- 选择学校 -->
<div class="row">
    <div class="input-group col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2" style="position: relative">
                <span class="input-group-addon">
                    <i class="fa fa-bank fa-lg">

                    </i>
                </span>
        <input type="text" class="form-control school" name="school" autocomplete="off" placeholder="学校名称">
        <ul id="preChoose">
        </ul>
    </div>
</div>

Js：
let $prechoose = $("#preChoose");
let $school = $(".school");
// let namePattern = /^ |(幼儿园)|(小学)|(初中)|(中学)|(高中)|(大学)|(学院)|(学校)| $/;
let page = 0;//分页显示收到的数据（这里后台是一次返回10条数据）
let flag = 1;
//    根据用户输入显示提示的学校
function searchSchool() {
        let inputNama = $school.val();
        if(!inputNama){
            $prechoose.children('li').hide();
        }else {
            flag = 1;
            page = 0;
            $.ajax({
                type:'post',
                url:'/ajax/school',
                data:{name:inputNama,pag:page},
                dataType:"json",
                success:function (data) {
                    let jsonSchool = data.msg;
                    //为了判断最后输入的值是否是数据库中包含的学校
                    let arrSchool = [];
                    for(var item in jsonSchool) {
                        let this_li = "<li " + " data-id=" + item + " data-name= " + jsonSchool[item] + ">" + jsonSchool[item] + "</li>";
                        //文档碎片的形式加载渲染ODM
                        arrSchool.push(this_li);
                    }
                    //先移除之前的元素
                    $prechoose.empty();
                    //添加新元素
                    $prechoose.prepend(arrSchool);
                    $prechoose.children('li').show();
                },
                error:function (err) {
                    // console.log(err);
                }
            });
        }
    }
//     当预选框滚动时加载更多提示学校
$prechoose.on("scroll", function (e) {
    var sum = this.scrollHeight;
    if (sum <= $(this).scrollTop() + $(this).height()) {
        let inputName = $school.val();
        page++;
        $.ajax({
            type:'post',
            url:'/ajax/school',
            data:{name:inputName,pag:page},
            dataType:"json",
            success:function (data) {
                let jsonSchool = data.msg;
                if(JSON.stringify(jsonSchool).length>2){
                    //为了判断最后输入的值是否是数据库中包含的学校
                    let arrSchool = [];
                    for(var item in jsonSchool) {
                        let this_li = "<li " + " data-id=" + item + " data-name= " + jsonSchool[item] + ">" + jsonSchool[item] + "</li>";
                        //文档碎片的形式加载渲染ODM
                        arrSchool.push(this_li);
                    }
                    //滚动时不需要移除之前的元素
                    // $prechoose.empty();
                    //添加新元素
                    $prechoose.append("<hr />");
                    $prechoose.append(arrSchool);
                    $prechoose.children('li').show();
                }else{
                    if(flag){
                        $prechoose.append("<span id='tip-none'>没有了...</span>");
                        flag =!1;
                    }
                }
            },
            error:function (err) {
                // console.log(err);
            }
        });
    }
});
let delayTimer;
$school.bind("input propertychange",function () {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
        searchSchool();
    },500)
    });
    //    输入框获得、失去焦点的时候验证信息
    $school.focus(function () {
        //获得焦点的时候显示预选框
        $prechoose.show();
    });
    // function delayDisplay
    $school.blur(function () {
        setTimeout(function(){$prechoose.hide()},200);
        // let this_val = $(this).val();
        // $(this).parent().parent().children("span.tips").show();
        // if(!namePattern.test(this_val)){
        //     if($(this).parent().parent().children("span.tips").length == 0){
        //         $(this).parent().parent().append($('<span class="tips col-xs-offset-2 col-xs-10 col-sm-8 col-sm-offset-2">学校名称应包含幼儿园、小学、中学等字样，如：xxx小学</span>'));
        //     }
        //     return false;
        // }else {
        //     $(this).parent().parent().children("span.tips").hide();
        // }
    });
    //    当密码框获得焦点清除学校预选框
    $(".password").focus(function () {
        $prechoose.hide();
    });