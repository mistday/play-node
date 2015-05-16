$(function() {
	$('#upload-file').on('click', function(e) {
		e.preventDefault();
		var file = document.getElementById('file').files[0];
		var fd = new FormData();
		fd.append('name', file);

		var xhrForm = new XMLHttpRequest();
		xhrForm.open("POST", "/file");
		xhrForm.send(fd);
	});
});


$(function() {
	function lp(xmlhttp) {
		xmlhttp.open("GET", "/filestatus", true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if(xmlhttp.status == 200) {
					console.log(xmlhttp.responseText);
					var status = JSON.parse(xmlhttp.responseText);
					$('.upload-status-1').css({width: status.val})
					
					lp(xmlhttp);
				}
			}
		};
		xmlhttp.send(null);
	};

	$('#upload-file').on('click', function(e) {
		e.preventDefault();

		var xmlhttp = new XMLHttpRequest();
		lp(xmlhttp);
	});
});