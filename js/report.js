$(function() {
	$(".menu").children('li').find("a").removeClass('on');
	$(".rptmgttop").addClass("on");

	// 现货明细表，修改/保存库位号
	$(".modify-local").on("click",function() {
		var beforeM = $(this).parents(".before-revis");
		var afterM = $(this).parents(".before-revis").next(".after-modifi");
		var md = new Modifytxt(beforeM,afterM);
		md.modifyBtn();
	})

	$(".saveicon-btn").on("click",function() {
		var afterM = $(this).parents(".after-modifi");
		var beforeM = $(this).parents(".after-modifi").prev(".before-revis");
		var md = new Modifytxt(beforeM,afterM);
		md.saveBtn();
	})
	function Modifytxt(beforeM,afterM) {
		this.beforeM = beforeM;
		this.afterM = afterM;
	}
	Modifytxt.prototype = {
		modifyBtn : function() {
			this.beforeM.hide();
			this.afterM.find(".local-input").val(this.beforeM.find("span").html());
			this.afterM.show();
		},
		saveBtn : function() {
			this.beforeM.show();
			this.beforeM.find("span").html(this.afterM.find(".local-input").val());
			this.afterM.hide();
		}
	}

	// 结算单位信息
	$(".msg-says-dot").hover(function(){
		$(this).parent(".msg-says-wrap").find(".msg-says").show();
	},function(){
		$(this).parent(".msg-says-wrap").find(".msg-says").hide();
	})
})