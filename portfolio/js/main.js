$(function(){
	let h, winHalf;
	let n=0;
	let targety=0;


	let body=document.body;
	let header=document.getElementById("header");
	let [logo, tab, gnb, total]=header.children;
	let gnbList=gnb.firstElementChild.children;
	let totalList=total.firstElementChild.firstElementChild.children;
	console.log(totalList);
	let sectionList=document.getElementsByTagName("section");
	let footer=document.getElementById("footer");
	
	let currentNum=0;
	let totalNum;
	let progressTween;

	let slider=document.querySelector(".main_slider");
	let [swiper, swiperControl, swiperPageControl]=slider.children;
	let [swiperWrapper, keyText, shadow]=swiper.children;
	let swiperList=swiperWrapper.children;

	let [title, subject, link]=keyText.children;
	let [current, progressbar, length]=swiperControl.children;
	let [prevBtn, nextBtn]=swiperPageControl.children;

	function init(){ 
		h=window.innerHeight;
		winHalf=h*0.75;
		gnbList[n].classList.add("active");
	}

	init();

	let scrollInteraction=t =>{
		if(t < sectionList[1].offsetTop-winHalf){
			n=0;
		}
		else if(t < sectionList[2].offsetTop-winHalf){
			n=1;
		}
		else if(t < footer.offsetTop-winHalf){
			n=2;
		}
		else{
			n=3;
		}

		for(let i=0; i<gnbList.length; i++){
			if(i === n){
				gnbList[i].classList.add("active");
			}
			else{
				gnbList[i].classList.remove("active");
			}
		}
	}

	for(let i=0; i<gnbList.length; i++){
		gnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			n=i;

			if(i !== 3){
				targety=sectionList[n].offsetTop;
			}
			else{
				targety=footer.offsetTop;
			}

			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});
	}

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
			scrollInteraction(offset.y); }
		}
	});

	trigger.add("#start, section[id^=page], #footer");

	tab.addEventListener("click" , function(e){
		e.preventDefault();
		
		if(tab.classList.contains("open") === false){
			tab.classList.add("open");
			body.classList.add("fixed");
			gsap.fromTo(total, {display: "block", opacity: 0}, {opacity: 1, duration: 0.3});
		}
		else{
			tab.classList.remove("open");
			body.classList.remove("fixed");
			gsap.to(total, {opacity: 0, duration: 0.3, onComplete: () => {
				total.removeAttribute("style");
			}});
		}
	});

	for(let i=0; i<totalList.length; i++){
		console.log(totalList[i]);

		totalList[i].addEventListener("click", e => {
			e.preventDefault();
			n=i;

			if(n !== 3){
				targety=sectionList[n].offsetTop;
			}
			else{
				targety=footer.offsetTop;
			}

			tab.classList.remove("open");
			body.classList.remove("fixed");

			gsap.to(total, {opacity: 0, duration: 0.3, onComplete: () => {
				total.removeAttribute("style");
				gsap.to(window, {scrollTo: targety, duration: 0.5});
			}});
		});
	}

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

	let winw;

	let mainSwiper=new Swiper(".mainSwiper", {
		allowTouchMove: false,
		loop: true,
		autoplay: {
			delay: 8000,
			disableOnInteraction: false
		},
		on: {
			init: function(){
				currentNum=this.realIndex;
				totalNum=this.slides.length;
				keyText.classList.remove("active");

				current.innerText="0"+(currentNum+1);
				length.innerText="0"+totalNum;
				progressTween=gsap.to(progressbar.firstElementChild, {width: "100%", duration: 8});

				setTimeout(function(){
					for(let i=0; i<swiperList.length; i++){
						if(swiperList[i].className.indexOf("list"+(currentNum+1)) !== -1){
							swiperList[i].firstElementChild.classList.add("active");
						}
					}

					keyText.classList.add("active");

					if(winw > 720){
						keyText.style.left=offsetData.textInfo[currentNum].left;
					}
					else{
						keyText.style.left="30px";
					}

					shadow.style.left=offsetData.shadowInfo[currentNum].left;
					shadow.style.width=offsetData.shadowInfo[currentNum].width;

					title.innerHTML=titleData[currentNum].title;
					subject.innerHTML=titleData[currentNum].subject;
					link.setAttribute("href", titleData[currentNum].link);
				}, 1200);
			},
			slideChange: function(){
				currentNum=this.realIndex;
				totalNum=this.slides.length;

				for(let i=0; i<swiperList.length; i++){
					swiperList[i].firstElementChild.classList.remove("active");
				}

				keyText.classList.remove("active");
				current.innerText="0"+(currentNum+1);

				progressTween.pause();
				progressTween.seek(0);
				progressTween.play();
				progressbar.firstElementChild.removeAttribute("style");

				$(".main_slider .progressbar span").stop().removeAttr("style");

				setTimeout(function(){
					for(let i=0; i<swiperList.length; i++){
						if(swiperList[i].className.indexOf("list"+(currentNum+1)) !== -1){
							swiperList[i].firstElementChild.classList.add("active");
						}
					}

					keyText.classList.add("active");

					if(winw > 720){
						keyText.style.left=offsetData.textInfo[currentNum].left;
					}
					else{
						keyText.style.left="30px";
					}

					shadow.style.left=offsetData.shadowInfo[currentNum].left;
					shadow.style.width=offsetData.shadowInfo[currentNum].width;

					title.innerHTML=titleData[currentNum].title;
					subject.innerHTML=titleData[currentNum].subject;
					link.setAttribute("href", titleData[currentNum].link);
				}, 600);
			}
		}
	});

	let resizeHandler=() => {
		winw=window.innerWidth;

		if(winw > 720){
			keyText.style.left=offsetData.textInfo[currentNum].left;
		}
		else{
			keyText.style.left="30px";
		}
	};

	resizeHandler();

	window.addEventListener("resize", resizeHandler);

	$(".main_slider .page_control .bt_prev").click(function(e){
		e.preventDefault();
		mainSwiper.slidePrev();
	});
	$(".main_slider .page_control .bt_next").click(function(e){
		e.preventDefault();
		mainSwiper.slideNext();
	});
});