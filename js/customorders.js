$(function() {
	// 头部选中定制下单
$(".menu").children('li').find("a").removeClass('on');
$(".customorders").addClass('on');

//上传图片

 function handleFile(){
	var filevl =  $("#file").val();
    var pos=filevl.lastIndexOf("\\");
    var fname = filevl.substring(pos+1);

	var str = '<span class="fileName positrl mr3">'
		+'<span class="filename-show">'+fname+'</span>'
		+'<i class="icon icon-clear  icon-file-clear" style="display:none;"></i>';
	if(fname){
		$(".add-file").append(str);
	}
}
$(".add-file").on("click","i",function(){
	$(this).parent(".fileName").remove();
});

// 隐藏第一个品名行的删除按钮
$($(".cust-li>div>.icon-del")[0]).css("display","none");
// 新增明细

$(".opt-adddetail").on("click",function(){
	var lastli = $(".ul-list-class>.list-class").length-1;
	var orglnode = $($(".ul-list-class>.list-class")[lastli]).clone(true);
	var lengthUl = $(orglnode.children("li")).length;
	if(lengthUl>2) {
		for(var i = lengthUl-1;i>1;i--) {
			$($(orglnode.children("li"))[i]).remove();
		}
	}
	//品名类设置空
	orglnode.find(".search-input").val("");
	//第二行信息设置空
	orglnode.find(".txt-input").val("");
	// 单位设置空
	orglnode.find("input[type='hidden']").val("张");
	orglnode.find(".simult-input>span").html("张");
	
	// 显示出clone元素的品名行的删除按钮
	$(orglnode.find(".icon-del")[0]).css("display","inline-block");
	$(".ul-list-class").append(orglnode);
});


// 新增品名行的子行
//入库 新增条目
function addCols(obj) {
	var addObj = $(obj).parent("div").parent("li").clone(true);
	//进行清除克隆出来的数据
	addObj.find(".txt-input").val("");
	addObj.find(".simult-input>span").html("张");
	addObj.find("input[type='hidden']").val("张");

	addObj.find('.icon-del').css("display","inline-block");
	addObj.find('.icon-add').remove();
	$(obj).parent("div").parent("li").parent("ul").append(addObj);
}
$(".add-line").on("click",function() {
	addCols(this);
});
// 入库 删除条目
function delCols(obj) {
	$(obj).parent("div").parent("li").remove();
}
$(".delete-line").on("click",function() {
	delCols(this);
});
function delPCols(obj) {
	$(obj).parent("div").parent("li").parent(".list-class").remove();
}

$(".delp-cols").on("click",function() {
	delPCols(this);
})
// 清除输入框里面的值
function clearInput(obj){
	$(obj).prev("input").val('');	
}
$(".clear-input").on("click",function() {
	clearInput(this);
});
// 发布加工单开始
$(".option-radio-checked").on("click","li",function(){
	$(this).parent(".option-radio-checked").children("li").removeClass("on");
	$(this).addClass("on");
});
$(".option-more-checked").on("click","li",function(){
	$(this).addClass("on");
});

$(".custom-processlist").on("click",".turn-method",function() {
	if($(this).hasClass("on")) {
		$(this).removeClass("on");
	}else {
		$(this).addClass("on");
	}
});
// 发布加工单 选择原料 开始

$(".releaseware-select").on("click",function(){
	// layer.open({
	// 	type: 1, 
	// 	skin: 'dialog-cont-pd',
	// 	title: "选择原料",
	// 	area: ['900px'],
	// 	content: $("#receiveCharge"), //这里content是一个DOM
	// 	resize:false,
	// 	shadeClose : true,
	// 	move: false
	// });
	
	layer.open({
		type: 2,
		title: '选择原料',
		content: 'chooserawmtr2.html',
		area: ['900px', '500px']
	});
	
});
// 发布加工单 选择原料 结束


// 点击加工尺寸
$(".custom-processlist").on("click",".mach-size",function() {
	$(this).parent().parent("li").next("li").toggle();
	$(this).parent().parent("li").parent("ul").next(".total-list").toggle();

	setTimeout(function() {
		$(".tips-bubble.package-wrap").remove();
	},2000);
});

$("#tg-checked").on("click",function() {
	if($(this).attr("checked")=="checked") {
		$(this).parent().parent().prev(".package-wrap-tg").show();
	}
});

function addrlspro(obj) {
	var rlsp = $(obj).parents(".release-prolist").clone();
	//将clone的数据进行情况
	rlsp.find(".txt-input").val("");
	rlsp.find(".simult-select-num>.input-val").val("张");
	rlsp.find(".simult-select-num>.simult-input-num>span").html("张");

	rlsp.find(".simult-select-metering>.input-val").val("抄码");
	rlsp.find(".simult-select-metering>.simult-input-metering>span").html("抄码");

	// 将加工尺寸多余的数量进行清除
	//去遍历第二个li中的数据，从高到低进行移除，只有第一条数据custom-list-class
	var removeNode = $(rlsp.find(".custom-list-class>li")[1]).find("li.list-classdd");
	var lengthLi = $(rlsp.find(".custom-list-class>li")[1]).find("li.list-classdd").length
	if(lengthLi>1) {
		for(var i=lengthLi-1;i>=1;i--) {
		// 进行减掉
		removeNode[i].remove();
		}
	}

	$(rlsp).find(".addshow").remove();
	$(rlsp).find(".deleteshow").css("display","inline-block");
	$(".custom-processlist").append(rlsp);
}

function deleterlspro(obj) {
	var deleteNode = $(obj).parent().parent(".custom-list-classdd");
	deleteNode.remove();
}

$(".addrls-pro").on("click",function() {
	addrlspro(this);
});

$(".custom-processlist").on("click",".deleterls-pro",function() {
	deleterlspro(this);
});

$("#simultitFime>li").on("click",function() {
	var txtSI = $(this).html();
	var thisUl = $(this).parents(".simult-select").parent("ul");
	if(txtSI=="自行备膜"||txtSI=="仓库供膜") {
		thisUl.find(".ss-sibli-sd").show();
		thisUl.find(".ss-sibli-color").show();
		thisUl.find(".ss-sibli-s").show();
	} else {
		thisUl.find(".ss-sibli-sd").hide();
		thisUl.find(".ss-sibli-color").hide();
		thisUl.find(".ss-sibli-s").hide();
	}
});
// 发布加工单结束


// 申请提货开始

$(".applyfd-select").on("click",function(){
	layer.open({
		type: 1, 
		skin: 'dialog-cont-pd',
		title: "选择原料",
		area: ['900px'],
		content: $("#alySelectPro"), //这里content是一个DOM
		resize:false,
		shadeClose : true,
		move: false
	});
});


// 点击选择原料可以进行选择整行
$(".dialog-recharge-list>.dialog-b>.list-class").on("click","li",function(){
	if($(this).find("input[type='checkbox']").attr("checked")=="checked") {
		$(this).find("input[type='checkbox']").removeAttr("checked","checked");
	} else {
		$(this).find("input[type='checkbox']").attr("checked","checked");
	}
});

// 自提或是代运
$("#dlymtdUl").on("click","li",function() {
	$(this).parent("#dlymtdUl").children("li").removeClass("on");
	$(this).addClass("on");
	if($(this).html()=="自提") {
		$(".since-li").show();
		$(".transport-li").hide();
	}else if($(this).html()=="代运") {
		$(".transport-li").show();
		$(".since-li").hide();

	}
});

$(".right-trans").on("click","li",function() {
	if($(this).html()=="提货") {
		$(".out-req").show();
		$(".accept-unit").hide();
	}else {
		$(".out-req").hide();
		$(".accept-unit").show();
	}
});
// 申请提货结束


/*
发布加工单：选择加工方式下面的加工尺寸进行对应的显示与隐藏
*/
$(".opt-promtd").on("click","li",function() {
	$(this).parent("ul").children("li").removeClass("on");
	$(this).addClass("on");
	console.log($(this).html());
	// 横切、切边开平、校平、切割、去钢印、涂漆  pro-method1
	// 长宽厚   _张_吨 每包_吨(吨/张)

	// 分卷、重卷、更新包装 pro-method4  
	// 长宽厚 _件 _吨 每包_吨(吨/张)
	var val = $(this).html();
	if(val==="横切"||val==="切边开平"||val==="校平"||val==="切割"||val==="去钢印"||val==="涂漆"
		||val==="分卷"||val==="重卷"||val==="更新包装"
		) {
		$(".pro-method23").hide();
		$(".pro-method14").show();
		if(val==="横切"||val==="切边开平"||val==="校平"||val==="切割"||val==="去钢印"||val==="涂漆") {
			$(".pro-method14 .pro-method4").hide();
			$(".pro-method14 .pro-method1").show();
		}else if(val==="分卷"||val==="重卷"||val==="更新包装"){
			$(".pro-method14 .pro-method4").show();
			$(".pro-method14 .pro-method1").hide();
		}
	}else if(val==="纵剪"||val==="纵剪+横切") {
		// 		pro-method23
		// 纵剪   pro-method2
		// 长宽厚 _条 _吨 中切_刀

		// 纵剪+横切  pro-method3
		// 长宽厚 _条 _吨 中切_刀 转横切
		$(".pro-method14").hide();
		$(".pro-method23").show();
		if(val==="纵剪") {
			$(".pro-method3").hide();
			// $(".pro-method23 .pro-method2").show();
		}else if(val==="纵剪+横切") {
			$(".pro-method3").show();
			// $(".pro-method23 .pro-method2").hide();
			$(".pro-method23 .pro-method3").show();
		}
	}
})
})
