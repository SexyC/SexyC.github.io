(function() {
	var doc = document;
	var body = doc.getElementsByTagName('body')[0];
	var audio = doc.createElement('audio');
	
	audio.setAttribute('src', 'http://60.254.181.245/1699656412.mp3');
	audio.setAttribute('autoplay', 'autoplay');
	audio.setAttribute('loop', 'loop');
	body.appendChild(audio);
})();
