var old_methods = {};
(function() {
	var fuck_methods = ['oncontextmenu', 'onselectstart', 'onselect', 'oncopy'];
	fuck_methods.forEach(function(method) {

		old_methods[method] = document[method];
		document[method] = null;
	});
	
})();
