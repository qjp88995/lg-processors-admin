	
/**
 * demo：
 * jg.alert('内容','标题');
 * jg.confirm('内容','标题',function(){确认按钮点击执行函数},function(){取消按钮点击执行函数});
 * jg.countDown({
 * 	title:'标题',
 *  content:'内容',
 *  seconds:倒计时（秒）
 * });
 * jg.open(url,'标题');
 * 
 * @author  pzr
 * 
 */
	$(function(){
		$('body').on('click','.jgmsg .js-icon-close',function(){
			$(this).parents('.jgmsg').remove();
			if(jg.i)clearInterval(jg.i);
		})
	});
	jg={
			initParam(j){
				if(!j.title)jg.t='';else jg.t=j.title;
				if(!j.content)jg.c='';else jg.c=j.content;
				if(!j.seconds||isNaN(j.seconds*1000)||Math.floor(j.seconds)!=j.seconds){jg.s=3;jg.ms=3000;}
				else{jg.s=j.seconds*10;jg.ms=j.seconds*10000;}
			},
			alert:function(c,t){
				if(!c)c='';if(!t)t='';
				var html='<div class="wrap-small-1 jgmsg" style="display: block;"><div class="mask"></div><div class="dialog small-popup"><div class="dialog-header"><h2>'
					+t+'</h2><a href="javascript:void(0);" class="icon btn-close js-icon-close"></a></div><div class="dialog-content"><span>'
					+c+'</span></div></div></div>';
				$('body').append(html);
			},
			confirm(c,t,f1,f2){
				if(!t)t='';if(!c)c='确定提交吗？';
				var html='<div class="wrap-small-2 jgmsg confirm" style="display: block;"><div class="mask"></div><div class="dialog small-popup"><div class="dialog-header"><h2>'
						+t+'</h2><a href="javascript:void(0);" class="icon btn-close js-icon-close"></a></div><div class="dialog-content small-popup-content pdt30"><span>'
						+c+'</span></div><div class="dialog-btn"><a href="javascript:jg.cf(true);" class="btn-bot-com btn-confirm mr5">确定</a><a href="javascript:jg.cf(false);" class="btn-bot-com btn-unconfirm">取消</a></div></div></div>';
				$('body').append(html);
				if(f1&&typeof f1=='function')jg.cf.f1=f1;
				if(f2&&typeof f2=='function')jg.cf.f2=f2;
			},
			countDown(j){//
				jg.initParam(j);
				var html = '<div class="wrap-small-3 jgmsg countDown" style="display: block;"><div class="mask"></div><div class="dialog small-popup"><div class="dialog-header"><h2>'
				 	+jg.t+'</h2><a href="javascript:void(0);" class="icon btn-close js-icon-close"></a></div><p class="dialog-content"><i class="icon correct-select"></i><br><span>'
			      	+jg.c+'</span><br><span class="count-down"><span class="time-sec">'
			      	+jg.s+'</span>s&nbsp;后返回列表页面</span></p></div></div>';
				$('body').append(html);
				var s = jg.s;
				jg.i = setInterval(function(){
					s=s-1;$(".wrap-small-3 .time-sec").text(s);if(s==0){clearInterval(jg.i);$(".jgmsg.countDown").remove();}
				},1000);
			},
			open(c,t){
				if(!t)t='';
				if(!c)return;
				$.ajax({
					url:c,
					type:'post',
					success:function(page){
						var html='<div class="wrap-large-1 jgmsg open" style="display: block;"><div class="mask"></div><div class="dialog large-popup"><div class="dialog-header"><h2>'
								+t+'</h2><a href="javascript:void(0);" class="icon btn-close js-icon-close"></a></div><div class="dialog-content" style="">'
								+page+'</div></div></div>';
						$('body').append(html);
					},
					error:function(jqXHR, textStatus, errorThrown){
						console.info("-----ajax.error-----")
						  /*弹出jqXHR对象的信息
			            console.info(jqXHR.responseText);
			            console.info(jqXHR.status);
			            console.info(jqXHR.readyState);
			            console.info(jqXHR.statusText);*/
			            /*弹出其他两个参数的信息
			            console.info(textStatus);
			            console.info(errorThrown);*/
					}
				});
			},
			cf(b){
				if(b&&jg.cf.f1)jg.cf.f1();
				if(!b&&jg.cf.f2)jg.cf.f2();
				$(o).parents('.jgmsg').remove();
			},
			close(o){
				if(o)$(o).parents('.jgmsg').remove();
				else $(".jgmsg").remove();
			}
		}
	
	
		 	

	
	
	