$(function() {
	$(".menu").children('li').find("a").removeClass('on');
	$(".finlmgttop").addClass("on");


	// 通知公告
	$(".announcement .btn-close").on("click",function() {
		$(this).parents(".announcement").hide();
	})

	// 结算单位信息
	$(".msg-says-dot").hover(function(){
		$(this).parent(".msg-says-wrap").find(".msg-says").show();
	},function(){
		$(this).parent(".msg-says-wrap").find(".msg-says").hide();
	})
	// 点击出现receiveCharge弹出框  20171114 layer充值弹出框
	$("#showCharge").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'prepaid-recharge',
			title: "预付款充值",
			area: ['620px'],
			content: $("#preRecharge"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})

	/*
	点击按钮showlist-detail，进行将自身的列表进行隐藏
	对应的详情列表进行显示

	*/
	$(".showlist-detail").on("click",function() {
		showlistDt(this)
	})
	function showlistDt(ele) {
		$(ele).parents(".content-bottom").hide().next(".receivcomp-detail").show()
	}

	// 收款方式
	$(".pay-right input[name='cash']").on("click",function() {
		if($(this).val()==="现收"||$(this).val()==="微信支付"||$(this).val()==="支付宝支付") {
			$(this).parents(".pay-right").children(".not-onlinebank").show();
		}else {
			$(this).parents(".pay-right").children(".not-onlinebank").hide();
		}
	})

	// 余额详细信息
	$(".balance-display").on("click",function() {
		$(this).next(".balance-displayul").toggleClass("hide");
	})

	//receptBtn 收款按钮成功
	$("#receptBtn").on("click",function() {
		$(this).parent().prev().hide();
		$(this).parent().hide();
		$(this).parent().next(".payment-tips").show();

		// 点击收款按钮之后，开始执行倒计时，等倒计时到1s时。进行跳收款页面并且清除定时器
		var timeSec = $(this).parent().next(".payment-tips").find(".time-sec");
		// setTimer(timeSec,"receipt.html");
	})


	// paymentBtn 付款按钮成功
	$("#paymentBtn").on("click",function() {
		$(this).parent().prev().hide();
		$(this).parent().hide();
		$(this).parent().next(".payment-tips").show();

		// 点击付款按钮之后，开始执行倒计时，等倒计时到1s时。进行跳付款页面并且清除定时器
		var timeSec = $(this).parent().next(".payment-tips").find(".time-sec");
		setTimer(timeSec,"paymentlist.html");
	})
	// 付款申请开始
	$(".apply-amount").on("click",function() {
		$("#appAmtDetail").show();
	})
	$("#appAmtDetail .js-icon-close").on("click",function() {
		$(this).parents("#appAmtDetail").hide();
	})
	//付款申请结束
	// saveInvBtn 收票保存按钮成功
	$("#saveInvBtn").on("click",function() {
		$(this).parent().prev().hide();
		$(this).parent().hide();
		$(this).parent().next(".payment-tips").show();

		// 点击付款按钮之后，开始执行倒计时，等倒计时到1s时。进行跳付款页面并且清除定时器
		var timeSec = $(this).parent().next(".payment-tips").find(".time-sec");
		setTimer(timeSec,"receiveinvoice.html");
	})

	function setTimer(ele,loadhref) {
		var timer = setInterval(function(){
			var count = $(ele).text();
			if(count==1){
				location.href = loadhref;

				clearInterval(timer);
			}else {
				count--;
				console.log(1);
				$(ele).text(count);
			}
		},1000);
	}	
	// 设置提示信息遮罩层关闭
	function setTimerMask(ele) {
		var timer = setInterval(function(){
			var count = $(ele).text();
			if(count==1){
				layer.closeAll();
				clearInterval(timer);
			}else {
				count--;
				$(ele).text(count);
			}
		},1000);
	}	

	// 收票
	$(".invoice-type input[type='radio']").on("click",function() {
		if($(this).val()==="增票") {
			$(this).parents(".invoice-type").next(".tax-rate").show();
		}else {
			$(this).parents(".invoice-type").next(".tax-rate").hide();
		}
	})
	// 待开票已开详情金额信息
	$(".amountpoint").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['900px'],
			content: $("#tobebillDetail"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})
	

	$(".haspoint").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['900px'],
			content: $("#hasbillDetail"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})

	//开票中的快递信息开始
	$(".express-info").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "快递信息",
			area: ['620px'],
			content: $("#pickupWay"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})
	//开票中的快递信息结束

	//已开票中的快递到家展开
	$(".showephome0").on("click",function() {
		if($("#ephome0").hasClass("hide")) {
			$("#ephome0").removeClass("hide").addClass("show");
		}else if($("#ephome0").hasClass("show")) {
			$("#ephome0").removeClass("show").addClass("hide");
		}
		
	})
	// 水电维修申请点击修改
	// 修改账户昵称
	$(".upt-money-btn").on("click",function() {
		var beforeUpdate = $(this).parent(".before-update");
		var afterUpdate = beforeUpdate.next(".after-update");
		beforeUpdate.hide();
		afterUpdate.show();
		afterUpdate.find(".money-input").val(beforeUpdate.find(".money-span").html())
	});
	$(".save-money-btn").on("click",function() {
		var newct = $(this).prev(".money-input").val();
		$(this).parent().prev(".before-update").show();
		$(this).parent().prev(".before-update").find(".money-span").html(newct);
		$(this).parent(".after-update").hide();
	});

	// 收款统计表 点击收款金额 进行显示弹出框中的详细信息  layer 20171114 开始
	$(".show-setdtls").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'receipt-amount',
			title: "<span>上海炬远实业有限公司</span> / <span>160137_01_P12_O12</span>",
			area: ['620px'],
			content: $("#receiptAmount"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})
	/*
		将金额进行千分号分割正则表达式
	*/
	function formatNumberRgx(num) {  
	  var parts = num.toString().split(".");  
	  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
	  return parts.join(".");  
	}; 	
	if($(".formatNum").html()) {
		console.log($(".formatNum").html());
		$(".formatNum").html(formatNumberRgx($(".formatNum").html()));
	}
	// 发票登记，开票详情弹出来提示
	$(".regdetail").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['900px'],
			content: $("#hasregDetail"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})

	// 发票登记，发票作废弹出框提示信息
	$(".opt-invoice").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['300px'],
			content: $("#confirmInvc"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})

	$("#confirmInvc .btn-confirm").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['300px'],
			content: $("#confirmInvcSuc"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
		// 设置作废成功信息关闭遮罩层提示信息
		var timeSec = $("#confirmInvcSuc").find(".time-sec");
		setTimerMask(timeSec);
	})
	$("#confirmInvcSuc .btn-close").on("click",function() {
		$(this).parents("#confirmInvcSuc").hide();
	})
	// 发票登记 点击已付款，出现付款的详细信息
	$(".ald-paid input[type='checkbox']").on("click",function() {
		if($(this).prop("checked")) {
			$(this).parents(".list-right").find(".paid-li").show();
		}else {
			$(this).parents(".list-right").find(".paid-li").hide();
		}
	})
	

	//水电维修费审批节点
	$(".telesc-wrap>.telesc-btn").on("click",function() {
		var telescWrap = $(this).parent(".telesc-wrap");
		var contentBottom = telescWrap.parent(".content-bottom");
		var loadingMore = contentBottom.find(".loading-more-cont");

		if($(this).html()=="展开") {
			$(this).html("收起");
			contentBottom.find(".list-class.pro-list li").show();
			loadingMore.show();
			telescWrap.css({
				paddingBottom: "20px"
			})
		}else if($(this).html()=="收起") {
			$(this).html("展开");
			$(contentBottom.find(".list-class.pro-list li")).each(function(index) {
				if(index>=2){
					$(this).hide();
				}
			})
			loadingMore.hide();
		}
	})

	// 水电维修付款按钮
	$("#watmaintBtn").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "付款提示信息",
			area: ['300px'],
			content: $("#paydialog"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})
	$("#paydialog .btn-close").on("click",function() {
		$(this).parents("#paydialog").hide();
	})

	// 付款审批中的弹出框 layer 20171114

	$(".pop-approve").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['480px'],
			content: $("#paymentApprl"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})
	


	// 保存效果
	function  addMx(obj) {
		var adddata = '<li class="list-classdd clearfix list-cont-bd">'
		+'<div class="w35 pdtb17">'
		+'<span>HYA台湾线</span>'
		+'</div>'
		+'<div class="w15 pdtb17">'
		+'<span>80462.62</span>元'
		+'</div>'
		+'<div class="w20 pdtb17">'
		+'<span>华冶A区</span>'
		+'</div>'
		+'<div class="w30">'
		+'<span>上海炬远实业有限公司</span>'
		+'<br>'
		+'<span>'
		+'<span class="ft12">李凡娅</span> / '
		+'<span class="ft12">2017-03-30 17:44:27</span>'
		+'</span>'
		+'</div>'
		+'</li>';
		$(".destination").prepend(adddata);
		//添加购物车效果
		addShopcart(obj);
	}

	function addMxwaterele(obj) {
		var adddata = '<li class="list-classdd clearfix list-cont-bd">'
		+'<div class="w30 pdtb17">'
		+'<span>水费</span>'
		+'（<span class="ft12">2016-11</span>）'
		+'</div>'
		+'<div class="w20 pdtb17 money-wrap">'
		+'<span class="before-update">'
		+'<span class="mr2 money-span">80462.62</span>元'
		+'<a href="javascript:void(0);" class="upt-money-btn">修改</a>'
		+'</span>'

		+'<span class="after-update" style="display: none;">'
		+'<input type="text" class="money-input">'
		+'<i class="icon icon-save-info save-money-btn" title="保存"></i>'
		+'</span>'
		+'</div>'
		+'<div class="w20 pdtb17">'
		+'<span>华冶A区</span>'
		+'</div>'
		+'<div class="w30">'
		+'<span>上海炬远实业有限公司</span>'
		+'<br>'
		+'<span class="ft12">'
		+'<span>李凡娅</span> / '
		+'<span>2017-03-30 17:44:27</span>'
		+'</span>'
		+'</div>'
		+'</li>';


		$(".destination").prepend(adddata);
		//添加购物车效果
		addShopcart(obj);
	}
	$(".save-pri").on("click",function() {
		addMx(this);
	});

	$(".apply-waterelefee").on("click",function() {
		addMxwaterele(this);
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

	//佣金审核

	$(".cbtn-approval").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "提示",
			area: ['480px'],
			content: $("#approveBox"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	
	})
})