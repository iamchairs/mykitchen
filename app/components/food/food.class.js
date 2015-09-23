var Food = (function() {
	function Food (name, quantity, unit, id) {
		this.name = name;
		this.quantity = quantity;
		this.unit = unit;
		if(id) {
	        this.id = id;
		}
	}

	return Food;
})();