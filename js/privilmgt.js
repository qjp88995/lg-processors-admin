$(function() {
	//头部选择财务管理选项
	$(".menu").children('li').find("a").removeClass('on');
	$(".basicinfotop").addClass('on');


	// 新增员工遮罩层开始
	$("#addNewStaffBtn").on("click",function(){
		$("#addNewStaff").removeClass("hide").addClass("show");
	});
	//关闭遮罩层
	$(".btn-close").on("click",function(){
		$(this).parents(".mask-wrap").removeClass("show").addClass("hide");
	});
	$("#btnAddrole").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['300px'],
			content: $("#btnAddroleMask"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	});
	
	// 点击新增岗位按钮
	$(".add-post-btn").on("click",function(){
		$(".add-post-content").show();
	});
	// 输入位置信息保存
	$(".postsave-info").on("click",function(){
		//将输入框中的信息添加到ul里面
		var val = $(this).prev("input").val();
		if(val){
			var str = '<li>'
			+'<a href="javascript:void(0);" title="'+val+'">'+val+'</a>'
			+'</li>';

			$(".simult-cont").prepend(str);

			$(this).parents(".add-post-content").hide();
		}
	});

	// 新增员工遮罩层结束


	//获取第几个按钮被选中的下标值
	$(".checkradio").on("click",function(){
		radioCheck();
	});
	$(".author-list-content").on("click","li",function(){

		radioCheckLi(this);

	});
	//点击整行进行选中对应的radio
	function radioCheckLi(obj){
		var  $radio = $(obj).find("input[type=radio]");    
	    if( !$radio.is(":checked") ){
	        $radio.prop("checked",true);   
	    }
	    radioCheck();
	}
	//选中状态
	function radioCheck(){
		var radios = document.getElementsByName("staff-name");
		for(var i=0;i<radios.length;i++){
			if(radios[i].checked){
				//操作对应的右边的信息
				if($(".author-list-detail>li").hasClass("on")){
					$(".author-list-detail>li").removeClass("on");
				}
				$($(".author-list-detail>li")[i]).addClass("on");

				//操作对应的显示的选中的状态的阴影部分
				if($(".author-list-content>li").hasClass("on")){
					$(".author-list-content>li").removeClass("on");
				}
				$($(".author-list-content>li")[i]).addClass("on");

				//给当前的li添加destination目标位置所在的类
				//将移出去上一个的目标位置

				if($(".author-list-content>li").hasClass("destination")){
					$(".author-list-content>li").removeClass("destination");

					$(".author-list-content>li>.cart_nav_title").remove();
				}
				$($(".author-list-content>li")[i]).addClass("destination");
				//当前的这个li下面添加目的地
				$($(".author-list-content>li")[i]).append('<div class="cart_nav_title fr"></div>');
			}
		}
	}



	// 保存效果
	function  addMx(obj) {
		var adddata = '<span class="pri-have">'
	+'<span>'
	+'首页<span>--&gt;</span>加工管理'
	+'</span>'
	+'<i class="icon icon-clear icon-pri-clear"></i>'
	+'</span>'

		$(".destination>.owner").append(adddata);
		//添加购物车效果
		addShopcart(obj);
	}
	$(".save-pri").on("click",function() {
		addMx(this);
	});
	function addShopcart(currentObj) {
		//飞行的物体
		var eleFlyElement = $("#shopcart_fly")[0];
		//目标点
		var eleShopCart = $(".cart_nav_title")[0];

		// 抛物线运动
		var myParabola = funParabola(eleFlyElement, eleShopCart, {
			speed: 200,
			curvature: 0.002,	
			complete: function() {
				eleFlyElement.style.display = "none";
			}
		});

		if (eleFlyElement && eleShopCart) {
			// 滚动大小
			eleFlyElement.style.display = "block";
			//购物车飞行的起点
			eleFlyElement.style.left = $(currentObj).offset().left + "px";
			eleFlyElement.style.top = $(currentObj).offset().top +"px";
				
			// 需要重定位
			myParabola.position().move();
			var fcl = document.getElementById('shopcart_fly').offsetLeft - 10;
			document.getElementById('shopcart_fly').style.left=fcl+'px';
		}
		if($(".cart_nav_title")) {
			var mytop=$(".cart_nav_title").offset().top-200;
		}
		$('body,html').animate({scrollTop: mytop},450);
	}

	//删除权限
	$(".owner").on("click",$(".icon-pri-clear"),function(){
		  layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['300px'],
			content: $("#deletePerm"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	

	});


	// 树状层级菜单开始
	// var setting = {
	// 	data: {
	// 			simpleData: {
	// 				enable: true,
	// 				idKey: "id",
	// 				pIdKey: "pId",
	// 				rootPId: 0
	// 			}
	// 	}
	// };
	// var treeNodes = [
	//     {"id":1, "pId":0, "name":"test1"},
	//     {"id":11, "pId":1, "name":"test11"},
	//     {"id":12, "pId":1, "name":"test12"},
	//     {"id":111, "pId":11, "name":"test111"}
	// ];


	var setting = {
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: 0
			}
		}
	};
	// var zNodes =[
	// 	{ id:1, pId:0, name:"全选", open:true},
	// 	{ id:11, pId:1, name:"首页", open:false},
	// 	{ id:111, pId:1, name:"定制下单",open:false},
	// 	{ id:1111, pId:111, name:"新增入库"},
	// 	{ id:112, pId:1, name:"加工管理"},
	// 	{ id:113, pId:112, name:"订单跟踪"},
	// 	{ id:114, pId:112, name:"入库确认"},
	// 	{ id:115, pId:112, name:"加工单审核"},
	// 	{ id:116, pId:112, name:"生产排单表"},
	// 	{ id:117, pId:112, name:"验收入库"},
	// 	{ id:118, pId:112, name:"提单确认"},
	// 	{ id:119, pId:112, name:"码单出库"},
	// 	{ id:120, pId:112, name:"出门证"},
	// 	{ id:14, pId:1, name:"财务管理", open:false},
	// 	{ id:141, pId:14, name:"出库审核", open:false},
	// 	{ id:142, pId:14, name:"收付款", open:false},
	// 	{ id:143, pId:14, name:"收开票登记", open:false}
		// { id:144, pId:14, name:"成本/废料录入", open:false},
		// { id:145, pId:14, name:"废料出库", open:false},
		// { id:146, pId:14, name:"分红", open:false},
		// { id:15, pId:1, name:"辅料管理"},
		// { id:16, pId:1, name:"物流管理"},
		// { id:17, pId:1, name:"报表管理", open:false},
		// { id:18, pId:1, name:"审批类"},
		// { id:19, pId:1, name:"信息维护"},

	// ];

	var zNodes = [
	{"id":100,"pId":0,"name":"定制下单"},
	{"id":200,"pId":0,"name":"加工管理"},
	{"id":300,"pId":0,"name":"财务管理"},
	{"id":400,"pId":0,"name":"辅料管理"},
	{"id":500,"pId":0,"name":"废料管理"},
	{"id":600,"pId":0,"name":"报表管理"},
	{"id":700,"pId":0,"name":"信息维护"},
	{"id":800,"pId":0,"name":"基本信息"},
	{"id":101,"pId":100,"name":"新增入库"},
	{"id":102,"pId":100,"name":"发布加工单"},
	{"id":103,"pId":100,"name":"申请提货"},
	{"id":501,"pId":500,"name":"废料招标书"},
	{"id":502,"pId":500,"name":"废料录入"},
	{"id":503,"pId":500,"name":"废料出库"},
	{"id":504,"pId":500,"name":"招标书审批"},
	{"id":505,"pId":500,"name":"废料库存明细"},
	{"id":506,"pId":500,"name":"废料输入明细"},
	{"id":601,"pId":600,"name":"订单报表"},
	{"id":602,"pId":600,"name":"货物明细表"},
	{"id":603,"pId":600,"name":"盘点明细表"},
	{"id":604,"pId":600,"name":"人员效益表"},
	{"id":605,"pId":600,"name":"提成系数管理"},
	{"id":701,"pId":700,"name":"加工能力表"},
	{"id":702,"pId":700,"name":"机组信息管理"},
	{"id":703,"pId":700,"name":"商品管理"},
	{"id":704,"pId":700,"name":"维修登记"},
	{"id":801,"pId":800,"name":"人员权限"},
	{"id":802,"pId":800,"name":"角色权限"},
	{"id":803,"pId":800,"name":"新增人员"},
	{"id":804,"pId":800,"name":"账户中心"},
	{"id":805,"pId":800,"name":"注册协议"},
	{"id":201,"pId":200,"name":"订单跟踪"},
	{"id":202,"pId":200,"name":"入库确认"},
	{"id":203,"pId":200,"name":"加工单审核"},
	{"id":204,"pId":200,"name":"生产排单表"},
	{"id":205,"pId":200,"name":"验收入库"},
	{"id":206,"pId":200,"name":"码单出库"},
	{"id":207,"pId":200,"name":"出门证"},
	{"id":301,"pId":300,"name":"收款"},
	{"id":302,"pId":300,"name":"付款"},
	{"id":303,"pId":300,"name":"发票登记"},
	{"id":304,"pId":300,"name":"收票"},
	{"id":305,"pId":300,"name":"废料出入库"},
	{"id":306,"pId":300,"name":"水电维修"},
	{"id":307,"pId":300,"name":"分红"},
	{"id":401,"pId":400,"name":"新增采购"},
	{"id":402,"pId":400,"name":"采购核价"},
	{"id":403,"pId":400,"name":"辅料审批"},
	{"id":404,"pId":400,"name":"辅料入库"},
	{"id":405,"pId":400,"name":"辅料出库"},
	{"id":406,"pId":400,"name":"出库审批"},
	{"id":407,"pId":400,"name":"辅料付款"},
	{"id":408,"pId":400,"name":"客户自备辅料"}
	];

	// var zNodes = [
	// {id:100,pId:0,"name":"定制下单"},
	// {id:200,pId:0,"name":"加工管理"},
	// {id:300,pId:0,"name":"财务管理"},
	// {id:400,pId:0,"name":"辅料管理"},
	// {id:500,pId:0,"name":"废料管理"},
	// {id:600,pId:0,"name":"报表管理"},
	// {id:700,pId:0,"name":"信息维护"},
	// {id:800,pId:0,"name":"基本信息"},
	// {id:101,pId:100,"name":"新增入库"},
	// {id:102,pId:100,"name":"发布加工单"},
	// {id:103,pId:100,"name":"申请提货"},
	// {id:501,pId:500,"name":"废料招标书"},
	// {id:502,pId:500,"name":"废料录入"},
	// {id:503,pId:500,"name":"废料出库"},
	// {id:504,pId:500,"name":"招标书审批"},
	// {id:505,pId:500,"name":"废料库存明细"},
	// {id:506,pId:500,"name":"废料输入明细"},
	// {id:601,pId:600,"name":"订单报表"},
	// {id:602,pId:600,"name":"货物明细表"},
	// {id:603,pId:600,"name":"盘点明细表"},
	// {id:604,pId:600,"name":"人员效益表"},
	// {id:605,pId:600,"name":"提成系数管理"},
	// {id:701,pId:700,"name":"加工能力表"},
	// {id:702,pId:700,"name":"机组信息管理"},
	// {id:703,pId:700,"name":"商品管理"},
	// {id:704,pId:700,"name":"维修登记"},
	// {id:801,pId:800,"name":"人员权限"},
	// {id:802,pId:800,"name":"角色权限"},
	// {id:803,pId:800,"name":"新增人员"},
	// {id:804,pId:800,"name":"账户中心"},
	// {id:805,pId:800,"name":"注册协议"},
	// {id:201,pId:200,"name":"订单跟踪"},
	// {id:202,pId:200,"name":"入库确认"},
	// {id:203,pId:200,"name":"加工单审核"},
	// {id:204,pId:200,"name":"生产排单表"},
	// {id:205,pId:200,"name":"验收入库"},
	// {id:206,pId:200,"name":"码单出库"},
	// {id:207,pId:200,"name":"出门证"},
	// {id:301,pId:300,"name":"收款"},
	// {id:302,pId:300,"name":"付款"},
	// {id:303,pId:300,"name":"发票登记"},
	// {id:304,pId:300,"name":"收票"},
	// {id:305,pId:300,"name":"废料出入库"},
	// {id:306,pId:300,"name":"水电维修"},
	// {id:307,pId:300,"name":"分红"},
	// {id:401,pId:400,"name":"新增采购"},
	// {id:402,pId:400,"name":"采购核价"},
	// {id:403,pId:400,"name":"辅料审批"},
	// {id:404,pId:400,"name":"辅料入库"},
	// {id:405,pId:400,"name":"辅料出库"},
	// {id:406,pId:400,"name":"出库审批"},
	// {id:407,pId:400,"name":"辅料付款"},
	// {id:408,pId:400,"name":"客户自备辅料"}
	// ];

	//用于展现 zTree 的 DOM 容器,setting配置信息，zNodes展示信息
	if($("#privTree").length>0) {
		$.fn.zTree.init($("#privTree"), setting, zNodes);
	}
	// 树状成绩菜单结束

	//账户中心
	$(".update-account-btn").on("click",function() {
		$(this).prev(".account-span").html("111");
	});

	// 账户中心
	// 修改账户昵称
	$("#upTAccountbtn").on("click",function() {
		$(".before-revis").hide();
		$(".after-modifi").show();
	});
	$("#saveUptBtn").on("click",function() {
		var newct = $(this).prev(".account-input").val();
		$(this).parent().prev(".before-revis").show();
		$(this).parent().prev(".before-revis").find(".account-span").html(newct);
		$(this).parent(".after-modifi").hide();
	});

	// 修改密码
	$("#uptPwd").on("click",function() {
		$(this).parent(".login-pwd").hide();
		$(this).parent(".login-pwd").next(".verify-phonb").show();
	});
	//验证码输入正确后
	$("#veriFCodeBtn").on("click",function() {
		$(this).parent().parent(".verify-phonb").hide();
		$(this).parent().parent(".verify-phonb").next(".newold-pwd").show();
	});
	// 修改密码成功按钮
	$("#successUptBtn").on("click",function() {
		$(this).parent().parent(".newold-pwd").hide();
		$(this).parent().parent(".newold-pwd").next(".rtpwd-prompt").show();
	});

	//新增人员
	$(".btn-staff").on("click",function() {
		$(this).parent("div").next(".add-peopel-content").show();
	});
	// 输入位置信息保存
	$(".staffsave-info").on("click",function(){
		//将输入框中的信息添加到ul里面
		var val = $(this).prev(".search-box").find("input").val();
		if(val){
			var str = '<li>'
					+'<span class="staff-name">'
					+val
					+'<i class="icon icon-clear icon-pri-clear"></i>'
					+'</span>'
					+'</li>';
			$(".staff-lists").prepend(str);

			$(this).parent(".add-peopel-content").hide();
		}
	});


	//角色权限新增人员select开始
	$(".avatar-wrap .search-input").on("click",function(e){
	 	stopPro(e);
		 $(this).parent().find('.avatar-search-content').slideToggle(150);
		 $(this).parent().siblings().find('.avatar-search-content').hide();
	});
	$(".avatar-wrap .search-input").next("ul").next("i").on("click",function(e){
		stopPro(e);
		$(this).parent().children('ul').slideToggle(150);
	});
	$(document).on("click",function(e){
		var eo=$(e.target);
	    if($(".avatar-wrap.search-box").is(":visible") && eo.attr("class")!="avatar-search-content" && !eo.parent(".avatar-search-content").length){
	    	$('.avatar-search-content').hide(); 
	    } 
	});
	//搜索中的模拟下拉列表最后一个li元素进行去掉下划线
	$('.avatar-search-content').each(function(index,ele){
		$(ele).children('li:last').addClass('bbnone');
	})	

	//阻止冒泡
	function stopPro(e){
		if(navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.match(/7./i)=="7."|| navigator.appVersion.match(/8./i)=="8.")) 
		{ 
			
			if (event.stopPropagation) { 
			// this code is for Mozilla and Opera 
			event.stopPropagation(); 
			} 
			else if (window.event) { 
			// this code is for IE 
			window.event.cancelBubble = true; 
			}
		}else{
			e.stopPropagation();
		}	
	}
	//角色权限新增人员select结束
})