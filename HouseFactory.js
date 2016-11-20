var HouseFactory = function (game) {
	
	this.game = game;
	// this.currentAction = undefined;
	// this.clicked = false;
	this.clicked = false;
	// this.cooldownLeft = 0;
	// this.actions = [];
	// this.selectedAction = undefined;
	// this.select_html = "";
	// this.activateClicked = false;

	this.maxPopulation = 0;
	this.level = 0;
	this.population = 12;

	this.levelObject = function() {
		return this.levels[this.level];
	}

	this.nextLevel = function() {
		return this.levels[this.level+1];
	}

	this.levels = [
		{cost: [{alias: "brick", amount: 10}], population: 5},
		{cost: [{alias: "brick", amount: 10}], population: 5},
		{cost: [{alias: "brick", amount: 10}], population: 5},
		{cost: [{alias: "brick", amount: 10}], population: 5},
		{cost: [{alias: "brick", amount: 10}], population: 5},
		{cost: [{alias: "brick", amount: 10}], population: 5},
		{cost: [{alias: "brick", amount: 10}], population: 5},
	]

	this.init = function() {
	
	}

	this.update = function(delta) {
		// console.log(this.clicked);
		if(this.clicked) {
			this.buy();
		}
		this.clicked = false;
	}

	this.draw =  function() {
		bricks = this.game.getInventoryItemByAlias("brick");
		if( bricks.quantity >= HOUSE_COST ) {
		  $("#build_house").show();
		}
		console.log(this);
		console.log(this.nextLevel());
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