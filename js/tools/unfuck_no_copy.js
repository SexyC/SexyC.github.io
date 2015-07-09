(function() {
	if(old_methods) {
		for(m in old_methods) {
			document[m] = old_methods[m];
		}
	}
})();
