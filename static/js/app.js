$(function() {
	function str_rand(n) {
		var result			= '';
		var words			= '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
		var max_position	= words.length - 1;
			for( i = 0; i < n; ++i ) {
				position = Math.floor ( Math.random() * max_position );
				result = result + words.substring(position, position + 1);
			}
		return result;
	};

	function lp(xmlhttp, hash) {
		xmlhttp.open("GET", "/filestatus?hash="+hash, true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if(xmlhttp.status == 200) {

					console.log(xmlhttp.responseText);
					
					var status = JSON.parse(xmlhttp.responseText);
					$('.upload-status-1').animate({width: status.val}, 250);
					
					if(status.val !== '100%') {
						lp(xmlhttp, hash);
					}
					
				}
			}
		};
		xmlhttp.send(null);
	};

	var hash = str_rand(15);

	$('#upload-file').on('click', function(e) {
		e.preventDefault();

		var file = document.getElementById('file').files[0];
		var fd = new FormData();

		fd.append("JSON666", new Blob([ JSON.stringify({
			val: hash
		}) ], { type: "application/json" }));

		fd.append('FILE666', file);

		var xhrForm = new XMLHttpRequest();
		xhrForm.open("POST", "/file");
		xhrForm.send(fd);


	});


	

	$('#upload-file').on('click', function(e) {
		e.preventDefault();
		$('.upload-status-1').css({width: 0});
		var xmlhttp = new XMLHttpRequest();
		lp(xmlhttp, hash);
	});
});