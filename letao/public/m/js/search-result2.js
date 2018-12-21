// 获取地址栏中用户输入的关键字
var keyword=new URLSearchParams(location.search).get("keyword");
//console.log(keyword);
//var keyword=getParamsByUrl(location.href,"keyword");
//console.log(keyword);
//字符切割
function getParamsByUrl(url,name){
    var params=url.substr(url.indexOf("?")+1);
    var param=params.split("&");
    for(var i =0; i <param.length;i++){
    	var	current=param[i].split("=");
    	console.log(current)
    	if(current[0]==name){
    		return current[1]
		}
	}
}

// 当前页
var page=1;
// 页面中的数据
var html="";
// 价格排序规则 升序
var priceSort=1;
//销售量 排序规则 升序
var sales=1;
//声明一个空变量
var This=null;
$(function(){
    //上拉加载
    mui.init({
        pullRefresh : {
          container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });
        $("#priceSort").on("tap",function () {
        priceSort=priceSort ==1? 2:1;
        html="";
        page=1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });


	$("#salesValue").on("tap",function(){
		//console.log(111)
		sales=sales ==1? 2:1;
		html="";
		page=1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
        console.log(sales)

	})
});

function getData() {

	if(!This){
		This = this;
	}

	$.ajax({
		url: '/product/queryProduct',
		type: 'get',
		data: {
			page: page++,
			pageSize: 2,
			proName: keyword,
			//price: priceSort,
			num:sales
		},
		success: function(response){
//console.log(response);

			if(response.data.length > 0){

				html += template('search-result', response);

				$('#search-box').html(html);

				// 告诉上拉加载组件当前数据加载完毕
				This.endPullupToRefresh(false);

			}else {

				// 告诉上拉加载组件当前数据加载完毕
				This.endPullupToRefresh(true);

			}
		}

	});

}




