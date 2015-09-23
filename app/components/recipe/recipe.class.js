var Recipe = (function() {
	function Recipe (name, food, instructions, id) {
		this.name = name;
		this.food = food;
		this.instructions = instructions;
		if(id) {
	        this.id = id;
		}
	}

	return Recipe;
})();