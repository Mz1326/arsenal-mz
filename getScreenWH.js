/**
 * Created by MZ on 2017/12/13.
 */
function getSCrollOffsets(w) {
    //使用指定的窗口，如果不带参数则使用当前窗口
    w = w||window;
    //除了IE8及更早的版本以外，其他浏览器都能用
    if(w.pageXOffset !=null) return {x:w.pageXOffset,y:w.pageYOffset};
    //对标准模式的IE(其他任意浏览器)
    var d = w.document;
    if(document.compatMode == "CSS1Compat")
        return {
            x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop
        };
    //对于怪异模式
    return{
        x:d.body.scrollLeft,y:d.body.scrollTop
    };
}