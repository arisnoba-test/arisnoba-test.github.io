/*===================================================================*/
// 설명	: 공통으로 사용하는 클래스
/*===================================================================*/
commonUtil = {};

//===================================================================
//설명	: Ajax 공통 통신 처리 함수
//		: 세션처리없이 JsonArray일 경우
//인자	: var option = {
//				type: POST,GET 결정(String형 default:POST)
//				url: 액션명(String형),
//				callbackFn : 콜백함수명(함수),
//				data: 파라메타값(String형, 배열형)
//				async: true,false(boolean형 default:false)
//				cache: true,false(boolean형 default:false)
//				dataType: json,xml,html(String형 default:json)
//				error: 에러처리 코드 및 호출 Div
//				repeat: 로그인처리시 호출 함수 및 코드값(배열)
//	error 에러처리
//	-. errorCd		: 구분(A,B)(String형)
//	-. errorDv		: append 될 Div 명(String형)
//	arrRepeat 로그인팝업창 호출
//	-. sFn			: 로그인처리후 실행할함수
//	-. isDisplay	: 로그인 후 로그인 창 유지여부(true:유지, false:사라짐)
//	-. lType		: 로그인 창 종류(1:default[팝업,center])
//	-. lPos			: 로그인위치구분(1:SOI브라우저, 2:블로그, 3:가맹점, 4.광장, 5:회원가입/고객센터)
//
//기능	: Ajax 공통 통신 처리 함수로 에러 및 결과 콜백 함수등을 처리한다.
//
//[사용예] 단, 사용시 필요한 option만을 정리해서 사용하면 한다.
//var sData = "title="+$("#input_plf_reg_title").val()+"&text="+$("#textarea_plf_reg_text").val(); // String으로 data를 넘길 경우 사용
//	var title = $("#input_plf_reg_title").val();
//	var text = $("#textarea_plf_reg_text").val();
//	var arrData = {"title":title,"text":text}; // 배열로 data를 넘길 경우 사용
//	var arrRepeat = {"sFn":"plfFnBoardList","isDisplay":false,"lType":1,"lPos":2}; // 세션이 있을 경우
//	
//	var option = {
//			type : "POST",
//			url : "ar.plf.insertBoard.podo",
//			callbackFn : plfFnInitBoardList,
//			data : arrData,
//			async: false,
//			cache: false,
//			dataType:"json",
//			error: {errorCd:"B",errorDv:"dv_plf_board"},
//			repeat: arrRepeat
//		};
//	commonUtil.fnAjaxCall(option);
commonUtil.fnAjaxCall = function(option) {
	
	if(option.async == undefined || option.async == null) option.async = true;
	if(option.cache == undefined || option.cache == null) option.cache = false;
	$.ajax({
		type: option.type || "POST",
		url: option.url,
		data : option.data || "",
		async: option.async,
		cache: option.cache,
		dataType: option.dataType || "json",
		beforeSend:function(XMLHttpRequest) {
				$.blockUI(
					{message: '<h4>처리중 입니다.</h4>'}
				);
			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// 공통 에러 출력
			commonError.fnAjaxErrorView(option.error.errorCd||"B",option.error.errorDv||"");
		},
		success: function(data){
			if(commonError.fnErrorSuccessFlagCheck(data)){
				// 로그인 실행
				if(!commonError.fnLoginSuccessFlagCheck(data)){
					// 로그인 레이어 팝업
					//comLogin.fnLoginLayerPopup(option.repeat.sFn,option.repeat.isDisplay,option.repeat.lType,option.repeat.lPos,option.repeat.cType); 
					//alert("로그인창으로 이동");
					location.href = "main.do";
				}
				else {
					option.callbackFn(data);
				}
				
				$.unblockUI();
				//option.callbackFn(data);
			}else{
				// 공통 에러 출력 (레이어 디자인이 나오면 구성
				// 에러코드는 레이어 위치가 있는 일단적인 에러코드이고 내부코드는 특정한에러일경우(현재 디비에러를 종류별로 잡음)
				// 에 나타나는 것으로 내부코드는 로그시스템에서 사용한다.
				alert("에러코드:"+data.error_loc_code+" 내부코드:"+data.error_detail_code);
				//commonError.fnBusinessErrorView(option.error.errorCd||"B",option.error.errorDv||"");
			}
		}
	});
};

//===================================================================
//설명	: Form의 Object를  key, value로 담는다. 구분인자 "&"
//인자	: objForm :: [Object]
//기능	: Form의 Object를  key, value로 담는다. 
//등록, 수정, 삭제 시 Ajax 통신을 하며 이때, HTML의 Form Ojbect를 파라미터로 넘길 경우 사용한다.
//===================================================================
commonUtil.setQueryString = function(objForm) {
	queryString = "";
	var numberElements = objForm.elements.length; // check frm.elements.length - 1 로 하는 경우가 있음.
	for(var i = 0; i < numberElements; i++)
	{
		input = objForm.elements[i];

		if(i < numberElements - 1){
			queryString += input.name + "=" + encodeURIComponent(input.value) + "&";
		} else {
			queryString += input.name + "=" + encodeURIComponent(input.value);
		}
	}
	return queryString;
};

commonUtil.fnLoginCall = function() {
	location.href = "main.do";
};
