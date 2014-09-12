$(document).ready(function() {
	var obj = document.getElementById('main_container');
	var l = new Layout(obj);
	for(var i = 0; i < 20; ++i) {
		var widget = document.createElement('div');
		widget.style.backgroundColor = '#3366ff';	
		l.pushWidget(widget);
	}
	l.render();
});
