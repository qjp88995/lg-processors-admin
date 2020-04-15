defiend(["jquery"],function($) {
	$(".scroll").on("click",function(){
		$("body").toggleClass("s-small");
	});
	function resizeTopbarH() {
		$(".wrapcontent").css("margin-top",$(".level-menu").height()+"px");
	}
	resizeTopbarH();

	$(window).resize(function() {
	 	resizeTopbarH();
	});
	//设置leftbar的高度
	function setLeftBarH(obj) {
		var windH = $(window).height();
		var bodyH = $(".topbar").height()+$(".rightcont").height();
		if(windH>=bodyH) {
			obj.height(windH);
		}else {
			obj.height(bodyH);
		}
	}
	setLeftBarH($(".leftbar"));
	// 鼠标滚轮重新设置高度
	$(document.body).on("mousewheel",function() {
		setLeftBarH($(".leftbar"));
	});
	// window的scroll手动进行滚动的效果
	$(window).on("scroll",function() {
		setLeftBarH($(".leftbar"));
	});
})