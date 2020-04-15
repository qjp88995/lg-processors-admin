$(function() {
	$(".menu").children('li').find("a").removeClass('on');
	$(".infomattop").addClass("on");


	$(".drowdp").on("click",function() {
		drowdArrow(this);
	})
	/**
	 * 下拉/收起
	 * @param {*} ele 
	 */
	function drowdArrow(ele) {
		var drowdCt = $(ele).parents(".list-recd").next(".drowd-container");
		if($(drowdCt).css("display")==="none") {
			$(".drowd-container").hide();
			$(".drowdp").removeClass("drowup-arrow").addClass("drowd-arrow");
			drowdCt.slideDown();
			$(ele).removeClass("drowd-arrow").addClass("drowup-arrow");
		}else {
			drowdCt.slideUp();
			$(ele).removeClass("drowup-arrow").addClass("drowd-arrow");
		}
	}
	/**
	 * 修改操作
	 * 删除操作
	 */
	$(".upd-icon").on("click",function(){
		$(this).parents(".ct-list").find(".before-update").hide();
		$(this).parents(".ct-list").find(".after-update").show();
		$(this).removeClass("upd-icon").addClass("save-icon");
	})
	$(".del-icon").on("click",function() {
		$(this).parents(".ct-list").remove();
	})


	//新增机组加工表 新增条目
	function addCols(obj) {
		var addObj = $(obj).parent("div").parent("li").clone(true);
		addObj.find('.icon-del').css("display","inline-block");
		
		addObj.find(".clearcont").val("");
		addObj.find(".tips-bubble").remove();
		$(obj).parent("div").parent("li").parent("ul").append(addObj);
	}
	// 新增机组加工表 删除条目
	function delCols(obj) {
		$(obj).parent("div").parent("li").remove();
	}

	$(".add-cols").on("click",function() {
		addCols(this);
	});
	$(".del-cols").on("click",function() {
		delCols(this);
	});
})