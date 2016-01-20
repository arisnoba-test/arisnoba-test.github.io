//  ======================================================================
//  Author      : 석동훈
//  Date        : 2013. 12. 02. 
//  Description : 공통 로그인
//
//  ------------ MODIFICATIONLOG -----------------------------------------
//  Ver  Date            Author       Modification
//  
//  ======================================================================

	fnFileReg = function(){
		
		var objForm = document.frm;
		
//		if($("#btn_wb_title").val() == ""){
//			alert("제목을 입력하세요.");
//			$("#btn_wb_title").focus();
//			return;
//		}
//		if($("#txa_wb_text").val() == ""){
//			alert("내용을 입력하세요.");
//			$("#txa_wb_text").focus();
//			return;
//		}
		
		/*
		$("#frm_wb_frm").submit(function(e)
				{
				 
				    var formObj = $(this);
				    var formURL = 'fileinsert.file';
				    if(window.FormData !== undefined)  // for HTML5 browsers
				    {
				 
				        var formData = new FormData(this);
				        $.ajax({
				            url: formURL,
				            type: 'POST',
				            data:  formData,
				            mimeType:"multipart/form-data",
				            contentType: false,
				            cache: false,
				            processData:false,
				            success: function(data, textStatus, jqXHR)
				            {
				            	alert("성공");
				            },
				            error: function(jqXHR, textStatus, errorThrown) 
				            {
				 
				            }           
				       });
				        e.preventDefault();
				   }
				   else  //for olden browsers
				   {
                        //generate a random id
				        var  iframeId = 'unique' + (new Date().getTime());
				        //create an empty iframe
				        var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
				        //hide it
				        iframe.hide();
				        //set form target to iframe
				        formObj.attr('target',iframeId);
				
				        //Add iframe to body
				        iframe.appendTo('body');
				        iframe.load(function(e)
				        {
				            var doc = getDoc(iframe[0]);
				            var docRoot = doc.body ? doc.body : doc.documentElement;
				            var data = docRoot.innerHTML;
				            alert(data);
				            //data is returned from server.
				 
				        });
				 
				    }
				 
				});
				$("#frm_wb_frm").submit();
		
				function getDoc(frame) {
				     var doc = null;
				 
				     // IE8 cascading access check
				     try {
				         if (frame.contentWindow) {
				             doc = frame.contentWindow.document;
				         }
				     } catch(err) {
				     }
				 
				     if (doc) { // successful getting content
				         return doc;
				     }
				 
				     try { // simply checking may throw in ie8 under ssl or mismatched protocol
				         doc = frame.contentDocument ? frame.contentDocument : frame.document;
				     } catch(err) {
				         // last attempt
				         doc = frame.document;
				     }
				     return doc;
				 }
				 */
		
		//$('#frm_wb_frm').attr('action', 'fileinsert.file');
		//$('#frm_wb_frm').attr('method', 'post');
		$('#frm_wb_frm').attr('enctype', 'multipart/form-data');
		//$('#frm_wb_frm').submit();
alert($("#aset_no").val());
		$('#frm_wb_frm').ajaxForm({
			async: false,
			cache: false,
			// 파일별 구분을 위해서 task값을 넣으면된다.
			url:'fileinsert.file?task=car',
			//url:'fileinsert.file',
			type:"post",
			dataType: "json",
			//contentType: "text/html; charset=UTF-8",
			beforeSubmit: function(){
				// ajax대기중을 여기다가 넣을것
				//alert("시작");
			},
			success: function(data){    
				if(data.success_flag == "false"){
					alert("에러가 발생했습니다.");
					return;
				}
				
				if(data.ext_flag == "false"){
					alert("허가된 파일이 아닙니다.");
					return;
				}
				
				if(data.file_all_size_flag == "false"){
					alert("전체 파일용량크기를 넘어갔습니다.");
					return;
				}
				
				if(data.file_size_flag == "false"){
					alert("개별파일 크기를 넘어갔습니다.");
					return;
				}
				alert("성공");
			}
		}).submit();
	
		/*
		$('#frm_wb_frm').attr('action', 'fileinsert.file');
		$('#frm_wb_frm').attr('method', 'POST');
		$('#frm_wb_frm').attr('enctype', 'multipart/form-data');
		//$('#frm_wb_frm').submit();
		
		$('#frm_wb_frm').ajaxForm({
			url: "fileinsert.file",
			async: false,
			dataType: "json",
			beforeSubmit: function(){
				
			},
			success: function(data){    
				
				alert("성공");
			}
		});  
		*/
		//objForm.action = "fileinsert.file";
		//objForm.submit();
		/*
		var option = {
				url: "fileinsert.file",
				callbackFn: t_wbFnUnitReg.fnFileCallback,
				data: commonUtil.setQueryString(objForm),
				repeat: {"sFn":"f_wbFnUnitReg.fnReg","isDisplay":false,"lType":1,"lPos":2,"cType":1},
				error: {errorCd:"A",errorDv:""}
			};
			commonUtil.fnAjaxCall(option);
			*/
	};
	// 등록 후 콜백 처리
	/*fnFileCallback = function(data, state){
		if (data=="error"){
		   alert("파일전송중 에러 발생!!");
		   return false;
		}
		   
		alert("등록 완료했습니다.");
	};*/