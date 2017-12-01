//load引入公告,到公告区(id为gonggao的div)
$("#gonggao").load("../html/top_footer.html #notice",function(){
	$(".icon-x").click(function(){
		$("#notice").remove();
	});
});
//将头部(包含--地区,币种,登陆,注册等),引入头部top
$("#header").load("../html/top_footer.html #headertop",function(){
	//个人中心//国家和币种
	$(".list").on({
		"mouseenter":function(){
			$(this).addClass("hover")
					.children("ul")
					.stop()
					.slideDown(100);
		},
		"mouseleave":function(){
			$(this).removeClass("hover")
						.children("ul")
						.stop()
						.fadeOut(100);
		}
	});
	//给个人中心//国家和币种每个li--a添加点击事件
	$(".list .op").on("click","li",function(){
		
//		将当前点击的li下a下span(.con)的内容赋给.list下的a下的span(con1)
		//当前点击的父元素的父元素的子元素的子元素
		$(this).parent().parent().children("a").children("span").remove() ;
		
//		console.log($(".list>a").html());

		//将当前点击的子元素ahtml()添加到-----当前点击的父元素的父元素的子元素(a)的里面
		$(this).parent().parent().children("a").append($(this).children("a").html())  ;
		
		//如果当前点击的父元素的父元素的子元素a的子元素第二个span(就是包含文字的span)的内容
		//== 当前点击的(li)的子元素a的class名为.con的span的内容, 就改变当前的(li)的子元素的a的字体颜色,并清除当前点击的li的所有兄弟的子元素a的color值
		if($(this).parent().parent().children("a").children("span").eq(1).html() ==  $(this).children("a").children(".con").html() ){
			$(this).children("a").css("color","red")
									.end()
									.siblings()
									.children("a")
									.css("color","");
		}
		
		//console.og( $(this).parent().parent().children("a").children(".con1").html());
//		//console.log( $(".list a").children(".con1").html() );
		//console.log( $(this).parent().parent().children("a").children("span").eq(1).html() ==  $(this).children("a").children(".con").html() );
		//console.log( $(this).children("a").children(".con").html());
	});
	//下载手机版
	$(".phone").on({
		"mouseenter":function(){
			$(this).children("ul")
					.stop()
					.fadeIn(300)
		},
		"mouseleave":function(){
			$(this).children("ul")
					.stop()
					.fadeOut(300)
		}
	});
	//划过nav--类名(op)下面的li改变a字体颜色
	$("#topnav .op>li").on({
		"mouseenter":function(){
			$(this).children("a").addClass("huaguo");
		},
		"mouseleave":function(){
			$(this).children("a").removeClass("huaguo");
						
		}
	});

	//请求json数据 //搜索框下面的推荐数据
	$.ajax({
		type:"get",
		url:"../json/tuijian.json",
		success:function(res){
			var obj = res;
			var arr = obj.tuijian;
			$.each(arr,function(ind,val){
				//console.log(val.tname);
				var a = $("<a></a>");
				var span = $("<span></span>");
				span.append("|");
				a.append(val.tname);
				$("#recommend").append(a);
				$("#recommend").append(span);
				span.css({
						"padding-left":"5px",
						"padding-right":"5px"
				});
				//console.log(val.imp);
				a.css({
						"fontSize":"12px"
					});
				if( val.imp ){
					a.css({
						"color":"red",
						"fontSize":"12px"
					});
				}
			});
			$('#recommend>span:last').remove();
		}
	});
	
	//请求json数据 //选项卡列表.用于动态创建选项卡
	$.ajax({
		type:"get",
		url:"../json/Table.json",
		success:function(res){
			var dl = "";
			var dd = "";
			var li = "";
			var til = "";
			var mond = "";
			var brr = [];
			var obj = res;
			//console.log(obj);
			$.each(obj, function(ind,val){
				//console.log(val);
				$.each(val, function(ind,val) {
					//console.log(val.tab);
					//console.log(val.item);
					tab = val.tab;
					console.log(tab);
					//var arr = val.item[0].fenlei;
					var arr = val.item;
					brr = arr;
					//var brrtitle = val.item[0].fenlei[0].title;
					console.log(arr);
					//console.log(brrtitle);
					dl += `
						<dl><dt>${tab}</dt></dl>
					`;
				});
				$.each(brr,function(ind,val) {
						//console.log(val.title);
						//var title = val.title;
						var fenlei = val.fenlei;
						console.log(fenlei);
						//var con = val.con;
						/*li += `
							<dd><ul class="xuanxiang"><li>${val.title}</li></ul></dd>
						`;*/
						//console.log(val);
					$.each(fenlei, function(ind,val) {
						//console.log(val);
//						m = val.title;
						//var title = `<li>${val.title}</li>`;
						var con = val.con;
						console.log(con);
						$.each(con, function(ind,val) {
							console.log(val);
							mond += `<li>${val.monad}</li>`;
						});
						li += `
								<ul class="xuanxiang"><li>${val.title}</li>${mond}</ul>
							`;
						//console.log(mond);
						mond = "";
					});
					//li = $("<dd><ul class='xuanxiang'><li>"+val.title+"</li>"+mond+"</ul></dd>");
					//console.log(mond);
					//li.append(mond);
					til += `
						<dd>${li}</dd>
					`;
				});
				//dl = $("<dl><dt>"+tab+"</dt><dd>"+li+"</dd></dl>");
				console.log(til);
				$("#xuanxiangka").append(dl);
				/*dl = `
					<dl><dt>${tab}</dt><dd>${til}</dd></dl>
				`;*/
				$("dl").append(til);
				//$(".xuanxiang").append(li);
				li = "";
				console.log(dl);
				dl = "";
			});
		}
	});
	
	//给选项卡添加划过效果
	$("#uls_box").on("mouseenter","li:has(div)",function(){
		$(this).children("div").stop().slideDown(1);
	}).on("mouseleave","li:has(div)",function(){
		$(this).children("div").stop().slideUp(1);
	});
	
	
//	给选项卡每一项添加划过效果
	$("#xuanxiangka").on("mouseenter","dt",function(){
		//移入改变当前dt背景色与字体颜色值,清除其父级的子元素dt的背景色与字体颜色值(换成成默认的)
		$(this).stop().animate({
			"background-color": "white",
			"color":"black"
		},360).parent().siblings().children("dt").stop().animate({
			"background-color": ("rgba(22,54,114,0)"),
			"color":"white"
		},1);
		//dd的显示与隐藏   当前dt的兄弟元素dd显示,父节点的兄弟元素的子元素dd隐藏
		$(this).siblings().show()
							.end()
							.parent()
							.siblings()
							.children("dd")
							.hide();
		
	})
	$("body").css("height",4000);
});
