/**
 * 用户登录
 * 1.获取登录按钮并且添加点击事件
 * 2.获取到用户输入的表单信息
 * 3.调用登录接口实现登录
 * 4.如果用户登录成功跳转到会员中心
 */
$(function () {
    $("#login-btn").on("tap", function () {
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        $(".jiazai").addClass("mui-icon mui-icon-spinner-cycle mui-spin");
        $.ajax({
            url: "/user/login",
            type: "post",
            data: $("form").serialize(),
            beforeSend: function (e) {
                // console.log(e);
                $("#login-btn").html("正在登录...");
            },
            success: function (param) {
                //console.log(param);

                if (param.error) {
                    setTimeout(function () {
                        $("#login-btn").html("登录");
                        $(".jiazai").removeClass("mui-icon mui-icon-spinner-cycle mui-spin");
                        if (!username) {
                            mui.toast("请输入用户名");
                        } else if (!password) {
                            mui.toast("请输入密码");
                        }
                    }, 1000);
                } else if (param.success) {
                    setTimeout(function () {
                        location.href = "user.html";
                        $("#login-btn").html("登录");
                        $(".jiazai").removeClass("mui-icon mui-icon-spinner-cycle mui-spin");
                    }, 1500)

                }
            }
        })

    });


})