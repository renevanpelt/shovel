var HouseFactory = function (game) {
	
	this.game = game;
	this.clicked = false;

	this.maxPopulation = 0;
	this.level = 0;
	this.population = 0;

	this.levelObject = function() {
		return this.levels[this.level];
	}

	this.nextLevel = function() {
		return this.levels[this.level+1];
	}

	this.levels = [
		{cost: [{alias: "brick", amount: 1}], population: 5},
		{cost: [{alias: "brick", amount: 2}], population: 5},
		{cost: [{alias: "brick", amount: 3}], population: 5},
		{cost: [{alias: "brick", amount: 5}], population: 5},
		{cost: [{alias: "brick", amount: 8}], population: 5},
		{cost: [{alias: "brick", amount: 13}], population: 5},
		{cost: [{alias: "brick", amount: 21}], population: 5},
	]

	this.init = function() {
	
	}

	this.update = function(delta) {
		if(this.clicked && this.level < this.levels.length) {
			this.buy();
		}
		this.clicked = false;
	}

	this.draw =  function() {
		bricks = this.game.getInventoryItemByAlias("brick");
		if( bricks.quantity >= HOUSE_COST ) {
		  $("#build_house").show();
		}

		$("#house_cost").html(this.nextLevel().cost[0].amount); // TODO: Make possible for more costs
		$("#population_occupation").html(this.population + "/" + this.maxPopulation); 
	 
	};

	this.buy = function() {
		bricks = game.getInventoryItemByAlias("brick");
		// houses = game.getInventoryItemByAlias("house");
		if(bricks.quantity >= HOUSE_COST) {
  		  $("#menu-game-3").show();
	      bricks.addQuantity(-HOUSE_COST);
		  this.maxPopulation += this.nextLevel().population;
		  this.level += 1;
		  this.draw();
		} else {
			console.log("Not enough bricks.")
		}
		
	}

	this.cooldownRatio = function() {

	}

	this.getFurnaceActionByAlias = function(alias) {
		for(a in this.actions) {
			var action = this.actions[a];
			if (action.alias == alias) {
				return action
			}
		}
		return undefined;
	}


	$("#game-3").append("<div class='' id='population_stats'><p><strong>Population: </strong><span id='population_occupation'></span></p></div>");
	$("#game-2").find("#items").append("<div class='build' id='build_house' ></div>");
    $("#build_house").html("<strong>Build House</strong><br/><div class='btn' id='buy_house_btn'><span id='house_cost'></span> Bricks</div>");
	$("#build_house").hide();
	
	this.init();
	var f = this;
	$("#buy_house_btn").click(function() {
		f.clicked = true;
	});

}