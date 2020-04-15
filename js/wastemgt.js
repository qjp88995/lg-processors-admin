/**
 * Created by zhuhw on 2017/8/2.
 */
$(function() {
    $(".menu").children('li').find("a").removeClass('on');
    $(".wastemgttop").addClass("on");
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

    //展开收起开始
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
    //展开收起结束

    //招标要求展开/收起
    $(".btn-tender-require").on("click",function() {
        $(this).parent(".tender-require").find(".tender-require-content").toggle();
    })

    //点击审批弹出审批弹出框
    $("#approvePass").on("click",function() {
        $("#approveBox").show();
        // 设置弹出框的位置进行垂直居中
        var topDialog = $("#approveBox .dialog").height();
        $("#approveBox .dialog").css("margin-top",-Math.round(topDialog/2));
    })
    $("#approveBox .js-icon-close").on("click",function() {
        $(this).parents("#approveBox").hide();
    })


})

