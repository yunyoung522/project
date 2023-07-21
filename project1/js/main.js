$(function(){
	let winT=0;
	let topFlag=false;	

	$(window).scroll(function(){
		winT=$(window).scrollTop();

		if(winT > 100){
			$("#header").addClass("active");
			topFlag=true;
		}
		else {
			$("#header").removeClass("active");
			topFlag=false;
		}
	});

	$(window).trigger("scroll");
	
	$("#gnb > ul").hover(
		function(){
			$("#header").addClass("active");
		},
		function(){
			if(topFlag == false){
				$("#header").removeClass("active");
			}
		}
	);

	$("#header .tab").click(function(e){
		e.preventDefault();

		if($(this).hasClass("open") == false){
			$(this).addClass("open");
			$("body").addClass("fixed");
			$(".total_menu").fadeIn(300, function(){
				$("#mobile_menu").addClass("init");
			});
		}
		else{
			$(this).removeClass("open");
			$("body").removeClass("fixed");
			$(".total_menu").fadeOut(300);
		}
	});
	let isMobile;
	let winw;

	$(window).resize(function(){
		winw=$(window).width();

		if(winw <= 760){
			isMobile=true;
		}
		else{
			isMobile=false;
				$("#mobile_menu > ul > li").removeClass("active");
				$("#mobile_menu > ul ul").removeAttr("style");

		}
	});

	$(window).trigger("resize");

   $("#mobile_menu > ul > li").click(function(e){
      e.preventDefault();

      if($(this).hasClass("active") == false){
         $("#mobile_menu > ul > li").removeClass("active");
         $(this).addClass("active");
         $("#mobile_menu ul ul").slideUp(300);
         $(this).find("ul").slideDown(300);
      }
      else{
         $(this).removeClass("active");
         $(this).find("ul").slideUp(300);
      }
   });

   	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		}
	});

	trigger.add(".start, .category");

	let video=document.getElementById("bg_video");
	video.muted=true;

	video.addEventListener("loadeddata", function(){
		video.play();
		$(".visual_video").addClass("visible");
	});
	video.addEventListener("ended", function(){
		video.play();
	});
});
