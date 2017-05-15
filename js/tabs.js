/*
by lily
*/

window.onload = function() {
	// 获取后台页面上方已点击的 tab
	function getTabs(){
		var windowWidth = document.getElementsByClassName('sidebar-max')[0].offsetWidth;
		var topTagsWidth = $('topTags').offsetWidth;
		var topLeftWidth = $('main-top-left').offsetWidth;
		var topRightWidth = $('main-top-right').offsetWidth;
		var centerTabsWidth = windowWidth - (topLeftWidth + topRightWidth + 15);
		$('topTags').style.width = centerTabsWidth + "px";

		var liWidth = document.querySelector('#topTags > ul > li').offsetWidth;
		var liLength = document.querySelectorAll('#topTags > ul > li').length;
		var centerWidth = liWidth * liLength;
	    if(centerWidth > centerTabsWidth){
	    	ShowFailure('达到限制!');
	    	return false;
	    }else{
	    	return true;
	    }
	}


	function $(id) {
		return document.getElementById(id)
	}

	var welcome = $("welcome");
	welcome.className = "bounceIn animated infinite";

	    var menu = $("topTags").getElementsByTagName("ul")[0]; //顶部菜单容器
	    var tags = menu.getElementsByTagName("li"); //顶部菜单
	    // var cks = $("leftMenuSys").getElementsByTagName("ul")[0].getElementsByTagName("li"); //左侧菜单
	    var ckd = $("leftMenuDevlop").getElementsByTagName("ul")[0].getElementsByTagName("li"); //左侧菜单
	    // var cku = $("leftMenuUser").getElementsByTagName("ul")[0].getElementsByTagName("li"); //左侧菜单
	    // console.log(ckd)
	    var j;
	    //点击左侧菜单增加新标签
	    for (i = 0; i < ckd.length; i++) {
	    	ckd[i].onclick = function() {
	    		// console.log($('sidebar').getElementsByTagName("ul")[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute("data-id"))
	    		$('sidebar').className = "leftmenu fixed";
                // this.className = "bk";
	            // $("welcome").style.display = "none" //欢迎内容隐藏
	            //循环取得当前索引
	            for (j = 0; j < 25; j++) {
	            	if (this == ckd[j]) {
	            		// console.log(ckd[j])
						
	            		// console.log($('p' + j))
	            		if ($("p" + j) == null) {
	                        openNew(j, this.innerHTML); //设置标签显示文字
	                        var maxWidth = getTabs();
	                    }
	                    clearStyle();
	                    $("p" + j).style.backgroundColor = "#ff7c34"; // 11.28
	                    $("p" + j).className = "tabActive"; // 11.28
	                    // clearContent();
	                    // $("c" + j).style.display = "block";
	                }
	            }
	            return false;
	        }
	    }

	    //增加或删除标签
	    function openNew(id, name) {
	    	var tagMenu = document.createElement("li");
	    	var bk = $("topTags");
	        //判断访问终端
	        var browser={
	        	versions:function(){
	        		var u = navigator.userAgent, app = navigator.appVersion;
	        		return {
			            trident: u.indexOf('Trident') > -1, //IE内核
			            presto: u.indexOf('Presto') > -1, //opera内核
			            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
			            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			            iPad: u.indexOf('iPad') > -1, //是否iPad
			            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			            qq: u.match(/\sQQ/i) == " qq" //是否QQ
			        };
			    }(),
			    language:(navigator.browserLanguage || navigator.language).toLowerCase()
			}

			tagMenu.id = "p" + id;
			tagMenu.innerHTML = name + "   " + "<i class='icon-close'>×</i>";
			bk.className = "bk";
	        //标签点击事件
	        // console.log(tagMenu)
	        tagMenu.onclick = function(evt) {
	        	console.log(tagMenu)
	        	clearStyle();
	        	tagMenu.style.backgroundColor = "#ff7c34"; // 11.28
	        	tagMenu.className = "tabActive"; // 11.28

	        	// clearContent();
	        	// console.log($("c") + id)
	        	// $("c" + id).style.display = "block";
	        }
	        //标签内关闭图片点击事件
	        tagMenu.getElementsByTagName("i")[0].onclick = function(evt) {
	        	console.log('关闭',tagMenu);
	        	var mainMenu = this.parentNode.children[0].getAttribute('data-id');
	        	var contentHtml = $("content").children["menu0"];
	        	var mainContent = $("content").getElementsByTagName("div")[0].getAttribute('data-id');
	        	console.log(contentHtml)

	        	this.parentNode.parentNode.removeChild(tagMenu); //删除当前标签
	        	var liCount = $('topTags').getElementsByTagName('li').length;
	        	console.log(liCount)
	        	if(liCount == 0){
	        		var mark = $("content").getElementsByClassName("mark")[0];
	        		if(mark){
	        			mark.style.display = 'none';
	        		}
	        		console.log($('content').children["menu0"]);
	        		console.log(contentHtml.parentNode.removeChild(contentHtml));
	        		
	        		// $('content').children["menu0"].style.display='none';
	        		welcome.style.display = 'block';
	        		welcome.className = "bounceIn animated infinite";
	        	}else{
	        		var rightid = $('topTags').getElementsByTagName('li')[liCount-1].getElementsByTagName('a')[0].getAttribute('data-id');
	        		document.querySelectorAll('#leftMenuDevlop > ul li > a[data-id="'+ rightid +'"]')[0].click();
	        		// $('.topMenu li a[data-id="menu5"]')[0].click()
	        	}
	        	evt = (evt) ? evt: ((window.event) ? window.event: null);
	        	if (evt.stopPropagation) {
	        		evt.stopPropagation()
	            } //取消opera和Safari冒泡行为;

	            var color = tagMenu.style.backgroundColor;
	            // alert(color)
	            //设置如果关闭一个标签时，让最后一个标签得到焦点
	            if (color == "#ff7c34" || color == "rgb(255, 124, 52)") { //区别浏览器对颜色解释  // 11.28
	            	if (tags.length - 1 >= 0) {
	            		clearStyle();
	            		tags[tags.length - 1].style.backgroundColor = "#ff7c34"; // 11.28
	            		tags[tags.length - 1].className = "tabActive"; // 11.28
	            		// clearContent();
	            		var cc = tags[tags.length - 1].id.split("p");
	            		// $("c" + cc[1]).style.display = "block";
	            	} else {
	            		// clearContent();
	            		bk.className = " ";
	            		// $("welcome").style.display = "block"
	            	}
	            }

	            if(browser.versions.mobile||browser.versions.android||browser.versions.ios){
	            	// if (color == "#ffff00" || color == "#ff7c34" || color == "rgb(255,250,250)") { //区别浏览器对颜色解释
		            //     if (tags.length - 1 >= 0) {
		            //         clearStyle();
		            //         tags[tags.length - 1].style.backgroundColor = "#ff7c34";
		            //         clearContent();
		            //         var cc = tags[tags.length - 1].id.split("p");
		            //         $("c" + cc[1]).style.display = "block";
		            //     } else {
		            //         clearContent();
		            //         bk.className = " ";
		            //         $("welcome").style.display = "block"
		            //     }
		            // }
		            // clearContent();
		            bk.className = " ";
		            $("welcome").style.display = "block"
		        }
		    }
		    menu.appendChild(tagMenu);
		}
	    //清除标签样式
	    function clearStyle() {
	    	for (i = 0; i < tags.length; i++) {
	    		menu.getElementsByTagName("li")[i].style.backgroundColor = "#ffffff"; // 11.28
	    		menu.getElementsByTagName("li")[i].className = ""; // 11.28
	    	}

	    }
	    //清除内容
	    function clearContent() {
	    	for (i = 0; i < 11; i++) {
	    		console.log($("c" + i));
	    		$("c" + i).style.display = "none";
	    	}
	    }
	}
