$(function(){
	$(".jgs2016_smul a").on("click",function(){
		var str="";
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
			}
		$(this).parents(".jgs2016_smul").find("a").each(function(){
			if($(this).hasClass("on")){
			str=str+$(this).text()+",";	
			}										  
		})
		str=str.substring(0,str.length-1)
		$(this).parents(".jgs2016_smul").find("input").val(str);
	})
	$(document).on('click',hide);	
	})

	function hide(){
		$(".selone").hide();
	}

	function delColYl(obj){
		myobj=$(obj).parents(".jgs2016_yllist").remove();
		
	}

	function del_all(obj){
		$(obj).parents(".jg_again").remove();
	}

	//tiemo
	function istiemo(obj,e){
		stopProp(e);
		$(obj).parent().find("a").removeClass("on");
		var x=$(obj).offset().left;
		var y=$(obj).offset().top+$(obj).height();
		$(obj).next("").css({"left":x,"top":y});
		
		if($(obj).next().css("display")=="none")
		{	$(obj).parents(".jgfs_tiemo").find(".selone").hide();
			$(obj).next().show();
			$(obj).next().children().children().find("ul").hide();
		}else{
			$(obj).next().hide();
		}
		if($(obj).text()=="自行备膜"){
			$(obj).parents(".jgfs_tiemo").children("a").eq(1).text("仓库供膜");
			$("#tieMo").val("自行备膜");
		}else 
		if($(obj).text()=="仓库供膜"){
			$(obj).parents(".jgfs_tiemo").children("a").eq(0).text("自行备膜");
			$(obj).parents(".jgfs_tiemo").find("input[type=hidden]").val('');
			$("#tieMo").val("仓库供膜");
		}
	}

	function tm_setValue(obj){
		$(obj).parent().prev("a").text($("#tieMo").val()+"-"+$(obj).text());
		$(obj).parent().hide();
		$(obj).parents(".jgfs_tiemo").children("a").removeClass("on");
		$(obj).parent().prev("a").addClass("on");
		$("#jgfs_tm").prev("a").text("仓库供膜");
		$(obj).parents(".jgfs_tiemo").find("input[type=hidden]").val($("#tieMo").val()+"-"+$(obj).text());
	}

	//贴膜 三级 菜单 select one
	function levelTreeOne(obj,e,str){
		stopProp(e);
		$(obj).parent("li").siblings().find("a").removeClass("on");
		$(obj).addClass("on");
		$(obj).parents("ul").find("li").find("ul."+str).hide();
		$(obj).next("ul").show();
	}

	function levelTreeSet(obj,e){
		stopProp(e);
		var str="";
		$(obj).parent("ul").find("a").removeClass("on");
		$(obj).addClass("on");
		$(obj).parents(".selone").find("a").each(function(){
			if($(this).hasClass("on")){
				str=str+$(this).text()+"-";	
			}
		})
		str=str.substring(0,str.length-1)
		$(obj).parents(".selone").prev("a").text($("#tieMo").val()+"-"+str);
		$(obj).parents(".selone").prev("a").addClass("on")
		$(obj).parents(".selone").hide();
		$(obj).parent("ul").hide();
		$(obj).parent("ul").parent("li").parent("ul").hide();
		$(obj).parents(".jgfs_tiemo").find("input[type=hidden]").val($("#tieMo").val()+"-"+str);
	}

	function stopProp(e){
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

	/**
	 * 初始化加工尺寸
	 * */
	function initYLFormForComp(){
		//初始化合包标记
	    $(".jgs2016_yllist").find("i").each(function(){
	    	$(this).parents(".list2_num").find("input[type='checkbox']").prop("checked",false);
	    	$(this).parents(".list2_num").find("input[type='checkbox']").attr("disabled",false);
	    	$(this).parent("span.hbbg").hide();
			$(this).parents(".list2_num").find("input[name$='packageName']").val("");
		});
		$("#stockInfo").find(".jgs2016_yllist").remove();//初始化删除库存加工明细
		$("#stockInfo").hide();
	    $("#inLineInfo").show();
	    $("#sumbitForStock").hide();
	    $("#sumbitForIn").show();
	    rowNum = 1;
	    $("#hbCount").val(1);
	}

	function initYLForm(obj){
		$(obj).parents(".jgs2016_yllist").find(".jgs2016_jgddown").remove();//初始化删除预入库加工明细
	    $(obj).parents(".jgs2016_yllist").find(".jgs2016_jgddown").remove();//初始化删除库存加工明细
	    rowNum = 1;
	    //初始化合包标记
	    $(".jgs2016_yllist").find("i").each(function(){
	    	$(this).parents(".list2_num").find("input[type='checkbox']").prop("checked",false);
	    	$(this).parents(".list2_num").find("input[type='checkbox']").attr("disabled",false);
	    	$(this).parent("span.hbbg").hide();
			$(this).parents(".list2_num").find("input[name$='packageName']").val("");
		});
	    $("#hbCount").val(1);
	}

	var rowNum = 1;
	//预入库下单
	function add_numCols(obj,index,code){
		var procedureNameStr = "";
		var procTypeName = $("#procTypeName").val();
		var steSpec = $(obj).parents(".list2_num").find("input[name$='steSpec']").val();
		var thick = $(obj).parents(".list2_num").find("input[name='thick']").val();
		var wide = $(obj).parents(".list2_num").find("input[name='wide']").val();
		var longed = $(obj).parents(".list2_num").find("input[name='longed']").val();
		if(procTypeName=="纵剪"){
			wide = "";
		}
		if(procTypeName=="横切"){
			longed = "";
		}
		var quantity = 1;//$(obj).parents(".list2_num").find("input[name$='quantity']").val();
		var weight = 0//$(obj).parents(".list2_num").find("input[name$='weight']").val();
		var procWeight = $(obj).parents(".list2_num").find("input[name$='procWeight']").val();
		var knifeOrder = $(obj).parents(".list2_num").find("input[name$='knifeOrder']").val();
		var knifeCount = $(obj).parents(".list2_num").find("input[name$='knifeCount']").val();
		var procedureName = $(obj).parents(".list2_num").find("input[name$='procedureName']").val();
		var zjbtStr = "";
		var rowCode = rowNum;
		if(procTypeName=="纵剪+横切"){
			if($(obj).attr("title")=="转横切"){
				procedureNameStr = "<input name='inLineList["+index+"].procProductLineList["+rowNum+"].procedureName' type='text' size='4' value='横切' readonly='readonly' style='border:none'/>&nbsp;&nbsp;&nbsp;&nbsp;";
				rowCode = code;
				longed = "";
				if(wide==""){alert("纵剪宽度不能为空！");return;}
			}else{
				procedureNameStr = "<input name='inLineList["+index+"].procProductLineList["+rowNum+"].procedureName' type='text' size='4' value='"+procedureName+"' onClick='setValue(this,event,7)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
				   "<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>&nbsp;&nbsp;&nbsp;&nbsp;";
				if(procedureName=="纵剪"){
					wide = "";
				}else
				if(procedureName=="横切"){
					longed = "";
				}	
			}
			zjbtStr = "<span class='spank' style='width:4px'></span><a class='jgs2016_jgbut' href='javascript:void(0)' onClick='add_numCols(this,"+index+","+rowNum+")' title='转横切'>转横切</a>&nbsp;&nbsp;<span name='hqsyInfo'></span>";
		}
		var str = "<div class='list2_num' name='product"+rowCode+"'><span class='fl'>"+
						"<div class='checksel fl' style='margin-top:5px' onclick='setOptionHb(this)'>"+
					   	"<input class='' name='prod' value='checkbox' type='checkbox'><label></label>"+
					    "</div>&nbsp;&nbsp;"+procedureNameStr+
					    "<span class='hbbg' style='display:none;'></span>"+
					    "<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].packageName'/>"+
						"<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].procWeight' value='"+procWeight+"'/>"+
				        "厚<input type='text' name='thick' size='3' value='"+thick+"' readonly='readonly' style='border:none'/>*"+
				        "宽<input type='text' name='wide' size='4' value='"+wide+"' onchange='changeSpec(this,1)'/>*"+
				        "长<input type='text' name='longed' size='3' value='"+longed+"' onchange='changeSpec(this,2)'/>"+
				        "<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].steSpec' value='"+steSpec+"'/> "+                                         
				        "<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].procPrice'/> "+
				        "<span class='jgs_priceshow ell' name='s_price' title='预估单价仅供参考，以实际结算单价为准' style='width:45px;color:#3b96dd;cursor:pointer'></span>"+
				        "<span class='spank' style='width:15px'></span>"+
				        "<input type='text' name='inLineList["+index+"].procProductLineList["+rowNum+"].quantity' onchange='changeSpec(this,3)' value='"+quantity+"' size='3' placeholder='数量'/><span name='unit'></span>"+
				        "<input type='text' da='cpzl' name='inLineList["+index+"].procProductLineList["+rowNum+"].weight' onchange='changeSpec(this,4)' value='"+weight+"' size='4' placeholder='重量'/>吨"+ 
				        "<span class='spank' style='width:15px'></span>"+
				        "<span class='iszongjian'><input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].knifeOrder' value='"+knifeOrder+"'/>"+
				 		"中切<input type='text' name='inLineList["+index+"].procProductLineList["+rowNum+"].knifeCount' onchange='changeKnifeCount(this)' size='4' value='"+knifeCount+"' placeholder='不中切'/>刀"+zjbtStr+"</span>"+
				 		"<span class='ishengqie'>每包<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].packetMarking' value='0'/>"+
				 								"<input type='text' style='display:none;' name='inLineList["+index+"].procProductLineList["+rowNum+"].bagQuantity' onchange='changeBagS(this)' placeholder='标准张数' size='5'>"+
				 								"<input type='text' name='inLineList["+index+"].procProductLineList["+rowNum+"].bagWeight' onchange='changeBagW(this)' placeholder='标准包重' size='4'>"+
				 								"<input type='text' size='3' value='吨' onClick='setValue(this,event,9)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
				 								"<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>"+
				 								"</span>&nbsp;&nbsp;<span name='bagCount'></span>"+
				 								"<input type='text' name='inLineList["+index+"].procProductLineList["+rowNum+"].partNo' onchange='changePartNo(this)' placeholder='零件号' size='4'>"+
						"</span>"+
						 "<span class='delall'>"+
						    "<a class='but_del' style='display:inline-block;' href='javascript:void(0)' onClick='del_numCols(this)'></a>"+
						 "</span>"+
				   "</div>";
		rowNum++;
		var updateObj = $(obj).parents("div[name='proDatail']");
		if($(obj).attr("title")=="转横切"){
			var len = updateObj.find("div[name='product"+rowCode+"']").length;
			var myObject=updateObj.find("div[name='product"+rowCode+"']").eq(len-1);
			$(str).insertAfter(myObject);
		}else{
			$(str).insertBefore(updateObj.find("div[name='totalInfo']"));
		}
		var myobj = $(obj).parents(".jgs2016_jgddown");
		setProcType(myobj);
		var nameStr = $(obj).parents(".list2_num").attr("name");
		sumDivWeight(updateObj,nameStr);
	}
	//库存下单
	function add_numColsForCK(obj,index,code){
		var procedureNameStr = "";
		var procTypeName = $("#procTypeName").val();
		var thick = $(obj).parents(".list2_num").find("input[name='thick']").val();
		var wide = $(obj).parents(".list2_num").find("input[name='wide']").val();
		var longed = $(obj).parents(".list2_num").find("input[name='longed']").val();
		if(procTypeName=="纵剪"){
			wide = "";
		}
		if(procTypeName=="横切"){
			longed = "";
		}
		var steSpec = $(obj).parents(".list2_num").find("input[name$='steSpec']").val();
		var quantity = 1;//$(obj).parents(".list2_num").find("input[name$='quantity']").val();
		var weight = 0//$(obj).parents(".list2_num").find("input[name$='weight']").val();
		var procWeight = $(obj).parents(".list2_num").find("input[name$='procWeight']").val();
		var knifeOrder = $(obj).parents(".list2_num").find("input[name$='knifeOrder']").val();
		var knifeCount = $(obj).parents(".list2_num").find("input[name$='knifeCount']").val();
		var procedureName = $(obj).parents(".list2_num").find("input[name$='procedureName']").val();
		var zjbtStr = "";
		var rowCode = rowNum;
		if(procTypeName=="纵剪+横切"){
			if($(obj).attr("title")=="转横切"){
				procedureNameStr = "<input name='procLine["+index+"].procProductLineList["+rowNum+"].procedureName' type='text' size='4' value='横切' readonly='readonly' style='border:none'/>&nbsp;&nbsp;&nbsp;&nbsp;";
				rowCode = code;
				longed = "";
				if(wide==""){alert("纵剪宽度不能为空！");return;}
			}else{
				procedureNameStr = "<input name='procLine["+index+"].procProductLineList["+rowNum+"].procedureName' type='text' size='4' value='"+procedureName+"' onClick='setValue(this,event,7)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
				   "<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>&nbsp;&nbsp;&nbsp;&nbsp;";
				if(procedureName=="纵剪"){
					wide = "";
				}else
				if(procedureName=="横切"){
					longed = "";
				}
			}
			zjbtStr = "<span class='spank' style='width:4px'></span><a class='jgs2016_jgbut' href='javascript:void(0)' onClick='add_numColsForCK(this,"+index+","+rowNum+")' title='转横切'>转横切</a>&nbsp;&nbsp;<span name='hqsyInfo'></span>";
		}
		var str = "<div class='list2_num' name='product"+rowCode+"'><span class='fl'>"+
						"<div class='checksel fl' style='margin-top:5px' onclick='setOptionHb(this)'>"+
					   	"<input class='' name='prod' value='checkbox' type='checkbox'><label></label>"+
					    "</div>&nbsp;&nbsp;"+procedureNameStr+
					    "<span class='hbbg' style='display:none;'></span>"+
					    "<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].packageName'/>"+
		                "<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].procWeight' value='"+procWeight+"'/>"+
				        "厚<input type='text' name='thick' size='3' value='"+thick+"' readonly='readonly' style='border:none'/>*"+
				        "宽<input type='text' name='wide' size='4' value='"+wide+"' onchange='changeSpec(this,1)'/>*"+
				        "长<input type='text' name='longed' size='3' value='"+longed+"' onchange='changeSpec(this,2)'/>"+
				        "<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].steSpec' value='"+steSpec+"'/> "+                                         
				        "<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].procPrice'/> "+
	                    "<span class='jgs_priceshow ell' name='s_price' title='预估单价仅供参考，以实际结算单价为准' style='width:45px;color:#3b96dd;cursor:pointer'></span>"+
				        "<span class='spank' style='width:15px'></span>"+
				        "<input type='text' name='procLine["+index+"].procProductLineList["+rowNum+"].quantity' onchange='changeSpec(this,3)' value='"+quantity+"' size='3' placeholder='数量'/><span name='unit'></span>"+
				        "<input type='text' da='cpzl' name='procLine["+index+"].procProductLineList["+rowNum+"].weight' onchange='changeSpec(this,4)' value='"+weight+"' size='4' placeholder='重量'/>吨"+ 
				        "<span class='spank' style='width:15px'></span>"+
				        "<span class='iszongjian'><input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].knifeOrder' value='"+knifeOrder+"'/>"+
				 		"中切<input type='text' name='procLine["+index+"].procProductLineList["+rowNum+"].knifeCount' onchange='changeKnifeCount(this)' size='4' value='"+knifeCount+"' placeholder='不中切'/>刀"+zjbtStr+"</span>"+
				 		"<span class='ishengqie'>每包<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].packetMarking' value='0'/>"+
				 								"<input type='text' style='display:none;' name='procLine["+index+"].procProductLineList["+rowNum+"].bagQuantity' onchange='changeBagS(this)' placeholder='标准张数' size='5'>"+
				 								"<input type='text' name='procLine["+index+"].procProductLineList["+rowNum+"].bagWeight' onchange='changeBagW(this)' placeholder='标准包重' size='4'>"+
				 								"<input type='text' size='3' value='吨' onClick='setValue(this,event,9)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
				 								"<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>"+
				 								"</span>&nbsp;&nbsp;<span name='bagCount'></span>"+

				 								"<input type='text' name='procLine["+index+"].procProductLineList["+rowNum+"].partNo' onchange='changePartNo(this)' placeholder='零件号' size='4'>"+
						"</span>"+
						 "<span class='delall'>"+
						    "<a class='but_del' style='display:inline-block;' href='javascript:void(0)' onClick='del_numCols(this)'></a>"+
						 "</span>"+
				   "</div>";
		rowNum++;
		var updateObj = $(obj).parents("div[name='proDatail']");
		if($(obj).attr("title")=="转横切"){
			var len = updateObj.find("div[name='product"+rowCode+"']").length;
			var myObject=updateObj.find("div[name='product"+rowCode+"']").eq(len-1);
			$(str).insertAfter(myObject);
		}else{
			$(str).insertBefore(updateObj.find("div[name='totalInfo']"));
		}
		var myobj = $(obj).parents(".jgs2016_jgddown");
		setProcType(myobj);
		var nameStr = $(obj).parents(".list2_num").attr("name");
		sumDivWeight(updateObj,nameStr);
	}

	function del_numCols(obj,index){
		var updateObj = $(obj).parents("div[name='proDatail']");
		var nameStr = $(obj).parents(".list2_num").attr("name");
		$(obj).parents(".list2_num").remove();
		setShenYuInfo(updateObj);
		sumDivWeight(updateObj,nameStr);
		sumPrice();
	}

	function delColYl(obj){
		myobj=$(obj).parents(".jgs2016_yllist").remove();
	}

	function del_all(obj){
		getYuJuanInfo(obj);
		var mxObj = $(obj).parents(".jgs2016_jgddown");
		$(obj).parents(".jg_again").remove();
		var i = 2;
		mxObj.find(".jg_again").each(function(){//删除则  重置刀序
			$(this).find("input[name$='knifeOrder']").val(i);
			i++;
		})
	}

	/**
	 * 添加加工尺寸
	 * @param obj
	 * @param index
	 */
	function show_jgCol(obj,index,flag){
		var procTypeName = $("#procTypeName").val();
		var steNameID = $(obj).parents("div").find("input[name$='steNameID']").val();
		var steQualityID = $(obj).parents("div").find("input[name$='steQualityID']").val();
		var steAreaID = $(obj).parents("div").find("input[name$='steAreaID']").val();
		var unit = $(obj).parents("div").find("input[name$='unit']").val();
		var measure = $(obj).parents("div").find("input[name$='measure']").val();
		var steSpec = $(obj).parents("div").find("input[name$='steSpec']").val();
		var weight = $(obj).parents("div").find("input[name$='weight']").val();
		if(procTypeName==""||procTypeName==null||procTypeName==undefined){
			alert("请选择加工方式！");return;
		}
		if(steNameID==""||steNameID==null||steNameID==undefined){
			alert("加工原料【品名】不能为空！");return;
		}
		if(steQualityID==""||steQualityID==null||steQualityID==undefined){
			alert("加工原料【牌号】不能为空！");return;
		}
		if(steAreaID==""||steAreaID==null||steAreaID==undefined){
			alert("加工原料【钢厂】不能为空！");return;
		}
		if(unit==""||unit==null||unit==undefined){
			alert("加工原料【计量单位】不能为空！");return;
		}
		if(measure==""||measure==null||measure==undefined){
			alert("加工原料【计量方式】不能为空！");return;
		}
		if(steSpec==""||steSpec==null||steSpec==undefined){
			alert("加工原料【规格】不能为空！");return;
		}
		if(weight==""||weight==null||weight==undefined){
			alert("加工原料【重量】不能为空！");return;
		}
		var procInfoStr = "规格："+steSpec+"<br/>重量："+weight+"<br/>加工方式："+procTypeName+"";
		var thick = "";
		var wide = "";
		var longed = "";
		var list = steSpec.split('*');
		if(list.length>0){
			thick = list[0]+"";
		    wide = list[1]+"";
		    longed = list[2]+"";
		}
	    if(steSpec.indexOf("*(") > 0&&steSpec.indexOf(")*") > 0){
	    	thick = steSpec.substring(0,steSpec.indexOf("*(")-1);
		    wide = steSpec.substring(steSpec.indexOf("*(")+1,steSpec.lastIndexOf(")*")+1);
		    longed = steSpec.substring(steSpec.lastIndexOf(")*")+2,steSpec.length);
	    }
		var myobj = $(obj).parents(".jgs2016_jgdlist").next(".jgs2016_jgddown");
		if(myobj.length<=0){
			if(flag==1){
				addProcProductLineInfo(obj,index);//添加展开明细
			}else{
				addProcProductLineInfoForKC(obj,index);//添加展开明细
			}
			myobj = $(obj).parents(".jgs2016_jgdlist").next(".jgs2016_jgddown");
		    myobj.find("div[name='procInfoStr']").html(procInfoStr);
		    myobj.find("input[name='y_weight']").val(weight);//赋值加工重量
			myobj.find("input[name='procWeight']").val(weight);//赋值初始设置加工重量
			myobj.find("input[name$='procWeight']").val(weight);//赋值初始加工重量
			myobj.find("input[name='thick']").val(thick);
			myobj.find("input[name='wide']").val(wide);
			myobj.find("input[name='longed']").val(longed);
			myobj.find("input[name$='steSpec']").val(steSpec);
			if(procTypeName=="纵剪"){
				myobj.find("input[name='wide']").val("");
			}
			if(procTypeName=="横切"||procTypeName=="切割"){
				myobj.find("input[name='longed']").val("");
			}
			if(procTypeName=="纵剪"||procTypeName=="横切"||procTypeName=="纵剪+横切"||procTypeName=="切边开平"||procTypeName=="切割"){
				myobj.find("input[name$='quantity']").val(1);
				myobj.find("input[name$='weight']").val(weight);
			}else{
				myobj.find("input[name$='quantity']").val(1);
				myobj.find("input[name$='weight']").val(weight);
			}
			if(procTypeName=="纵剪+横切"){
				myobj.find("input[name='wide']").val("");
			}
			//myobj.find("span[name='totalWeightInfo']").html("重量合计：0.000  吨,余"+weight+" 吨可供加工");
			setProcType(myobj);
			myobj.show();
		}else{
			setProcType(myobj);
			if(myobj.css("display")=="none"){
				myobj.show();
			}else{
				myobj.hide();
			}
		}
		$(".jgs2016_hb_tip").fadeOut(3000);
	}

	/**
	 * 添加加工成品明细(预先下单)
	 * @param obj
	 * @param index
	 */
	function addProcProductLineInfo(obj,index){
		var procedureNameStr = "";
		var zjbtStr = "";
		var procTypeName = $("#procTypeName").val();
		if(procTypeName=="纵剪+横切"){
			procedureNameStr = "<input name='inLineList["+index+"].procProductLineList[0].procedureName' type='text' size='4' value='纵剪' onClick='setValue(this,event,7)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
			   				   "<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>&nbsp;&nbsp;&nbsp;&nbsp;";
			zjbtStr = "<span class='spank' style='width:4px'></span><a class='jgs2016_jgbut' href='javascript:void(0)' onClick='add_numCols(this,"+index+",0)' title='转横切'>转横切</a>&nbsp;&nbsp;<span name='hqsyInfo'></span>";
		}
		var htmlStr  =  "<div class='jgs2016_jgddown'>"+
					        /*"<div class='list_1' name='procInfoStr'></div>"+*/
					        "<div class='list_2'>"+
						         "<div name='proDatail'><div class='list2_weight'><span name='procTimesName'>第1次加工重量</span>：<input type='text' name='procWeight' size='5' onchange='changeProcW(this,"+index+")'/>吨<span style='float:right;' name='yulInfo'></span></div>"+
						         "<div class='list2_num' name='product0'><span class='fl'><div class='jgs2016_hb_tip'>勾选后合包<i></i></div>"+
										        "<div class='checksel fl' style='margin-top:5px' onclick='setOptionHb(this)'>"+
										     	  "<input class='' name='prod' value='checkbox' type='checkbox'><label></label>"+
										        "</div>&nbsp;&nbsp;"+procedureNameStr+
										        "<span class='hbbg' style='display:none;'></span>"+
										        "<input type='hidden' name='inLineList["+index+"].procProductLineList[0].packageName'/>"+
						         				"<input type='hidden' name='inLineList["+index+"].procProductLineList[0].procWeight'/>"+
							                    "厚<input type='text' name='thick' size='3' readonly='readonly' style='border:none'/>*"+
							                    "宽<input type='text' name='wide' size='4' onchange='changeSpec(this,1)'/>*"+
							                    "长<input type='text' name='longed' size='3' onchange='changeSpec(this,2)'/>"+
							                    "<input type='hidden' name='inLineList["+index+"].procProductLineList[0].steSpec'/> "+    
							                    "<input type='hidden' name='inLineList["+index+"].procProductLineList[0].procPrice'/> "+
							                    "<span class='jgs_priceshow ell' name='s_price' title='预估单价仅供参考，以实际结算单价为准' style='width:45px;color:#3b96dd;cursor:pointer'></span>"+
							                    "<span class='spank' style='width:15px'></span>"+
							                    "<input type='text' name='inLineList["+index+"].procProductLineList[0].quantity' onchange='changeSpec(this,3)' size='3' placeholder='数量'/><span name='unit'></span>"+
							                    "<input type='text' da='cpzl' name='inLineList["+index+"].procProductLineList[0].weight' onchange='changeSpec(this,4)' size='4' placeholder='重量'/>吨"+ 
							                    "<span class='spank' style='width:15px'></span>"+
							                    "<span class='iszongjian'><input type='hidden' name='inLineList["+index+"].procProductLineList[0].knifeOrder' value='1'/>"+
										 		"中切<input type='text' name='inLineList["+index+"].procProductLineList[0].knifeCount' onchange='changeKnifeCount(this)' size='4' placeholder='不中切'/>刀"+zjbtStr+"</span>"+
										 		"<span class='ishengqie'>每包<input type='hidden' name='inLineList["+index+"].procProductLineList[0].packetMarking' value='0'/>"+
										 								"<input type='text' style='display:none;' name='inLineList["+index+"].procProductLineList[0].bagQuantity' onchange='changeBagS(this)' placeholder='标准张数' size='5'>"+
										 								"<input type='text' name='inLineList["+index+"].procProductLineList[0].bagWeight' onchange='changeBagW(this)' placeholder='标准包重' size='4'>"+
										 								"<input type='text' size='3' value='吨' onClick='setValue(this,event,9)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
										 								"<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>"+
										 								"</span>&nbsp;&nbsp;<span name='bagCount'></span>"+
										 								"<input type='text' name='inLineList["+index+"].procProductLineList[0].partNo' onchange='changePartNo(this)' placeholder='零件号' size='4'>"+
						                 "</span>"+
						                 "<span class='delall'>"+
						                    "<a class='but_add' href='javascript:void(0)' onClick='add_numCols(this,"+index+",0)'></a>"+
						                    "<a class='but_del' href='javascript:void(0)' onClick='del_numCols(this)'></a>"+
						                 "</span>"+
						          "</div>"+
						          "<div class='jgtip' name='totalInfo' style='margin-left:0px'><span name='totalWeightInfo' style='margin-left:0px'></span><span name='totalWideInfo' style='margin-left:15px;width:350px;display:inline-block'></span></div></div>"+
					        "</div>"+
					     "</div>";
		$(obj).parents(".jgs2016_yllist").append(htmlStr);
	}

	function changeProcW(obj,index){
		var reg = /^[0-9]*\.?[0-9]+$/;
		var procTypeName = $("#procTypeName").val();
		var procWeight = 0;
		var ylObj = $(obj).parents(".jgs2016_yllist").find(".jgs2016_jgdlist");
		var y_weight = new Number(ylObj.find("input[name$='weight']").val());
		$(obj).parents(".jgs2016_jgddown").find("input[name='procWeight']").each(function(){
			if(reg.test($(this).val())){
				procWeight += new Number($(this).val());
			}
		})
		var weight = (y_weight-procWeight).toFixed(3);
		if(!reg.test($(obj).val())){
	        alert("请输入数字！");
	        $(obj).val(weight);
	        $(obj).parents("div[name='proDatail']").find("input[name$='procWeight']").val(weight);
	        return false;
	    }
		var steSpec = ylObj.find("input[name$='steSpec']").val();
		var list = steSpec.split('*');
	    var thick = list[0]+"";
	    var wide = list[1]+"";
	    var longed = list[2]+"";
	    if(steSpec.indexOf("*(") > 0&&steSpec.indexOf(")*") > 0){
	    	thick = steSpec.substring(0,steSpec.indexOf("*(")-1);
		    wide = steSpec.substring(steSpec.indexOf("*(")+1,steSpec.lastIndexOf(")*")+1);
		    longed = steSpec.substring(steSpec.lastIndexOf(")*")+2,steSpec.length);
	    }
		var quantity = 1;
		var procedureNameStr = "";
		var zjbtStr = "";
		if(procTypeName=="纵剪"||procTypeName=="纵剪+横切"){
			if(procTypeName=="纵剪+横切"){
				procedureNameStr = "<input name='inLineList["+index+"].procProductLineList["+rowNum+"].procedureName' type='text' size='4' value='纵剪' onClick='setValue(this,event,7)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
				   "<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>&nbsp;&nbsp;&nbsp;&nbsp;";
				zjbtStr = "<span class='spank' style='width:4px'></span><a class='jgs2016_jgbut' href='javascript:void(0)' onClick='add_numCols(this,"+index+","+rowNum+")' title='转横切'>转横切</a>&nbsp;&nbsp;<span name='hqsyInfo'></span>";
			}
			wide = "";
			if(weight>0){
				//如果多次加工的情况，先清空成品重量
				//$(obj).parent().next().find("input[da='cpzl']").val(0);
				
				var htmlStr = "<div name='proDatail' class='jg_again'>"+
									"<div class='list2_weight'>"+
									"<span class='fl'><span name='procTimesName'></span>：<input type='text' value='"+weight+"' name='procWeight' size='5' onchange='changeProcW(this,"+index+")'/>吨</span>"+
									"<span class='delall'><a href='javascript:void(0)' onClick='del_all(this)' class='but_dela'></a></span>"+
								"</div>"+
								"<div class='list2_num' name='product"+rowNum+"'>"+
									"<span class='fl'>"+
									"<div class='checksel fl' style='margin-top:5px' onclick='setOptionHb(this)'>"+
							     	  "<input class='' name='prod' value='checkbox' type='checkbox'><label></label>"+
							        "</div>&nbsp;&nbsp;"+procedureNameStr+
							        "<span class='hbbg' style='display:none;'></span>"+
							        "<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].packageName'/>"+
									"<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].procWeight' value='"+weight+"'/>"+
									"厚<input type='text' name='thick' size='3' value='"+thick+"' readonly='readonly' style='border:none'/>*"+
									"宽<input type='text' name='wide' size='4' value='"+wide+"' onchange='changeSpec(this,1)'/>*"+
									"长<input type='text' name='longed' size='3' value='"+longed+"' onchange='changeSpec(this,2)'/>"+
									"<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].steSpec' value='"+steSpec+"'/> "+
									"<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].procPrice'/> "+
				                    "<span class='jgs_priceshow ell' name='s_price' title='预估单价仅供参考，以实际结算单价为准' style='width:45px;color:#3b96dd;cursor:pointer'></span>"+
									"<span class='spank' style='width:15px'></span>"+
									"<input type='text' name='inLineList["+index+"].procProductLineList["+rowNum+"].quantity' onchange='changeSpec(this,3)' value='"+quantity+"' size='3' placeholder='数量'/><span name='unit'></span>"+ 
									"<input type='text' da='cpzl' name='inLineList["+index+"].procProductLineList["+rowNum+"].weight' onchange='changeSpec(this,4)' value='0' size='4' placeholder='重量'/>吨"+ 
									"<span class='spank' style='width:15px'></span>"+
									"<span class='iszongjian'><input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].knifeOrder' value='1'/>"+
							 		"中切<input type='text' name='inLineList["+index+"].procProductLineList["+rowNum+"].knifeCount' onchange='changeKnifeCount(this)' size='4' placeholder='不中切'/>刀"+zjbtStr+"</span>"+
							 		"<span class='ishengqie'>每包<input type='hidden' name='inLineList["+index+"].procProductLineList["+rowNum+"].packetMarking' value='0'/>"+
										 					"<input type='text' style='display:none;' name='inLineList["+index+"].procProductLineList["+rowNum+"].bagQuantity' onchange='changeBagS(this)' placeholder='标准张数' size='5'>"+
										 					"<input type='text' name='inLineList["+index+"].procProductLineList["+rowNum+"].bagWeight' onchange='changeBagW(this)' placeholder='标准包重' size='4'>"+
										 					"<input type='text' size='3' value='吨' onClick='setValue(this,event,9)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
							 								"<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>"+
										 					"</span>&nbsp;&nbsp;<span name='bagCount'></span>"+
										 					"<input type='text' name='inLineList["+index+"].procProductLineList["+rowNum+"].partNo' onchange='changePartNo(this)' placeholder='零件号' size='4'>"+
							 		"</span>"+
							 		"<span class='delall'>"+
										"<a class='but_add' href='javascript:void(0)' onClick='add_numCols(this,"+index+","+rowNum+")'></a>"+
										"<a class='but but_del' href='javascript:void(0)' onClick='del_numCols(this)'></a>"+
									"</span>"+
								"</div>"+
								"<div class='jgtip' name='totalInfo' style='margin-left:0px'><span name='totalWeightInfo' style='margin-left:0px'>重量合计：<span style='color:#3b96dd'>0.000</span>吨</span><span name='totalWideInfo' style='margin-left:15px;width:350px;display:inline-block'></span></div></div>"+
							"</div>";
				$(obj).parents(".list_2").append(htmlStr);
				rowNum++;
				setYuJuanInfo(obj);//设置余卷信息
			}
			setKnifeOrder(obj);//设置刀序
		}
		if(procTypeName!="纵剪"&&procTypeName!="纵剪+横切"){
			if(weight>0){
				getYuJuanInfo(obj);
			}else{
				setYuJuanInfo(obj);
			}
		}
		var myobj = $(obj).parents(".jgs2016_jgddown");
		setProcType(myobj);//设置加工方式
		var updateObj = $(obj).parents("div[name='proDatail']");
		var nameStr = $(obj).parents(".list2_num").attr("name");
		sumDivWeight(updateObj,nameStr);
	}

	/**
	 * 添加加工成品明细(库存加工)
	 * @param obj
	 * @param index
	 */
	function addProcProductLineInfoForKC(obj,index){
		var procedureNameStr = "";
		var zjbtStr = "";
		var procTypeName = $("#procTypeName").val();
		if(procTypeName=="纵剪+横切"){
			procedureNameStr = "<input name='procLine["+index+"].procProductLineList[0].procedureName' type='text' size='4' value='纵剪' onClick='setValue(this,event,7)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
			   				   "<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>&nbsp;&nbsp;&nbsp;&nbsp;";
			zjbtStr = "<span class='spank' style='width:4px'></span><a class='jgs2016_jgbut' href='javascript:void(0)' onClick='add_numColsForCK(this,"+index+",0)' title='转横切'>转横切</a>&nbsp;&nbsp;<span name='hqsyInfo'></span>";
		}
		var htmlStr  =  "<div class='jgs2016_jgddown'>"+
					        /*"<div class='list_1' name='procInfoStr'></div>"+*/
					        "<div class='list_2'>"+
						         "<div name='proDatail'><div class='list2_weight'><span name='procTimesName'>第1次加工重量</span>：<input type='text' name='procWeight' size='5' onchange='changeProcWForKC(this,"+index+")'/>吨<span style='float:right;' name='yulInfo'></span></div>"+
						         "<div class='list2_num' name='product0'><span class='fl'><div class='jgs2016_hb_tip'>勾选后合包<i></i></div>"+
										        "<div class='checksel fl' style='margin-top:5px' onclick='setOptionHb(this)'>"+
										     	  "<input class='' name='prod' value='checkbox' type='checkbox'><label></label>"+
										        "</div>&nbsp;&nbsp;"+procedureNameStr+
										        "<span class='hbbg' style='display:none;'></span>"+
										        "<input type='hidden' name='procLine["+index+"].procProductLineList[0].packageName'/>"+
						         				"<input type='hidden' name='procLine["+index+"].procProductLineList[0].procWeight'/>"+
							                    "厚<input type='text' name='thick' size='3' readonly='readonly' style='border:none'/>*"+
							                    "宽<input type='text' name='wide' size='4' onchange='changeSpec(this,1)'/>*"+
							                    "长<input type='text' name='longed' size='3' onchange='changeSpec(this,2)'/>"+
							                    "<input type='hidden' name='procLine["+index+"].procProductLineList[0].steSpec'/> "+                                         
							                    "<input type='hidden' name='procLine["+index+"].procProductLineList[0].procPrice'/> "+
							                    "<span class='jgs_priceshow ell' name='s_price' title='预估单价仅供参考，以实际结算单价为准' style='width:45px;color:#3b96dd;cursor:pointer'></span>"+
							                    "<span class='spank' style='width:15px'></span>"+
							                    "<input type='text' name='procLine["+index+"].procProductLineList[0].quantity' onchange='changeSpec(this,3)' size='3' placeholder='数量'/><span name='unit'></span>"+
							                    "<input type='text' da='cpzl' name='procLine["+index+"].procProductLineList[0].weight' onchange='changeSpec(this,4)' size='4' placeholder='重量'/>吨"+ 
							                    "<span class='spank' style='width:15px'></span>"+
							                    "<span class='iszongjian'><input type='hidden' name='procLine["+index+"].procProductLineList[0].knifeOrder' value='1'/>"+
										 		"中切<input type='text' name='procLine["+index+"].procProductLineList[0].knifeCount' onchange='changeKnifeCount(this)' size='4' placeholder='不中切'/>刀"+zjbtStr+"</span>"+
										 		"<span class='ishengqie'>每包<input type='hidden' name='procLine["+index+"].procProductLineList[0].packetMarking' value='0'/>"+
										 								"<input type='text' style='display:none;' name='procLine["+index+"].procProductLineList[0].bagQuantity' onchange='changeBagS(this)' placeholder='标准张数' size='5'>"+
										 								"<input type='text' name='procLine["+index+"].procProductLineList[0].bagWeight' onchange='changeBagW(this)' placeholder='标准包重' size='4'>"+
										 								"<input type='text' size='3' value='吨' onClick='setValue(this,event,9)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
										 								"<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>"+
										 								"</span>&nbsp;&nbsp;<span name='bagCount'></span>"+
										 								"<input type='text' name='procLine["+index+"].procProductLineList[0].partNo' onchange='changePartNo(this)' placeholder='零件号' size='4'>"+
						                 "</span>"+
						                 "<span class='delall'>"+
						                    "<a class='but_add' href='javascript:void(0)' onClick='add_numColsForCK(this,"+index+",0)'></a>"+
						                    "<a class='but_del' href='javascript:void(0)' onClick='del_numCols(this)'></a>"+
						                 "</span>"+
						          "</div>"+
						          "<div name='totalInfo' style='margin-left:0px'><span name='totalWeightInfo' style='margin-left:0px'></span><span name='totalWideInfo' style='margin-left:15px;width:350px;display:inline-block'></span></div></div>"+
					        "</div>"+
					     "</div>";
		$(obj).parents(".jgs2016_yllist").append(htmlStr);
	}

	function changeProcWForKC(obj,index){
		var reg = /^[0-9]*\.?[0-9]+$/;
		var procTypeName = $("#procTypeName").val();
		var procWeight = 0;
		var ylObj = $(obj).parents(".jgs2016_yllist").find(".jgs2016_jgdlist");
		var y_weight = new Number(ylObj.find("input[name$='weight']").val());
		$(obj).parents(".jgs2016_jgddown").find("input[name='procWeight']").each(function(){
			if(reg.test($(this).val())){
				procWeight += new Number($(this).val());
			}
		})
		var weight = (y_weight-procWeight).toFixed(3);
		if(!reg.test($(obj).val())){
	        alert("请输入数字！");
	        $(obj).val(weight);
	        $(obj).parents("div[name='proDatail']").find("input[name$='procWeight']").val(weight);
	        return false;
	    }
		var steSpec = ylObj.find("input[name$='steSpec']").val();
		var list = steSpec.split('*');
	    var thick = list[0]+"";
	    var wide = list[1]+"";
	    var longed = list[2]+"";
	    if(steSpec.indexOf("*(") > 0&&steSpec.indexOf(")*") > 0){
	    	thick = steSpec.substring(0,steSpec.indexOf("*(")-1);
		    wide = steSpec.substring(steSpec.indexOf("*(")+1,steSpec.lastIndexOf(")*")+1);
		    longed = steSpec.substring(steSpec.lastIndexOf(")*")+2,steSpec.length);
	    }
		var quantity = 1;
		var procedureNameStr = "";
		var zjbtStr = "";
		if(procTypeName=="纵剪"||procTypeName=="纵剪+横切"){
			if(procTypeName=="纵剪+横切"){
				procedureNameStr = "<input name='procLine["+index+"].procProductLineList["+rowNum+"].procedureName' type='text' size='4' value='纵剪' onClick='setValue(this,event,7)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
				   "<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>&nbsp;&nbsp;&nbsp;&nbsp;";
				zjbtStr = "<span class='spank' style='width:4px'></span><a class='jgs2016_jgbut' href='javascript:void(0)' onClick='add_numColsForCK(this,"+index+","+rowNum+")' title='转横切'>转横切</a>&nbsp;&nbsp;<span name='hqsyInfo'></span>";
			}
			wide = "";
			if(weight>0){
				//如果多次加工的情况，先清空成品重量
				//$(obj).parent().next().find("input[da='cpzl']").val(0);
				
				var htmlStr = "<div name='proDatail' class='jg_again'>"+
									"<div class='list2_weight'>"+
									"<span class='fl'><span name='procTimesName'></span>：<input type='text' value='"+weight+"' name='procWeight' size='5' onchange='changeProcWForKC(this,"+index+")'/>吨</span>"+
									"<span class='delall'><a href='javascript:void(0)' onClick='del_all(this)' class='but_dela'></a></span>"+
								"</div>"+
								"<div class='list2_num' name='product"+rowNum+"'>"+
									"<span class='fl'>"+
									"<div class='checksel fl' style='margin-top:5px' onclick='setOptionHb(this)'>"+
							     	  "<input class='' name='prod' value='checkbox' type='checkbox'><label></label>"+
							        "</div>&nbsp;&nbsp;"+procedureNameStr+
							        "<span class='hbbg' style='display:none;'></span>"+
							        "<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].packageName'/>"+
									"<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].procWeight' value='"+weight+"'/>"+
									"厚<input type='text' name='thick' size='3' value='"+thick+"' readonly='readonly' style='border:none'/>*"+
									"宽<input type='text' name='wide' size='4' value='"+wide+"' onchange='changeSpec(this,1)'/>*"+
									"长<input type='text' name='longed' size='3' value='"+longed+"' onchange='changeSpec(this,2)'/>"+
									"<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].steSpec' value='"+steSpec+"'/> "+
									"<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].procPrice'/> "+
				                    "<span class='jgs_priceshow ell' name='s_price' title='预估单价仅供参考，以实际结算单价为准' style='width:45px;color:#3b96dd;cursor:pointer'></span>"+
									"<span class='spank' style='width:15px'></span>"+
									"<input type='text' name='procLine["+index+"].procProductLineList["+rowNum+"].quantity' onchange='changeSpec(this,3)' value='"+quantity+"' size='3' placeholder='数量'/><span name='unit'></span>"+ 
									"<input type='text' da='cpzl' name='procLine["+index+"].procProductLineList["+rowNum+"].weight' onchange='changeSpec(this,4)' value='0' size='4' placeholder='重量'/>吨"+ 
									"<span class='spank' style='width:15px'></span>"+
									"<span class='iszongjian'><input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].knifeOrder' value='1'/>"+
							 		"中切<input type='text' name='procLine["+index+"].procProductLineList["+rowNum+"].knifeCount' onchange='changeKnifeCount(this)' size='4' placeholder='不中切'/>刀"+zjbtStr+"</span>"+
							 		"<span class='ishengqie'>每包<input type='hidden' name='procLine["+index+"].procProductLineList["+rowNum+"].packetMarking' value='0'/>"+
										 					"<input type='text' style='display:none;' name='procLine["+index+"].procProductLineList["+rowNum+"].bagQuantity' onchange='changeBagS(this)' placeholder='标准张数' size='5'>"+
										 					"<input type='text' name='procLine["+index+"].procProductLineList["+rowNum+"].bagWeight' onchange='changeBagW(this)' placeholder='标准包重' size='4'>"+
										 					"<input type='text' size='3' value='吨' onClick='setValue(this,event,9)' class='jgs2016_jg_input search_dot' style='border:none'/>"+
							 								"<div class='jgs2016_alert'><div class='jgs2016_alertlist' style='height:auto'></div></div>"+
										 					"</span>&nbsp;&nbsp;<span name='bagCount'></span>"+
										 					"<input type='text' name='procLine["+index+"].procProductLineList["+rowNum+"].partNo' onchange='changePartNo(this)' placeholder='零件号' size='4'>"+
							 		"</span>"+
									"<span class='delall'>"+
										"<a class='but_add' href='javascript:void(0)' onClick='add_numColsForCK(this,"+index+","+rowNum+")'></a>"+
										"<a class='but but_del' href='javascript:void(0)' onClick='del_numCols(this)'></a>"+
									"</span>"+
								"</div>"+
								"<div name='totalInfo' style='margin-left:0px'><span name='totalWeightInfo' style='margin-left:0px'>重量合计：<span style='color:#3b96dd'>0.000</span>吨</span><span name='totalWideInfo' style='margin-left:15px;width:350px;display:inline-block'></span></div></div>"+
							"</div>";
				$(obj).parents(".list_2").append(htmlStr);
				rowNum++;
				setYuJuanInfo(obj);//设置余卷信息
			}
			setKnifeOrder(obj);//设置刀序
		}
		if(procTypeName!="纵剪"&&procTypeName!="纵剪+横切"){
			if(weight>0){
				getYuJuanInfo(obj);
			}else{
				setYuJuanInfo(obj);
			}
		}
		var myobj = $(obj).parents(".jgs2016_jgddown");
		setProcType(myobj);//设置加工方式
		var updateObj = $(obj).parents("div[name='proDatail']");
		var nameStr = $(obj).parents(".list2_num").attr("name");
		sumDivWeight(updateObj,nameStr);
	}

	function sumDivWeight(obj,nameStr){
		var procTypeName = $("#procTypeName").val();
		var sumWeight = 0;
		var gj_weight = obj.find("input[name='procWeight']").val();
		var thickStr="";
		var wideStr = "";
		var longedStr = "";
		if(procTypeName=="纵剪+横切"){
			var zj_weight = 0;
			var hq_weight = 0;
			var zj_ylStr = "";
			var hq_ylStr = "";
			var str = "";
			obj.find("input[name$='procedureName']").each(function(){
				if($(this).val()=="纵剪"){
					thickStr = $(this).parents(".list2_num").find("input[name='thick']").val();
					if($(this).parents(".list2_num").find("input[name='wide']").val()!=""){
						wideStr += $(this).parents(".list2_num").find("input[name='wide']").val()+"*"+$(this).parents(".list2_num").find("input[name$='quantity']").val()+"+";
					}
					longedStr = $(this).parents(".list2_num").find("input[name='longed']").val();
				}
			})
			if(wideStr!=""){
				str = "纵剪尺寸：<span style='color:#3b96dd'>"+thickStr+"*"+"("+wideStr.substring(0,wideStr.lastIndexOf("+"))+")"+"*"+longedStr+"</span><br>";
			}
			obj.find("input[name$='weight']").each(function(){
				heightStr = $(this).parents(".list2_num").find("input[name='thick']").val();
				if($(this).parents(".list2_num").find("input[name$='procedureName']").val()=="纵剪"){
					zj_weight+=parseFloat($(this).val());
				}
				if($(this).parents(".list2_num").find("input[name$='procedureName']").val()=="横切"){
					hq_weight+=parseFloat($(this).val());
				}
	        })
	        if((gj_weight-zj_weight).toFixed(3)>0){
	        	zj_ylStr = "，余<span style='color:#3b96dd'>"+(gj_weight-zj_weight).toFixed(3)+"</span>吨   可供加工";
	        }
	        if(zj_weight!=0){
	        	str+="纵剪重量：<span style='color:#3b96dd'>"+zj_weight.toFixed(3)+"</span>吨"+zj_ylStr;
	        }
	        if((zj_weight-hq_weight).toFixed(3)>0){
	        	hq_ylStr = "，余<span style='color:#3b96dd'>"+(zj_weight-hq_weight).toFixed(3)+"</span>吨";
	        }
	        if(zj_weight==0&&hq_weight>0&&(parseFloat(gj_weight)-hq_weight).toFixed(3)>0){
	        	hq_ylStr = "，余<span style='color:#3b96dd'>"+(parseFloat(gj_weight)-hq_weight).toFixed(3)+"</span>吨";
	        }
			if(hq_weight!=0){
				str+="&nbsp;&nbsp;&nbsp;&nbsp;横切重量：<span style='color:#3b96dd'>"+hq_weight.toFixed(3)+"</span>吨"+hq_ylStr;
			}
	        obj.find("span[name='totalWeightInfo']").html(str);
	        //转横余重
	        var z_weight = 0;
	        var h_weight = 0;
	        obj.find("div[name='"+nameStr+"']").each(function(){
				if($(this).find("input[name$='procedureName']").val()=="纵剪"){
					z_weight+=parseFloat($(this).find("input[name$='weight']").val()); 
				}
				if($(this).find("input[name$='procedureName']").val()=="横切"){
					h_weight+=parseFloat($(this).find("input[name$='weight']").val());
				}
			})
			if((z_weight-h_weight).toFixed(3)>0&&h_weight.toFixed(3)!=0){
				var hqsyStr = "余：<span style='color:#3b96dd'>"+(z_weight-h_weight).toFixed(3)+"</span>吨"
				obj.find("div[name='"+nameStr+"']").find("span[name='hqsyInfo']").html(hqsyStr);
			}else{
				obj.find("div[name='"+nameStr+"']").find("span[name='hqsyInfo']").html("");
			}
		}else{
			var str = "";
			var ylStr = "";
			if(procTypeName=="纵剪"){
				obj.find("input[name='thick']").each(function(){
					thickStr = $(this).val();
					if($(this).parents(".list2_num").find("input[name='wide']").val()!=""){
						wideStr += $(this).parents(".list2_num").find("input[name='wide']").val()+"*"+$(this).parents(".list2_num").find("input[name$='quantity']").val()+"+";
					}
					longedStr = $(this).parents(".list2_num").find("input[name='longed']").val();
				})
				str = "纵剪尺寸：<span style='color:#3b96dd'>"+thickStr+"*"+"("+wideStr.substring(0,wideStr.lastIndexOf("+"))+")"+"*"+longedStr+"</span><br>";
			}
			obj.find("input[name$='weight']").each(function(){
	        	sumWeight+=parseFloat($(this).val());
	        })
			if((gj_weight-sumWeight).toFixed(3)>0){
				ylStr = "，余<span style='color:#3b96dd'>"+(gj_weight-sumWeight).toFixed(3)+"</span>吨   可供加工"
			}
			str += "重量合计：<span style='color:#3b96dd'>"+sumWeight.toFixed(3)+"</span>吨"+ylStr;
	        obj.find("span[name='totalWeightInfo']").html(str);
		}
		obj.find("input[name$='procWeight']").each(function(){
			$(this).val(gj_weight);
		})
	}
	/**
	 * 选择加工方式
	 * @param obj
	 * @param value
	 */
	function selectProcType(obj,value){
	    $("#procType").val(value);
	    $("#procTypeName").val($(obj).html());
	    var myInObj = $("#inLineInfo");
	    var myProcObj = $("#stockInfo");
	    myInObj.find(".jgs2016_jgddown").remove();//初始化删除预入库加工明细
	    myProcObj.find(".jgs2016_jgddown").remove();//初始化删除库存加工明细
	    $("#hbCount").val(1);
	    rowNum = 1;
	}

	function setProcType(myobj){
		var procTypeName = $("#procTypeName").val();
		if(procTypeName=="纵剪"){
			myobj.find("input[name='wide']").removeAttr("readonly");
			myobj.find("input[name='wide']").removeAttr("style");
			myobj.find("input[name='longed']").attr("readonly","readonly");
			myobj.find("input[name='longed']").css({"border":"none"});
			myobj.find("span[name='unit']").html("条");
			myobj.find(".iszongjian").show();
			myobj.find(".ishengqie").hide();
		}
		if(procTypeName=="横切"||procTypeName=="切割"){
			myobj.find("input[name='wide']").attr("readonly","readonly");
			myobj.find("input[name='wide']").css({"border":"none"});
			myobj.find("input[name='longed']").removeAttr("readonly");
			myobj.find("input[name='longed']").removeAttr("style");
			myobj.find("span[name='unit']").html("张");
			myobj.find(".iszongjian").hide();
			myobj.find(".ishengqie").show();
		}
		if(procTypeName=="分卷"||procTypeName=="重卷"||procTypeName=="校平"||procTypeName=="去钢印"||procTypeName=="更新包装"||procTypeName=="涂漆"){
			myobj.find("input[name='wide']").attr("readonly","readonly");
			myobj.find("input[name='wide']").css({"border":"none"});
			myobj.find("input[name='longed']").attr("readonly","readonly");
			myobj.find("input[name='longed']").css({"border":"none"});
			myobj.find(".iszongjian").hide();
			myobj.find(".ishengqie").show();
			if(procTypeName=="分卷"||procTypeName=="重卷"||procTypeName=="更新包装"){
				myobj.find("span[name='unit']").html("件");
			}
			if(procTypeName=="校平"||procTypeName=="去钢印"||procTypeName=="涂漆"){
				myobj.find("span[name='unit']").html("张");
			}
		}
		if(procTypeName=="切边开平"){
			myobj.find("input[name='wide']").removeAttr("readonly");
			myobj.find("input[name='longed']").removeAttr("readonly");
			myobj.find("span[name='unit']").html("张");
			myobj.find(".iszongjian").hide();
			myobj.find(".ishengqie").show();
		}
		if(procTypeName=="纵剪+横切"){
			myobj.find("input[name$='procedureName']").each(function(){
				if($(this).val()=="纵剪"){
					$(this).parent().parent().find("input[name='wide']").removeAttr("readonly");
					$(this).parent().parent().find("input[name='wide']").removeAttr("style");
					$(this).parent().parent().find("input[name='longed']").attr("readonly","readonly");
					$(this).parent().parent().find("input[name='longed']").css({"border":"none"});
					$(this).parent().parent().find("span[name='unit']").html("条");
					$(this).parent().parent().find(".ishengqie").hide();
					$(this).parent().parent().find(".iszongjian").show();
				}
				if($(this).val()=="横切"){
					$(this).parent().parent().find("input[name='wide']").attr("readonly","readonly");
					$(this).parent().parent().find("input[name='wide']").css({"border":"none"});
					$(this).parent().parent().find("input[name='longed']").removeAttr("readonly");
					$(this).parent().parent().find("input[name='longed']").removeAttr("style");
					$(this).parent().parent().find("span[name='unit']").html("张");
					$(this).parent().parent().find(".ishengqie").show();
					$(this).parent().parent().find(".iszongjian").hide();
				}
			})
		}
		var i = 1;
		myobj.find("span[name='procTimesName']").each(function(){
			$(this).html("第"+i+"次加工重量");
			i++;
		})
	}

	function getYuJuanInfo(obj){
		var procTypeName = $("#procTypeName").val();
		var procWeight = 0;
		var ylObj = $(obj).parents(".jgs2016_yllist").find(".jgs2016_jgdlist");
		var y_weight = parseFloat(ylObj.find("input[name$='weight']").val());
		$(obj).parents(".jgs2016_jgddown").find("input[name='procWeight']").each(function(){
			procWeight += parseFloat($(this).val());
		})
		if(procTypeName=="纵剪"||procTypeName=="纵剪+横切"){
			var weight = parseFloat($(obj).parents(".list2_weight").find("input[name='procWeight']").val());
			procWeight = procWeight - weight
			weight = parseFloat(y_weight - procWeight);
		}else{
			weight = parseFloat(y_weight - procWeight);
		}
		var steSpec = ylObj.find("input[name$='steSpec']").val();
		if(weight>0){
			var msgStr = "收余卷：<span style='color:#3b96dd'>"+steSpec+"</span>，重量：<span style='color:#3b96dd'>"+weight.toFixed(3)+"</span>吨";
			$(obj).parents(".jgs2016_jgddown").find(".list2_weight").find("span[name='yulInfo']").html(msgStr);
		}
	}

	function setYuJuanInfo(obj){
		$(obj).parents(".jgs2016_jgddown").find(".list2_weight").find("span[name='yulInfo']").html("");
	}

	function setKnifeOrder(obj){//纵剪加工方式下 重置刀序
		var i = 2;
		$(obj).parents(".jgs2016_jgddown").find(".jg_again").each(function(){//新增设置刀序
			$(this).find("input[name$='knifeOrder']").val(i);
			$(obj).parents(".jgs2016_yllist").find(".jgs2016_jgdlist").find("input[name$='processingTimes']").val(i);//原卷加工次数 默认加工一次
			i++;
		})
	}

	function changeKnifeCount(obj){
		var reg = new RegExp("^[0-9]*$");  
		var te=/^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
		if(!reg.test($(obj).val())){  
	        alert("请输入数字！比如1、2");$(obj).val("");
	    }
		if(te.test($(obj).val())){  
			alert("请输入整数!");$(obj).val("");
		}
		var knifeCount = $(obj).val();
		$(obj).parents("div[name='proDatail']").find("input[name$='knifeCount']").each(function(){
			$(this).val(knifeCount);
		})
	}

	function changeBagW(obj){
		var bagWeight = $(obj).val();
		var reg = /^[0-9]*\.?[0-9]+$/;
	    if(bagWeight != ""){
	        if(!reg.test(bagWeight)){
	            alert("请输入数字！");
	            $(obj).val("");
	            $(obj).focus();
	            return false;
	        }else{
	        	if(parseFloat(bagWeight)>parseFloat($(obj).parents(".list2_num").find("input[name$='weight']").val())){
	        		alert("每包重量不能大于加工成品重量！");
	        		$(obj).val("");
	        		$(obj).parents(".list2_num").find("span[name='bagCount']").html("");
	        		$(obj).parents(".list2_num").find("input[name$='bagQuantity']").val("");
	        		$(obj).focus();
	        		return false;
	        	}
	        	var bagCount = Math.ceil(parseFloat($(obj).parents(".list2_num").find("input[name$='weight']").val())/parseFloat(bagWeight));
	        	if(bagCount>0){
	        		$(obj).parents(".list2_num").find("span[name='bagCount']").html("约<span style='color:#3b96dd'>"+bagCount+"</span>包");
	        		var quantity = $(obj).parents(".list2_num").find("input[name$='quantity']").val();
	        		var bagQuantity = Math.ceil(parseFloat(quantity)/parseFloat(bagCount));
	            	if(bagQuantity>0){
	            		$(obj).parents(".list2_num").find("input[name$='bagQuantity']").val(bagQuantity);
	            	}
	        	}else{
	        		$(obj).parents(".list2_num").find("span[name='bagCount']").html("");
	        	}
	        }
	    }else{
	    	$(obj).parents(".list2_num").find("span[name='bagCount']").html("");
	    	$(obj).parents(".list2_num").find("input[name$='bagQuantity']").val("");
	    }
	}
	function changePartNo(obj){
		var partNo = $(obj).val();
		var str = publicUtil.replaceBlank(partNo);
		$(obj).parents(".list2_num").find("input[name$='partNo']").val(str);
		
		//checkedPartNo(obj);
	}

	function changeBagS(obj){
		var bagQuantity = $(obj).val();
		var reg = /^[0-9]*[1-9][0-9]*$/;
	    if(bagQuantity != ""){
	        if(!reg.test(bagQuantity)){
	            alert("请输入正整数！");
	            $(obj).val("");
	            $(obj).focus();
	            return false;
	        }else{
	        	/*if(parseFloat(bagQuantity)>parseFloat($(obj).parents(".list2_num").find("input[name$='quantity']").val())){
	        		alert("每包张数不能大于加工成品张数！");
	        		$(obj).val("");
	        		$(obj).parents(".list2_num").find("span[name='bagCount']").html("");
	        		$(obj).parents(".list2_num").find("input[name$='bagWeight']").val("");
	        		$(obj).focus();
	        		return false;
	        	}*/
	        	var bagCount = Math.ceil(parseFloat($(obj).parents(".list2_num").find("input[name$='quantity']").val())/parseFloat(bagQuantity));
	        	if(bagCount>0){
	        		$(obj).parents(".list2_num").find("span[name='bagCount']").html("约<span style='color:#3b96dd'>"+bagCount+"</span>包");
	        	}else{
	        		$(obj).parents(".list2_num").find("span[name='bagCount']").html("");
	        	}
	        	var quantity = $(obj).parents(".list2_num").find("input[name$='quantity']").val();
	        	var weight = $(obj).parents(".list2_num").find("input[name$='weight']").val();
	        	var bagWeight = ((parseFloat(weight)/parseFloat(quantity))*parseFloat(bagQuantity)).toFixed(3);
	        	if(bagWeight>0){
	        		$(obj).parents(".list2_num").find("input[name$='bagWeight']").val(bagWeight);
	        	}
	        }
	    }else{
	    	$(obj).parents(".list2_num").find("span[name='bagCount']").html("");
	    	$(obj).parents(".list2_num").find("input[name$='bagWeight']").val("");
	    }
	}

	function setShenYuInfo(obj){
		var procTypeName = $("#procTypeName").val();
		var mj_Obj = $(obj).parents(".jgs2016_yllist").find(".jgs2016_jgdlist");
		var mj_steSpec = mj_Obj.find("input[name$='steSpec']").val();
		var mj_steSpec = mj_Obj.find("input[name$='steSpec']").val();
		var list = mj_steSpec.split('*');//母卷规格(固定值)
		var height_mj = list[0]+"";
	    var width_mj = list[1]+"";
	    var lenght_mj = list[2]+"";
	    if(mj_steSpec.indexOf("*(") > 0&&mj_steSpec.indexOf(")*") > 0){
	    	height_mj = mj_steSpec.substring(0,mj_steSpec.indexOf("*(")-1);
	    	width_mj = mj_steSpec.substring(mj_steSpec.indexOf("*(")+1,mj_steSpec.lastIndexOf(")*")+1);
	    	lenght_mj = mj_steSpec.substring(mj_steSpec.lastIndexOf(")*")+2,mj_steSpec.length);
	    }
	    if(procTypeName=="纵剪"){
	    	var width_sy = 0;
			obj.find("input[name='wide']").each(function(){
	        	var quantity = parseFloat($(this).parents(".list2_num").find("input[name$='quantity']").val());
	        	width_sy+=parseFloat($(this).val())*quantity;
	        })
	        width_sy = (parseFloat(width_mj)-parseFloat(width_sy)).toFixed(1);
	        if(width_sy>0){
	        	obj.find("span[name='totalWideInfo']").html("");
	        	var htmlStr = "剩余边宽：<span style='color:#3b96dd'>"+width_sy+"</span>mm";
	        	obj.find("span[name='totalWideInfo']").html(htmlStr);
	        }
	    }
	    if(procTypeName=="纵剪+横切"){
	    	var width_sy = 0;
	    	obj.find("input[name$='procedureName']").each(function(){
	    		if($(this).val()=="纵剪"){
	    			var quantity = parseFloat($(this).parents(".list2_num").find("input[name$='quantity']").val());
	    			width_sy+=parseFloat($(this).parents(".list2_num").find("input[name='wide']").val())*quantity;
	    		}
	    	})
	    	width_sy = (parseFloat(width_mj)-parseFloat(width_sy)).toFixed(1);
	    	if(width_sy>0){
	        	obj.find("span[name='totalWideInfo']").html("");
	        	var htmlStr = "剩余边宽：<span style='color:#3b96dd'>"+width_sy+"</span>mm";
	        	obj.find("span[name='totalWideInfo']").html(htmlStr);
	        }
	    }
	}

	/**
	 * 加工方式下的计算
	 */
	function changeSpec(obj,flag){
		$(obj).val($(obj).val().replace(/\s/g, ""));
		$(obj).val($(obj).val().replace("c", "C"));
		//刚刚开始判断规格是否包含八个字符
		var strVal = $(obj).val();
		var strRegexp =  new RegExp("[^\(\)（）\+\*Xx]+"); 
		var matchStrs = strVal.match(strRegexp);
		
		if (matchStrs !=null && matchStrs[0]!=strVal){
			//说明包含八大字符,输入错误
			alert("请输入正确的尺寸");
			$(obj).val("");
			return;
		}
		var procTypeName = $("#procTypeName").val();
		var mj_Obj = $(obj).parents(".jgs2016_yllist").find(".jgs2016_jgdlist");
		var mj_steName = mj_Obj.find("input[name$='steName']").val();
		var mj_steSpec = mj_Obj.find("input[name$='steSpec']").val();
		var list = mj_steSpec.split('*');//母卷规格(固定值)
	    var height_mj = list[0]+"";
	    var width_mj = list[1]+"";
	    var lenght_mj = list[2]+"";
	    if(mj_steSpec.indexOf("*(") > 0&&mj_steSpec.indexOf(")*") > 0){
	    	height_mj = mj_steSpec.substring(0,mj_steSpec.indexOf("*(")-1);
	    	width_mj = mj_steSpec.substring(mj_steSpec.indexOf("*(")+1,mj_steSpec.lastIndexOf(")*")+1);
	    	lenght_mj = mj_steSpec.substring(mj_steSpec.lastIndexOf(")*")+2,mj_steSpec.length);
	    }
		var yj_weight = $(obj).parents("div[name='proDatail']").find("input[name='procWeight']").val();//母卷加工重量
		var thick = $(obj).parent().parent().find("input[name='thick']").val();//厚
		var wide = $(obj).parent().parent().find("input[name='wide']").val();//宽
		var longed = $(obj).parent().parent().find("input[name='longed']").val();//长
		var procNumb = $(obj).parent().parent().find("input[name$='quantity']").val();//数量
	    if(procNumb==0){procNumb = 1;}
	    var weight_z = 0;//成品重量
	    var reg = /^[0-9]*\.?[0-9]+$/;
	    var te=/^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
	    var updateObj = $(obj).parents("div[name='proDatail']");
	    var procedureName = $(obj).parent().parent().find("input[name$='procedureName']").val();
	    var density = 7.85;
	    if(mj_steName.indexOf("不锈钢")>=0||mj_steName.indexOf("不锈钢卷")>=0||mj_steName.indexOf("不锈钢板")>=0){
	    	density = 7.93;
	    }else
	    if(mj_steName=="铝板"||mj_steName=="铝卷"||mj_steName=="铝卷板"||mj_steName=="铝板材"||mj_steName=="铝卷材"){
	    	density = 2.71;
	    }
	    //纵剪计算公式为：成品重量 = 原卷重量(固定值)÷ 原卷宽度× 成品宽度× 条数
	    if(procTypeName=="纵剪"||procedureName=="纵剪"){
	    	if(mj_steName.indexOf("热轧")>=0||mj_steName.indexOf("酸洗")>=0){
	    		if(parseFloat(wide)>parseFloat(width_mj)+20){
		    		alert("超出原卷宽度！");
		    		$(obj).parent().parent().find("input[name='wide']").val(width_mj);
		    		wide = width_mj;
		    	}
	    	}else{
	    		if(parseFloat(wide)>parseFloat(width_mj)+10){
		    		alert("超出原卷宽度！");
		    		$(obj).parent().parent().find("input[name='wide']").val(width_mj);
		    		wide = width_mj;
		    	}
	    	}
	    	if(flag==1){
	    		/*var widthVal = $(obj).val();
	    		var widthExp =  new RegExp("[^\(\)（）\+\*Xx]+"); 
				var matchStrs = widthVal.match(widthExp);
				
				if (matchStrs !=null && matchStrs[0]!=widthVal){
					//说明包含八大字符,输入错误
					alert("请输入正确的尺寸");
					$(obj).val("");
					return;
				}*/
	    		
	            weight_z = parseFloat(yj_weight)/(parseFloat(width_mj)/1000)*(parseFloat(wide)/1000)*parseFloat(procNumb);
	            if(!isNaN(weight_z)){
	            	$(obj).parent().parent().find("input[name$='weight']").val(weight_z.toFixed(3));
	            }
	        }
	        if(flag==3){
	            if(!reg.test(procNumb)){
	                alert("请输入数字！");
	                $(obj).parent().parent().find("input[name$='quantity']").val(1);
	                $(obj).parent().parent().find("input[name$='quantity']").focus();
	                return false;
	            } 
	    		
	    		if(te.test(procNumb)){
	                alert("请输入正整数！");
	                $(obj).val('');
	                $(obj).parent().parent().find("input[name$='quantity']").focus();
	                return false;
	    		}
	    		
	            weight_z = parseFloat(yj_weight)/(parseFloat(width_mj)/1000)*(parseFloat(wide)/1000)*parseFloat(procNumb);
	            if(!isNaN(weight_z)){
	                $(obj).parent().parent().find("input[name$='weight']").val(weight_z.toFixed(3));
	            }
	        }
	        if(flag==4){
	        	weight_z = $(obj).val();//输入重量
	            if(!reg.test(weight_z)){
	                alert("请输入数字！");
	                $(obj).val("");
	                $(obj).focus();
	                return false;
	            }
	            if(parseFloat(weight_z)<=0){
	                alert("重量必须大于0！");
	                $(obj).val("");
	                $(obj).focus();
	                return false;
	            }
	            if(weight_z!=""){
	                procNumb_z = ((parseFloat(yj_weight))/(parseFloat(weight_z)))/((parseFloat(width_mj)/1000)*(parseFloat(wide)/1000))
	            }else{
	                procNumb_z = 1;
	            }
	            if(!isNaN(procNumb_z)){
	            	if(procNumb_z.toFixed(0)==0){
	            		procNumb_z = 1;
	            	}
	                $(obj).parent().parent().find("input[name$='quantity']").val(procNumb_z.toFixed(0));
	            }
	        }
	        $(obj).parent().parent().find("input[name$='steSpec']").val(height_mj+"*"+wide+"*"+longed);
	        var width_zj = 0;
	        var width_sy = 0;
	        var count = 0;
	        if(procedureName=="纵剪"){
	        	$(obj).parents("div[name='proDatail']").find("input[name='wide']").each(function(){
		        	var quantity = new Number($(this).parents(".list2_num").find("input[name$='quantity']").val());
		        	if($(this).parents(".list2_num").find("input[name$='procedureName']").val()=="纵剪"){
		        		if($(this).val()!=""){
		        			width_zj+=parseFloat($(this).val())*quantity;
		        		}
		        	}
		        	count++;
		        })
	        }else{
	        	$(obj).parents("div[name='proDatail']").find("input[name='wide']").each(function(){
		        	var quantity = new Number($(this).parents(".list2_num").find("input[name$='quantity']").val());
		        	if($(this).val()!=""){
		        		width_zj+=parseFloat($(this).val())*quantity;
		        	}
		        	count++;
		        })
	        }
	        width_sy = (parseFloat(width_mj)-width_zj).toFixed(1);
	        if(width_sy>=0){
	        	updateObj.find("span[name='totalWideInfo']").html("");
	        	if(width_sy>0){
	        		var htmlStr = "剩余边宽：<span style='color:#3b96dd'>"+width_sy+"</span>mm";
	        		updateObj.find("span[name='totalWideInfo']").html(htmlStr);
	        	}
	        }
	        if(width_sy<0){
	        	updateObj.find("span[name='totalWideInfo']").html("");
	        }
	        if(mj_steName.indexOf("热轧")>=0||mj_steName.indexOf("酸洗")>=0){
	        	width_sy = parseFloat(width_sy)+20;
	        }else{
	        	width_sy = parseFloat(width_sy)+10;
	        }
	        if(width_sy<0){
	        	alert("剩余宽度不足！");
	        	if(count==1){
	        		 $(obj).parent().parent().find("input[name='wide']").val(width_mj);
	 	    		 $(obj).parent().parent().find("input[name$='quantity']").val(1);
	 	    		 $(obj).parent().parent().find("input[name$='weight']").val(0);
	        	}else{
	        		 $(obj).parent().parent().find("input[name='wide']").val("");
	        		 $(obj).parent().parent().find("input[name$='quantity']").val(1);
	 	    		 $(obj).parent().parent().find("input[name$='weight']").val(0);
	        		//$(obj).parent().parent().remove();//删除重新计算
	        	}
	        	setShenYuInfo(updateObj);
	        }else{
	        	var width_ch = (parseFloat(width_zj)-parseFloat(width_mj)).toFixed(1);
	        	if(width_ch>0){
	        		updateObj.find("span[name='totalWideInfo']").html("超出原卷宽度：<span style='color:#3b96dd'>"+width_ch+"</span>mm");
	        	}
	        }
	    }
		//横切的计算公式：成品重量 = 单个母卷的厚度（单位米）* 单个母卷的宽度（单位米）* 所输入的长度（单位米）* 数量 * 密度(7.85)
	     if(procTypeName=="横切"||procTypeName=="切边开平"||procedureName=="横切"){
	    	if(flag==2){
	    		if(longed=="C"||longed=="c"||reg.test(longed)==true){}else{
	    			alert("输入错误，加工尺寸长度只能是“C”、“c”或者数字！");
	    			$(obj).parent().parent().find("input[name='longed']").val("");
	    			$(obj).parent().parent().find("input[name$='weight']").val(0);
	    			return false;
	    		}
	            weight_z = (parseFloat(height_mj)/1000)*(parseFloat(wide)/1000)*(parseFloat(longed)/1000)*(parseFloat(density))*(parseFloat(procNumb));
	            if(!isNaN(weight_z)){
	                $(obj).parent().parent().find("input[name$='weight']").val(weight_z.toFixed(3));
	            }
	    	}
	    	if(flag==3){
	    		if(!reg.test(procNumb)){
	                alert("请输入数字！");
	                $(obj).parent().parent().find("input[name$='quantity']").focus();
	                return false;
	            }
	    		
	    		
	    		if(te.test(procNumb)){
	                alert("请输入正整数！");
	                $(obj).val('');
	                $(obj).parent().parent().find("input[name$='quantity']").focus();
	                return false;
	    		}
	    		
	            weight_z = (parseFloat(height_mj)/1000)*(parseFloat(wide)/1000)*(parseFloat(longed)/1000)*parseFloat(density)*parseFloat(procNumb);
	            if(!isNaN(weight_z)){
	                $(obj).parent().parent().find("input[name$='weight']").val(weight_z.toFixed(3));
	            }
	    	}
	    	if(flag==4){//横切反算
	            weight_z = $(obj).val();//输入重量
	            if(!reg.test(weight_z)){
	                alert("请输入数字！");
	                $(obj).focus();
	                return false;
	            } 
	            if(weight_z!=""){
	                procNumb_z = ((parseFloat(weight_z))/((parseFloat(height_mj)/1000)*(parseFloat(wide)/1000)*(parseFloat(longed)/1000)*parseFloat(density)));
	            }else{
	                procNumb_z = 1;
	            }
	            if(!isNaN(procNumb_z)){
	            	if(procNumb_z.toFixed(0)==0){
	            		procNumb_z = 1;
	            	}
	                $(obj).parent().parent().find("input[name$='quantity']").val(procNumb_z.toFixed(0));
	            }
	        }
	    	$(obj).parent().parent().find("input[name$='steSpec']").val(height_mj+"*"+wide+"*"+longed);
	    	var sumWeight = 0;
	    	var count = 0;
	    	var zj_weight = 0;
	    	var hq_weight = 0;
	    	updateObj.find("input[name$='weight']").each(function(){
	        	sumWeight+=parseFloat($(this).val());
	        	count++;
	        })

	        if((sumWeight.toFixed(3)-parseFloat(yj_weight).toFixed(3))>0&&procedureName!="横切"){
	        	alert("可用原卷重量不足！");
	        	if(count==1){
	        		$(obj).parent().parent().find("input[name='longed']").val("");
		    		$(obj).parent().parent().find("input[name$='quantity']").val(1);
		    		$(obj).parent().parent().find("input[name$='weight']").val(0);
	        	}else{
	        		$(obj).parent().parent().find("input[name='longed']").val("");
	        		$(obj).parent().parent().find("input[name$='quantity']").val(1);
	        		$(obj).parent().parent().find("input[name$='weight']").val(0);
	        		//$(obj).parent().parent().remove();//删除当前行
	        	}
	        }
	        //加工方式是“纵剪+横切”
	    	if(procedureName=="横切"){
	    		//var nameStr = $(obj).parents(".list2_num").attr("name");
	    		updateObj.find(".list2_num").each(function(){
	    		/*updateObj.find("div[name='"+nameStr+"']").each(function(){*/
	    			if($(this).find("input[name$='procedureName']").val()=="纵剪"){
	    				zj_weight+=parseFloat($(this).find("input[name$='weight']").val()); 
	    			}
	    			if($(this).find("input[name$='procedureName']").val()=="横切"){
	    				hq_weight+=parseFloat($(this).find("input[name$='weight']").val());
	    			}
	    		})
	    		if((zj_weight-hq_weight).toFixed(3)>0&&hq_weight.toFixed(3)!=0){
	    			var hqsyStr = "余：<span style='color:#3b96dd'>"+(zj_weight-hq_weight).toFixed(3)+"</span>吨"
	    			updateObj.find("div[name='"+nameStr+"']").find("span[name='hqsyInfo']").html(hqsyStr);
	    		}else{
	    			updateObj.find("div[name='"+nameStr+"']").find("span[name='hqsyInfo']").html("");
	    		}
	    		if(zj_weight.toFixed(3)!=0&&(hq_weight.toFixed(3)-zj_weight.toFixed(3))>0){
	    			alert("可用纵剪重量不足！");
		        	if(count==1){
		        		$(obj).parent().parent().find("input[name='longed']").val("");
			    		$(obj).parent().parent().find("input[name$='quantity']").val(1);
			    		$(obj).parent().parent().find("input[name$='weight']").val(0);
		        	}else{
		        		$(obj).parent().parent().find("input[name='longed']").val("");
			    		$(obj).parent().parent().find("input[name$='quantity']").val(1);
			    		$(obj).parent().parent().find("input[name$='weight']").val(0);
		        		//$(obj).parent().parent().remove();//删除当前行
		        	}
	    		}
	    		//“纵剪+横切” 全部横切
	    		if(sumWeight.toFixed(3)==hq_weight.toFixed(3)&&(sumWeight.toFixed(3)-parseFloat(yj_weight).toFixed(3))>0){
	    			alert("可用原卷重量不足！");
		        	if(count==1){
		        		$(obj).parent().parent().find("input[name='longed']").val("");
			    		$(obj).parent().parent().find("input[name$='quantity']").val(1);
			    		$(obj).parent().parent().find("input[name$='weight']").val(0);
		        	}else{
		        		$(obj).parent().parent().find("input[name='longed']").val("");
			    		$(obj).parent().parent().find("input[name$='quantity']").val(1);
			    		$(obj).parent().parent().find("input[name$='weight']").val(0);
		        		//$(obj).parent().parent().remove();//删除当前行
		        	}
	    		}
	    	}
	    }
	    if(procTypeName!="纵剪"&&procTypeName!="横切"&&procedureName!="纵剪"&&procedureName!="横切"){
	    	var sumWeight = 0;
	    	var count = 0;
		    updateObj.find("input[name$='weight']").each(function(){
	        	sumWeight+=parseFloat($(this).val());
	        	count++;
	        })
	        if((sumWeight.toFixed(3)-parseFloat(yj_weight).toFixed(3))>0){
	        	alert("可用原卷重量不足！");
	        	if(count==1){
	        		$(obj).parent().parent().find("input[name$='quantity']").val(1);
		    		$(obj).parent().parent().find("input[name$='weight']").val(0);
	        	}else{
	        		$(obj).parent().parent().find("input[name$='quantity']").val(1);
		    		$(obj).parent().parent().find("input[name$='weight']").val(0);
	        		//$(obj).parent().parent().remove();//删除当前行
	        	}
	        }
	    }
	    //设置厚宽长
	    var steSpecStr = height_mj+"*"+$(obj).parent().parent().find("input[name='wide']").val()+"*"+$(obj).parent().parent().find("input[name='longed']").val();
	    $(obj).parent().parent().find("input[name$='steSpec']").val(steSpecStr);
	    var nameStr = $(obj).parents(".list2_num").attr("name");
	    sumDivWeight(updateObj,nameStr);//合计重量
	    searchProcPriceInput(obj);
	}

	//add 20161012 合包
	function setOptionHb(obj){		
		myobj=$(obj)
			
		if(myobj.hasClass("checkedsel")){
			myobj.removeClass("checkedsel");
			myobj.find("input").prop("checked",false);
			$("#jg_Buthb").hide();
		}else{
			myobj.addClass("checkedsel");
			myobj.find("input").prop("checked",true);
			setHbPosition(myobj);
			//checkedPartNo(obj);
		}
		
		
	}
	
	/*function checkedPartNo(obj){ //合包，零件号校验
		var checkedD = $(obj).parents("div[name='proDatail']").find("input[type='checkbox']:checked");
		var arr = [];
		var size = checkedD.size();
		if(size!=""&&size!=null&&size!="undefined"&&size>1){		
			checkedD.each(function(){
				var partNo = $(this).parents("span.fl").find("input[name$='partNo']").val();
				arr.push(partNo);
				if(arr.length>1){
					var nary=arr.sort();
					for(var i=0;i<arr.length-1;i++){
						if (nary[i]!=nary[i+1]){
							alert("您所选明细的零件号不一致，不能合包");
							$(obj).parents("span.fl").find("input[name='prod']").prop("checked",false);
							return;
						}
					}
				}
			});
		}
		
	}*/

	function setHbPosition(myobj){
		var procTypeName = $("#procTypeName").val();
		if(procTypeName!="分卷"&&procTypeName!="重卷"&&procTypeName!="更新包装"){
			var x=myobj.offset().left-45;
			var y=myobj.offset().top;
			$("#jg_Buthb").css({"left":x,"top":y});
			$("#jg_Buthb").show();
		}
	}

	function setHb_remove(obj){
		$(obj).parent().hide();
		var count = 0;
		var hbCount = $("#hbCount").val();
		var a = 0;
		var b = 0;
		var reg = /^[0-9]*\.?[0-9]+$/;
		var arr=[];
		$(".jgs2016_yllist").find("input[type='checkbox']:checked").each(function(){
			var partNo = $(this).parents("span.fl").find("input[name$='partNo']").val();
			arr.push(partNo);
			if(!reg.test($(this).parents(".list2_num").find("input[name='longed']").val())){
				a = 1;
			}else{
				b = 1;
			}
			count++;
		});
		if(arr.length>1){
			var nary=arr.sort();
			for(var i=0;i<arr.length-1;i++){
				if (nary[i]!=nary[i+1]){
					alert("您所选明细的零件号不一致，不能合包");
					$(".jgs2016_yllist").find("input[type='checkbox']:checked").attr("checked",false);
					return;
				}
			}
		}
		if(a!=0&&b!=0){
			alert("钢板不能与钢卷合包！");return;
		}
		if(count<2){
			//alert("至少选择两个及以上加工尺寸合包！");return;
		}
		$(".jgs2016_yllist").find("input[type='checkbox']:checked").each(function(){
			$(this).parents(".list2_num").find("input[name$='packageName']").val("合"+hbCount);
			$(this).parents(".list2_num").find(".hbbg").html("合"+hbCount+"<i onclick='de_Hb(this)' op='"+hbCount+"'></i>");
			$(this).parents(".list2_num").find(".hbbg").show();
			$(this).prop("checked",false);
			$(this).attr("disabled",true);
		});
		hbCount++;
		$("#hbCount").val(hbCount);
	}

	function de_Hb(obj){
		var code = $(obj).attr("op");
		$(".jgs2016_yllist").find("i[op="+code+"]").each(function(){
			var myobj = $(this).parents(".fl").find("div.checksel");
			if(myobj){
				myobj.removeClass("checkedsel");
				myobj.find("input").prop("checked",false);
				myobj.find("input").attr("disabled",false);
			}
			$(this).parent("span.hbbg").hide();
			$(this).parents(".list2_num").find("input[name$='packageName']").val("");
		});
		$(".jgs2016_yllist").find("i").each(function(){
			var selCode = $(this).attr("op");
			if(parseFloat(selCode)>parseFloat(code)){
				$(this).parent("span.hbbg").html("合"+(parseFloat(selCode)-1).toFixed(0)+"<i onclick='de_Hb(this)' op='"+(parseFloat(selCode)-1).toFixed(0)+"'></i>");
				$(this).parents(".list2_num").find("input[name$='packageName']").val("合"+(parseFloat(selCode)-1).toFixed(0));
			}
		});
		$("#hbCount").val((parseFloat($("#hbCount").val())-1).toFixed(0));
	}
