Html:
<!-- ѡ��ѧУ -->
<div class="row">
    <div class="input-group col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2" style="position: relative">
                <span class="input-group-addon">
                    <i class="fa fa-bank fa-lg">

                    </i>
                </span>
        <input type="text" class="form-control school" name="school" autocomplete="off" placeholder="ѧУ����">
        <ul id="preChoose">
        </ul>
    </div>
</div>

Js��
let $prechoose = $("#preChoose");
let $school = $(".school");
// let namePattern = /^ |(�׶�԰)|(Сѧ)|(����)|(��ѧ)|(����)|(��ѧ)|(ѧԺ)|(ѧУ)| $/;
let page = 0;//��ҳ��ʾ�յ������ݣ������̨��һ�η���10�����ݣ�
let flag = 1;
//    �����û�������ʾ��ʾ��ѧУ
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
                    //Ϊ���ж���������ֵ�Ƿ������ݿ��а�����ѧУ
                    let arrSchool = [];
                    for(var item in jsonSchool) {
                        let this_li = "<li " + " data-id=" + item + " data-name= " + jsonSchool[item] + ">" + jsonSchool[item] + "</li>";
                        //�ĵ���Ƭ����ʽ������ȾODM
                        arrSchool.push(this_li);
                    }
                    //���Ƴ�֮ǰ��Ԫ��
                    $prechoose.empty();
                    //�����Ԫ��
                    $prechoose.prepend(arrSchool);
                    $prechoose.children('li').show();
                },
                error:function (err) {
                    // console.log(err);
                }
            });
        }
    }
//     ��Ԥѡ�����ʱ���ظ�����ʾѧУ
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
                    //Ϊ���ж���������ֵ�Ƿ������ݿ��а�����ѧУ
                    let arrSchool = [];
                    for(var item in jsonSchool) {
                        let this_li = "<li " + " data-id=" + item + " data-name= " + jsonSchool[item] + ">" + jsonSchool[item] + "</li>";
                        //�ĵ���Ƭ����ʽ������ȾODM
                        arrSchool.push(this_li);
                    }
                    //����ʱ����Ҫ�Ƴ�֮ǰ��Ԫ��
                    // $prechoose.empty();
                    //�����Ԫ��
                    $prechoose.append("<hr />");
                    $prechoose.append(arrSchool);
                    $prechoose.children('li').show();
                }else{
                    if(flag){
                        $prechoose.append("<span id='tip-none'>û����...</span>");
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
    //    ������á�ʧȥ�����ʱ����֤��Ϣ
    $school.focus(function () {
        //��ý����ʱ����ʾԤѡ��
        $prechoose.show();
    });
    // function delayDisplay
    $school.blur(function () {
        setTimeout(function(){$prechoose.hide()},200);
        // let this_val = $(this).val();
        // $(this).parent().parent().children("span.tips").show();
        // if(!namePattern.test(this_val)){
        //     if($(this).parent().parent().children("span.tips").length == 0){
        //         $(this).parent().parent().append($('<span class="tips col-xs-offset-2 col-xs-10 col-sm-8 col-sm-offset-2">ѧУ����Ӧ�����׶�԰��Сѧ����ѧ���������磺xxxСѧ</span>'));
        //     }
        //     return false;
        // }else {
        //     $(this).parent().parent().children("span.tips").hide();
        // }
    });
    //    ��������ý������ѧУԤѡ��
    $(".password").focus(function () {
        $prechoose.hide();
    });