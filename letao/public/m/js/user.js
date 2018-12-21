/**
 * 退出登录
 * 1.获取到退出登录按钮并添加点击事件
 * 2.调用退出登录接口实现 退出登录
 * 3.如果退出成功 跳转到首页
 */
var userinfo = null;
$.ajax({
    url: "/user/queryUserMessage",
    type: "GET",
    async:false,
    success: function (res) {
        //console.log(res);
        if (res.error && res.error == 400) {
            location.href = "login.html";
        }
        userinfo = res;
    }
});

$(function () {
    $("#logout").on("tap", function () {
        $.ajax({
            url: "/user/logout",
            type: "get",
            success: function (res) {
                //console.log(res);
                mui.toast("登出成功");
                if (res.success && res.success == true) {
                    setTimeout(function () {
                        location.href = "index.html";
                    }, 1000);
                }

            }
        })
    });
    //展示用户信息
    //console.log(userinfo);
    
    var html=template("usertmp",userinfo);
    console.log(html);
    $("#userInfoBox").html(html);
})