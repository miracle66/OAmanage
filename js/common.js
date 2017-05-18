/**
 * Created by lily on 2016/12/2.
 */


/**
 * 点击左侧菜单 页面内容切换
 */
 function turnPage(url,that){
	// var maxWidth = getTabs();
	var leftId = $(that).attr('data-id');
	$("#welcome").hide();
	var rightContent = [];
	var has = false;
	// 追加 menu.js  tableSelect.js
	var scriptMenu = document.createElement("script");
	var scriptTabSel = document.createElement("script");
	scriptMenu.type = "text/javascript";
	scriptMenu.src = "js/menu.js";
	scriptTabSel.type = "text/javascript";
	scriptTabSel.src = "js/tableSelect.js";
	setTimeout(function(){
		document.getElementsByTagName('body')[0].appendChild(scriptMenu);
		document.getElementsByTagName('body')[0].appendChild(scriptTabSel);
	},500)

	console.log($(that).attr('data-id'))
	var txtIn = $(that).attr('data-id');
	if(txtIn.indexOf("Apply") > 0){
		var uploader = document.createElement("script");
		uploader.type = "text/javascript";
		uploader.src = "js/process/uploader.js";
		setTimeout(function(){
			document.getElementsByTagName('body')[0].appendChild(uploader);
		},500)
	}

	var scriptArr = $('body').find("script");
	scriptArr.each(function(i,el){
		// console.log($(scriptArr[i]).attr('src'))
		if($(scriptArr[i]).attr('src') == 'js/menu.js' || $(scriptArr[i]).attr('src') == 'js/tableSelect.js' || $(scriptArr[i]).attr('src') == 'js/process/uploader.js'){
			$("script[src='js/menu.js']").remove();
			$("script[src='js/tableSelect.js']").remove();
			$("script[src='js/process/uploader.js']").remove();
		}
	})


	
	// 循环#content下面的 name 为 menu0的div
	$("#content div[name='menu0']").each(function(){
		rightContent.push($(this).attr('data-id'));
	});

	if(rightContent.length == 0){
		$.ajax({
			type:"get",
			url:url,
			success:function(html){
				$("#content").append(html);
			}
		})
	}else{
		$(rightContent).each(function(i,el){
			if(rightContent[i] === leftId){
				has = true;
			}
		})
		if(!has){
			$.ajax({
				type:"get",
				url:url,
				async:false,
				success:function(html){
					$("#content").append(html);
				}
			})
		}
		$("#content div[data-id="+leftId+"]").show().siblings('div[name="menu0"]').remove();
		$("#content div[data-id="+leftId+"]").addClass('mark').siblings().removeClass('mark');
	}
}


//IE兼容placeholder
if( !('placeholder' in document.createElement('input')) ){
	$('input[placeholder],textarea[placeholder]').each(function(){
		var that = $(this),
		text= that.attr('placeholder');
		if(that.val()===""){
			that.val(text).addClass('placeholder');
		}
		that.focus(function(){
			if(that.val()===text){
				that.val("").removeClass('placeholder');
			}
		})
		.blur(function(){
			if(that.val()===""){
				that.val(text).addClass('placeholder');
			}
		})
		.closest('form').submit(function(){
			if(that.val() === text){
				that.val('');
			}
		});
	});
}

/**
 * 页面左侧菜单 点击一级菜单 展开二级菜单js
 */
 var $menu = $('.topMenu a');
 $menu.on('click', function () {
 	var fg = $(this).siblings('.childMenu').hasClass('fadeIn animated infinite menu-active');
    var fp = $(this).parent('.topMenu').siblings().children('.childMenu');
	 console.log(fg);
	 console.log(fp);
 	if (fg) {
 		$(this).siblings('.childMenu').slideUp("fast");
 		$(this).siblings('.childMenu').removeClass('fadeIn animated infinite menu-active');
 	} else {
 		$(this).siblings('.childMenu').slideDown("fast");
 		$(this).siblings('.childMenu').addClass('fadeIn animated infinite menu-active');

		$(this).parent('.topMenu').siblings().children('.childMenu').slideUp("fast");
		$(this).parent('.topMenu').siblings().children('.childMenu').removeClass('fadeIn animated infinite menu-active');
 	}
 })
