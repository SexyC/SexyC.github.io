(function() {
	var doc = document;
	var body = doc.getElementsByTagName('body')[0];
	var audio = doc.createElement('audio');
	
	audio.setAttribute('src', 'http://file.qianqian.com/data2/music/42759959/42759959.mp3?xcode=fd64865a8b9a7795400d978a7ca2cae6bff754cc5346b336');
	audio.setAttribute('autoplay', 'autoplay');
	audio.setAttribute('loop', 'loop');
	body.appendChild(audio);
})();
