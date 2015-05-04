$(function() {
	$('#upload-file').on('click', function(e) {
		e.preventDefault();
		var file = document.getElementById('file').files[0];
		var fd = new FormData();
		fd.append('name', file);
		
		// console.dir(fd.toString());
		// console.dir(fd);
		// $.ajax({
		// 	url: '/file',
		// 	data: fd,
		// 	type: 'POST',
		// 	contentType: false
		// });

		var xhrForm = new XMLHttpRequest();
		xhrForm.open("POST", "/file");
		xhrForm.send(fd);
	});
});