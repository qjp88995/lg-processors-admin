$(function() {
	$(".menu").children('li').find("a").removeClass('on');
	$(".accmgttop").addClass("on");

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
// 申请采购审核状态开始
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

	//审核弹出框
	$(".appr-btn").on("click",function(){
		$("#approveBox").show();
		var topDialog = $("#approveBox .dialog").height();
		$("#approveBox .dialog").css("margin-top",-Math.round(topDialog/2));
	})
	$("#approveBox .js-icon-close").on("click",function() {
		$(this).parents("#approveBox").hide();
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


	// 盘点明细开始
	// 结算单位信息
	$(".msg-says-dot").hover(function(){
		$(this).parent(".msg-says-wrap").find(".msg-says").show();
	},function(){
		$(this).parent(".msg-says-wrap").find(".msg-says").hide();
	})

	$(".inventory").on("click",function() {
		layer.open({
			type: 1, 
			skin: 'dialog-cont-pd',
			title: "盘点明细作废",
			area: ['300px'],
			content: $("#confirmDetail"), //这里content是一个DOM
			resize:false,
			shadeClose : true,
			move: false
		});	

	})

	// 盘点明细结束

	// 修改和保存
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
});

// 固定定位