$(function() {
	// 头部选中加工管理
$(".menu").children('li').find("a").removeClass('on');
$(".promgttop").addClass('on');

//入库 新增条目
function addCols(obj) {
	var addObj = $(obj).parent("div").parent("li").clone(true);
	addObj.find('.icon-del').css("display","inline-block");
	addObj.find('.icon-add').remove();

	addObj.find(".clearcont").attr("placeholder","");
	addObj.find(".clearcont").val("");
	addObj.find(".tips-bubble").remove();

	// 清除模拟select数据
	addObj.find("cleardatainput").val("");
	addObj.find(".cleardataspan").html("");
	$(obj).parent("div").parent("li").parent("ul").append(addObj);
}
// 入库 删除条目
function delCols(obj) {
	$(obj).parent("div").parent("li").remove();
}

$(".add-cols").on("click",function() {
	addCols(this);
});
$(".del-cols").on("click",function() {
	delCols(this);
});
// 清除输入框里面的值
function clearInput(obj){
	$(obj).prev("input").val('');	
}
$(".icon-set-clear").on("click",function() {
	clearInput(this);
})


// 排产页面js
//输入延期时间
function setDelayTime(obj){
	$(obj).next().toggle();
}
$(".setdelay-time").on("click",function() {
	setDelayTime(this);
});
//排单页面搜索部分，待排单和排单页面布局显示
// $("#searchPc").on("click",function(){
// 		if($("#pdInput").val()=="待排单"){
// 				$(".wait-scheduling").css({
// 					"display" : "block"
// 				});
// 				$(".complete-scheduling").css({
// 					"display" : "none"
// 				})
// 		}else if($("#pdInput").val()=="已排单"){
// 				$(".wait-scheduling").css({
// 					"display" : "none"
// 				});
// 				$(".complete-scheduling").css({
// 					"display" : "block"
// 				})
// 		}
// })

// 排单页面勾选
$(".scheduling-ul").on("click","li",function(e){
	$(this).find(".pc-select").toggle();
});
//阻止排单页面事件冒泡
$("textarea").on("click",function(e){
	stopPro(e);
});

$("select").on("click",function(e){
	stopPro(e);
});
$(".icon-clock").on("click",function(e){
	stopPro(e);
})


//排单页面tab切换

//待排单中点击详情出现的信息
// $(".waittab-content .comp-name-a").on("click",function(){
// 	$(".waittab-content .top-wait").hide();
// 	$(".waittab-content .bottom-wait").show();
// });

// 排产详情页面  更多详情链接 
$(".more-detail-a").on("click",function(){
	if($(this).parent(".more-detail").next(".more-detail-cont").hasClass('dn')){
		$(this).parent(".more-detail").next(".more-detail-cont").removeClass('dn')
		$(this).html("收起详情");
	}else {
		$(this).parent(".more-detail").next(".more-detail-cont").addClass('dn')
		$(this).html("更多详情");
	}
});

// 详细信息tab切换
$(".company-list-content").on("click","li",function(){
	var liIndex = $(this).index();
	
	$(this).addClass('on').siblings('li').removeClass("on");
	
	var lis = $(this).parents(".sch-compy-list").next(".sch-pro-detail").children('.mch-seq-detail');


	$(lis[liIndex]).removeClass('dn').siblings().addClass('dn');
	
});	

// 待排产详情返回待排产列表
$(".return-waitlist").on("click",function(){
	$(".top-wait").show();
	$(".bottom-wait").hide();
	window.location.reload(); 
});

//已排单部分js
$(".completedtab-content .comp-name-a").on("click",function(){
	$(".completedtab-content .top-completed").hide();
	$(".completedtab-content .bottom-completed").show();
});

$(".return-completedlist").on("click",function(){
	$(".completedtab-content .top-completed").show();
	$(".completedtab-content .bottom-completed").hide();
});

//待排单页面结束
// 验收页面开始
$(".recCheck").on("change",function(){
	$(this).parent().next().toggle();
})
// 验收页面结束

$(".scheduling-ul-detail").on("click","li",function(){
	var str = '<i class="icon selecticon-white"></i>';
	$(this).append(str).siblings('li').find('.selecticon-white').remove();
})


// 设置
function wraprightH() {
	$(".wrapright").css("margin-top",$(".level-menu").height()+"px");
	$(".comp-list-t").css("padding-top",$(".level-menu").height()+"px");
}
wraprightH();
function compScroll(obj){
	var w = Math.round(($(".side-comp").width()/$(document).width())*100);
	if(w=="14"){
		$(obj).next(".comp-list-showhidden").hide();
		$(obj).parents(".mcontent").addClass("comp-active");
	}else{
		$(obj).parents(".mcontent").removeClass("comp-active")
		$(obj).next(".comp-list-showhidden").show();
	}
}

$("#compScroll").on("click",function() {
	compScroll(this);
});
$(".icon-flex").on("click",function(){
	$(this).parent(".cargo-info-inner").find('.inner-content').slideToggle();
});

$(".inner-title").on("click",function(){
	$(this).next(".inner-content").slideToggle();
})
// 订单详情页面结束



// 修改文本
$(".invoice-modify").on("click",".icon-update",function(){
	var cont = $(this).prev(".contentSpan").html();
	cont = $.trim(cont);
	var str = '<input type="text" id="update-txt" class="w42 txt-input bradius4" value="'+cont+'">';
	$(this).prev(".contentSpan").html(str);
	$(this).parent(".invoice-modify").append('<i class="icon icon-cmark"></i>')
	$(this).remove();
});

$(".invoice-modify").on("click",".icon-cmark",function(){
	var val = $(this).parent(".invoice-modify").children('.contentSpan').children('input').val();
	$(this).parent(".invoice-modify").children('.contentSpan').html(val);
	$(this).parent(".invoice-modify").append('<i class="icon icon-update"></i>')
	$(this).remove();
});

// 加工单审核
// 是否审核
$(".simult-cont li a").on("click",function(){
	if($.trim($(this).html())=="委外加工"){

		$(".pro-unit").addClass('dn');
		$(".outs-pro").addClass('db').removeClass("dn");
	}else if($.trim($(this).html())=="不委外加工"){
		$(".outs-pro").addClass('dn');
		$(".pro-unit").addClass('db').removeClass("dn");
	}		
})
// 加工单 添加加工机组 不委外加工
$(".simult-cont-pro>li>a").on("click",function(){
	var val = $(this).text();
	if(val){
		// 进行添加值到后面
		var str = '<span class="fileName positrl mr3 file-lad">'
		+'<span class="filename-show">'+val+'</span>'
		+'<i class="icon icon-clear  icon-file-clear" id="ll" style="display:none;">'	
		+'</i>'
		+'</span>';
		$(".prounit-show").append(str);

		// 将小圆点的提示信息进行显示出来
		// 在需要校验的地方加上tips-info，设置了相对定位
		var tipstr = '<span class="tips-dot"></span>'
					+'<span class="tips-bubble" style="display: none;">'
					+'<span>提示信息</span>'
					+'<i class="arrow"></i>'
					+'</span>';
		$(".tips-info").append(tipstr);
		// 位置跳到新增加的位置
		var tdtop = $($(".tips-dot")[0]).offset().top;
		$('html,body').animate({scrollTop:tdtop-200},'slow');
	}
})

// 鼠标移上去的时候进行显示对应的提示信息
$(".tips-info").on("hover",".tips-dot",function(){
	$(this).next("span").toggle();
});

// 商品详情页面设置左边公司列表信息
function setSideCompH(obj) {
	var rightcontH = $(".rightcont").innerHeight();
	$(obj).height(rightcontH);
}
setSideCompH($(".side-comp"));


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
})