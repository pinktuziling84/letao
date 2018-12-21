$(function () {
    $("#modify-btn").on("tap",function(){
        var oldPassword=$('[name="oldPassword"]').val();
        var password=$('[name="newPassword"]').val();
        var confirmNewPass=$('[name="confirmNewPass"]').val();
        var vCode=$('[name="vCode"]').val();
        if(!oldPassword){
            mui.toast("请输入原来的密码");
            return;
        };
        
        if(password !=confirmNewPass){
            mui.toast("两次输入的密码不一致");
            return;
        };
        console.log($("form").serialize());
        
        $.ajax({
            type: "POST",
            url: "/user/updatePassword",
            // data: {
			// 	oldPassword: originPass,
			// 	newPassword: password,
			// 	vCode: vCode
			// },
            data:$("form").serialize(),
            success: function (response) {
                console.log(response);
                if(response.error&&response.error==401){
                    mui.toast("请输入正确的验证码");
                    return;
                };
                if(response.success){
                    mui.toast("密码修改成功,请重新登录");
                    setTimeout(function () {
                        location.href="login.html";
                    },2000);
                }
                
            }
        });
    });
    $("#getCode").on("tap",function(){
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function(res){
                console.log(res);
                mui.confirm(res.vCode,'验证码',['是','否']);
            }
        });
    })
  
})