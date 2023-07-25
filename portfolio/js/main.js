$(function(){
	let n=0;
	let pos=0;
	let winHalf;

	$("#gnb li").eq(n).addClass("active");

	$(window).resize(function(){
		winHalf=0.75*$(window).height();
	});

	$(window).trigger("resize");

	function scrollInteraction(t){
		if(t < $("#page1").offset().top-winHalf){
			n=0;
		}
		else if(t < $("#page2").offset().top-winHalf){
			n=1;
		}
		else if(t < $("#footer").offset().top-winHalf){
			n=2;
		}
		else {
			n=3;
		}
	}

	$("#gnb li").click(function(e){
		e.preventDefault();
		n=$(this).index();

		if(n == 0){
			pos=0;
		}
		else if(n == 3){
			pos=Math.round($("#footer").offset().top);
		}
		else{
			pos=Math.round($("#page"+n).offset().top);
		}
		$("html").animate({scrollTop: pos}, 600, function(){
			$("#gnb li").removeClass("active");
			$("#gnb li").eq(n).addClass("active");
		});
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
		},
		scroll: {
			element: window,
			callback: (offset, dir) => {
				scrollInteraction(offset.y);
			}
		}
	});

	trigger.add("#start, section[id^=page], #footer");

	$("#header a.tab").click(function(e){
		e.preventDefault();
		
		if($(this).hasClass("open")==false){
			$(this).addClass("open");
			$("body").addClass("fixed");
			$(".main_slider").fadeOut(300);
			$("#header .total").fadeIn(300);
		}
		else{
			$(this).removeClass("open");
			$("body").removeClass("fixed");
			$(".main_slider").fadeIn(300);
			$("#header .total").fadeOut(300);
		}
	});
	$("#header .total li").click(function(e){
		e.preventDefault();
		n=$(this).index();
		$("#header .tab").removeClass("open");
		$("body").removeClass("fixed");
		$(".main_slider").fadeIn(300);
		$("#header .total").fadeOut(300, function(){
			if(n == 0){
				pos=0;
			}
			else if(n == 3){
				pos=Math.round($("#footer").offset().top);
			}
			else{
				pos=Math.round($("#page"+n).offset().top);
			}
			$("html").animate({scrollTop: pos}, 600, function(){
				$("#gnb li").removeClass("active");
				$("#gnb li").eq(n).addClass("active");
			});
		});
	});

	let video=document.getElementById("bg_video");
	video.muted=true;

	video.addEventListener("loadeddata", function(){
		video.play();
		$(".swiper-slide list1").addClass("visible");
	});
	video.addEventListener("ended", function(){
		video.play();
	});
	const offsetData={
		shadowInfo: [
			{left: "0%", width: "50%"},
			{left: "50%", width: "40%"},
			{left: "0%", width: "40%"},
		],
		textInfo: [
			{left: "55%"},
			{left: "5%"},
			{left: "45%"},
		]
	};

	const titleData=[
		{
			title: "Tmap Mobility",
			subject: "<dt>반응형 프로젝트 제작</dt><dd><span>현대 Xteer 사이트 리뉴얼</span><span>HTML5 + CSS3 + jQuery</span><span>제작기간 3주</span></dd>",
			link: "https://yunyoung522.github.io/project/project1"
		},
		{
			title: "한국도자기",
			subject: "<dt>반응형 프로젝트 제작</dt><dd><span>HTML5 + CSS3 + jQuery</span><span>제작기간 3주</span></dd>",
			link: "https://yunyoung522.github.io/project/project2"
		},
		{
			title: "Wylie",
			subject: "<dt>반응형 프로젝트 제작</dt><dd><span>HTML5 + CSS3 + jQuery</span><span>제작기간 3주</span><dd>",
			link: "https://yunyoung522.github.io/project/project3"
		}
	];

	let current, total, winw;

	let mainSwiper=new Swiper(".mainSwiper", {
		allowTouchMove: false,
		loop: true,
		autoplay: {
			delay: 8000,
			disableOnInteraction: false
		},
		on: {
			init: function(){
				current=this.realIndex;
				total=this.slides.length;

				$(".main_slider .keytext").removeClass("active");
				$(".main_slider .swiper_control .current").text("0"+(current+1));
				$(".main_slider .swiper_control .total").text("0"+total);
				$(".main_slider .progressbar span").delay(10).animate({width: "100%"}, 8000);

				setTimeout(function(){
					$(".main_slider .swiper-slide.list"+(current+1)).find(".area").addClass("active");
					$(".main_slider .keytext").addClass("active");

					if(winw > 720){
						$(".main_slider .keytext").css({left: offsetData.textInfo[current].left});
					}
					else{
						$(".main_slider .keytext").css({left:30});
					}
					$(".main_slider .shadow").css({left: offsetData.shadowInfo[current].left, width: offsetData.shadowInfo[current].width});
					$(".main_slider .keytext .title").html(titleData[current].title);
					$(".main_slider .keytext .subject").html(titleData[current].subject);
					$(".main_slider .keytext .link").attr("href", titleData[current].link);
					
				}, 1200);
			},
			slideChange: function(){
				current=this.realIndex;
				total=this.slides.length;

				$(".main_slider .swiper-slide .area").removeClass("active");
				$(".main_slider .keytext").removeClass("active");
				$(".main_slider .progressbar span").stop().removeAttr("style");
				$(".main_slider .swiper_control .current").text("0"+(current+1));
				$(".main_slider .swiper_control .total").text("0"+total);
				$(".main_slider .progressbar span").delay(10).animate({width: "100%"}, 8000);

				setTimeout(function(){
					$(".main_slider .swiper-slide.list"+(current+1)).find(".area").addClass("active");
					$(".main_slider .keytext").addClass("active");
					
					if(winw > 720){
						$(".main_slider .keytext").css({left: offsetData.textInfo[current].left});
					}
					else{
						$(".main_slider .keytext").css({left: 30});
					}
					$(".main_slider .shadow").css({left: offsetData.shadowInfo[current].left, width: offsetData.shadowInfo[current].width});
					$(".main_slider .keytext .title").html(titleData[current].title);
					$(".main_slider .keytext .subject").html(titleData[current].subject);
					$(".main_slider .keytext .link").attr("href", titleData[current].link);
				}, 600);
			}
		}
	});
	$(window).resize(function(){
		winw=$(window).width();

		if(winw > 720){
			$(".main_slider .keytext").css({left: offsetData.textInfo[current].left});
		}
		else{
			$(".main_slider .keytext").css({left: 30});
		}
	});
	$(window).trigger("resize");

	$(".main_slider .page_control .bt_prev").click(function(e){
		e.preventDefault();
		mainSwiper.slidePrev();
	});
	$(".main_slider .page_control .bt_next").click(function(e){
		e.preventDefault();
		mainSwiper.slideNext();
	});
});
/* window.addEventListener("load", function(){
   let mainSlider=document.querySelector(".main_slider");
   let [swiper, progress, control]=mainSlider.children;
   let currentLabel=progress.querySelector(".current");
   let totalLabel=progress.querySelector(".total");
   let progressbar=progress.querySelector(".progress");
   let [prevBtn, nextBtn]=control.children;
   console.log(prevBtn, nextBtn);
});


 */