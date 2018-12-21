/*
 1、获取认证码
        1、绑定点击事件
        2、发送ajax
        3、获取成功后的返回值，然后在输入
    2、点击注册按钮
        1、获取表单值
        2、校验表单值
        3、发送ajax  =====传入必填参数  字段必须对应  
        4、获取成功后的返回值
            判断返回值  res.success  ||  res.error
            满足res.success   实现跳转===登录页面
*/
/**
	 * 注册
	 * 1.给注册按钮添加点击事件
	 * 2.获取到用户注册的信息
	 * 3.对用户输入的信息做验证
	 * 4.调用注册接口 实现注册功能
	 * 5.给出提示 告诉用户是否注册成功
	 * 6.跳转到登录页面
	 */

$(function(){
    $("#register-btn").on("tap",function(){
       // console.log(111)
      var username=$('[name="username"]').val();
      var mobile=$('[name="mobile"]').val();
      var password=$('[name="password"]').val();
      var againPass=$('[name="againPass"]').val();
      var vCode=$('[name="vCode"]').val();
      //console.log(vCode)
    //   if(!username){
    //       mui.toast("请输入用户名");
    //       return;
    //   }
    //   if(mobile.length<11){
    //       mui.toast("请输入合法手机号码");
    //       return;
    //   }
    //   if(!password==againPass){
    //       mui.toast("两次输入的密码不一样");
    //       return;
    //   }
        $.ajax({
            url:"/user/register",
            type:"post",
            // data:{
            //     username:username,
            //     password:password,
            //     mobile:mobile,
            //     vCode:vCode
            // },
            data:$("form").serialize(),
            success:function (res) {
                console.log(res);
                 
                if(res.success){
                    mui.toast("注册成功");
                    setTimeout(function () {
                        location.href="login.html";
                      },1500)
                }else if(res.error==401){
                    mui.toast("验证码错误");
                }else if(res.error==403){
                    mui.toast("用户名已经存在");
                }else if(res.error==403){
                    mui.toast("手机号已注册过");
                }

             }
           //  {"success":true}
// { "error": 400, "message": "用户未登录" }
// { "error": 401, "message": "验证码错误!" }
// { "error": 403, "message": "用户名未填写！" }
// { "error": 403, "message": "密码未填写！" }
// { "error": 403, "message": "用户名已经存在!!!" }
// { "error": 403, "message": "手机号已注册过!!!" }
// { "error": 403, "message": "数据库异常！" }
        })
    });
    //获取验证码:
    $("#getCode").on("tap",function(){
        $.ajax({
            url:"/user/vCode",
            type:"get",
            success:function(res){
               // console.log(res);
                mui.confirm(res.vCode,"你的验证码",["是","否"])     
            }
        })
    })
})