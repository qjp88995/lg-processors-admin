$(function (){
	$(".scroll").on("click",function(){
		$("body").toggleClass("s-small");
	});
	function resizeTopbarH() {
		var hlm = $(".level-menu").height()-13;
		$(".wrapcontent").css("margin-top",hlm+"px");
	}
	resizeTopbarH();

	$(window).resize(function() {
	 	resizeTopbarH();
	});
//设置leftbar的高度
	function setLeftBarH(obj) {
		// var windH = $(window).height();
		var windH;
		//获取窗口高度
		if(window.innerHeight){
			windH = window.innerHeight;
		}else if(document.body && document.body.clientHeight){
			windH = document.body.clientHeight;
		}
		var bodyH = $(".topbar").height()+$(".rightcont").height();
		var leftbarH = $(".leftbar").height();
		if(windH>=bodyH&&windH>=leftbarH) {
			obj.height(windH);
		
		}else if(bodyH>=windH&&bodyH>=leftbarH){
			obj.height(bodyH);
		}else if(leftbarH>=windH&&leftbarH>=bodyH) {
			obj.height(leftbarH);
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

$('input, textarea').placeholder();

$(".search-input").on("click",function(e){
	 stopPro(e);
	 var searchCont = $(this).next(".search-content");
	 // $(this).parent().find('.search-content').slideToggle(150);
	 /*
		将
		$(this).parent().find('.search-content').slideToggle(150);
		$(this).parent().siblings().find('.search-content').hide();
		改成下面的代码
	 */
	  if(searchCont.css("display")=="none"){
     	$(".search-content").hide();
        searchCont.slideDown("fast");
      }else{
        searchCont.slideUp("fast");
      }
      stopPro(e); 
});
$(".search-input").next("ul").next("i").on("click",function(e){
	 stopPro(e);
	$(this).parent().children('ul').slideToggle(150);
});
$(document).on("click",function(e){
	var eo=$(e.target);
    if($(".search-box").is(":visible") && eo.attr("class")!="search-content" && !eo.parent(".search-content").length){
    	$('.search-content').hide(); 
    } 
});
//搜索中的模拟下拉列表最后一个li元素进行去掉下划线
$('.search-content').each(function(index,ele){
	$(ele).children('li:last').addClass('bbnone');
})	


// 选中的值进行设置
$(".search-content").on("click","li",function(event){
	var str = trim($(this).html());
	$(this).parent("ul").prev().val(str);
	$(this).parent("ul").hide();
	event.preventDefault();
});
//删除左右两端的空格
function trim(str){ 　　  
 return str.replace(/(^\s*)|(\s*$)/g, "");  
}

// 搜索结束



// 模拟select开始
// 点击模拟input标签，进行显示/隐藏ul
      $(".simult-select>.simult-input").on("click",function(e){
         var simultCont = $(this).next(".simult-cont");
         if(simultCont.css("display")=="none"){
         	$(".simult-cont").hide();
            simultCont.slideDown("fast");
          }else{
            simultCont.slideUp("fast");
          }
          stopPro(e);
      });
      // 点击内容里面的a标签
      $(".simult-select>.simult-cont a").on("click",function(e){
      	  stopPro(e);
          var txt = $(this).text();
          $(this).parents(".simult-select").find(".simult-input>span").html(txt);
          $(this).parents(".simult-cont").hide();
          $(this).parents(".simult-select").children(".input-val").val(txt);
      });

      $(document).on("click",function(){
        $(".simult-select ul").hide();
      });
      //所有的进行模拟的select的最后一个li元素去掉下划线
      $(".simult-cont").each(function(index,ele){	
      	$(ele).children('li:last').addClass('bbnone');
      });

// 模拟select结束


//上传图片

// var fileName = $("#fileName");
 function handleFile(obj){
	var filevl =  $(obj).val();
    var pos=filevl.lastIndexOf("\\");
    var fname = filevl.substring(pos+1);

	var str = '<span class="fileName positrl mr3">'
		+'<span class="filename-show">'+fname+'</span>'
		+'<i class="icon icon-clear  icon-file-clear" style="display:none;"></i></span>';
	if(fname){
		$(".add-file").append(str);
		
	}
}
$(".input-file").on("change",function() {
	var _this = this;
	handleFile(_this);
})

$(".add-file").on("click","i",function(){
	$(this).parent(".fileName").remove();
});


// 校验数字类型数据
//失去焦点，输入的不是数字，进行显示提示信息
$(".check-num>input").on("blur",function(){
	var regExp = /^(\-|\+)?\d+(\.\d+)?$/;
    var num = $(this).val();
    var str = '<span class="tips-bubble">'+
				'<span>请输入数字</span>'+
				'<i class="arrow"></i>'+
				'</span>';
    if(!regExp.test(num)){
      $(this).parent(".check-num").append(str);
    }
});

//获得焦点进行移除提示信息
$(".check-num>input").on("focus",function(){
	$(this).parent(".check-num").find(".tips-bubble").remove();
});

/*通用tab切换开始*/
function tabs(ele) {
	// tab_menu tab菜单，tab_menu li对应的子菜单
	// tab_box 具体的内容  tab_box div每一个子菜单对应的内容
	var tabWrap = $(ele).parent().parent(".tab-wrap"),
	menu = tabWrap.children( 'ul.tab-menu' ),
	items = menu.find( 'li' ),
	tabBox = tabWrap.children( 'div.tab-box' ).children( 'div.tab-content' );
	
	ele.siblings( 'li' )
		.removeClass( 'current' )
		.end()
		.addClass( 'current' );
		
	tabBox.siblings( 'div.tab-content' )
		.addClass( 'hide' )
		.end()
		.eq( ele.index() )
		.removeClass( 'hide' );
	
}
// 对菜单进行点击，将点击的元传参
$(".tab-wrap .tab-menu>li").on("click",function() {
	var ele = $(this);
	tabs(ele);
});
/*通用tab切换结束*/
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