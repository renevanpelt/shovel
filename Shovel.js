var Shovel = function (game) {
	
	this.game = game;
	// this.currentAction = undefined;
	// this.clicked = false;
	this.clicked = false;
	this.button = undefined;
	// this.actions = [];
	// this.selectedAction = undefined;
	// this.select_html = "";
	// this.activateClicked = false;

	this.level = 0

	this.levelObject = function() {
		return this.levels[this.level];
	}

	this.levels = [
		{cooldown: 2000, name: "Wood Pickaxe"},
		{cooldown: 1750, name: "Bronze Pickaxe", costs: [{alias: "bronze", amount: 1}] },
		{cooldown: 1500, name: "Iron Pickaxe", costs: [{alias: "iron", amount: 1}] },
		{cooldown: 1000, name: "Steel Pickaxe", costs: [{alias: "steel", amount: 1}] },
	];

	this.nextLevel = function() {
		return this.levels[this.level+1];
	}

	this.init = function() {
		b = new Button(this.game,"Dig (Wooden pickaxe)", "dig",50,"Digged");
		this.button = b;
		b.action = function () {
			var message = "";
			g = this.game
			g.digs += 1; 
			message += "You dug in the ground and found: "

			if (g.digs >= 0 && g.digs < 100) {
				dirt_perc = 100;
				clay_perc = 20;
				rock_perc = 99;
				coal_perc = 70;
				iron_perc = 10;
				copper_perc = 10;
				sand_perc = 10;
				tin_perc = 10;
			} else if(g.digs >= 100 && g.digs < 200) {
				dirt_perc = 100;
				clay_perc = 20;
				sand_perc = 10;
				rock_perc = 20;
				copper_perc = 10;
				tin_perc = 10;
				coal_perc = 0;
				iron_perc = 0;
			} else if(g.digs >= 200) {
				dirt_perc = 100;
				clay_perc = 20;
				copper_perc = 10;
				tin_perc = 10;
				sand_perc = 10;
				rock_perc = 20;
				coal_perc = 40;
				iron_perc = 40;
			}


			if(dice(dirt_perc)){
				message += "dirt";
				var item = g.getInventoryItemByAlias("dirt");
				item.addQuantity(1);
			}
			if(dice(clay_perc)){
				message += ", clay";
				var item = g.getInventoryItemByAlias("clay");
				item.addQuantity(1);
			}
			if(dice(rock_perc)){
				message += ", rock";
				var item = g.getInventoryItemByAlias("rock");
				item.addQuantity(1);
			}
			if(dice(coal_perc)){
				message += ", coal";
				var item = g.getInventoryItemByAlias("coal");
				item.addQuantity(1);
			}
			if(dice(iron_perc)){
				message += ", iron ore";
				var item = g.getInventoryItemByAlias("iron-ore");
				item.addQuantity(1);
			}
			if(dice(iron_perc)){
				message += ", copper ore";
				var item = g.getInventoryItemByAlias("copper");
				item.addQuantity(1);
			}
			if(dice(iron_perc)){
				message += ", tin ore";
				var item = g.getInventoryItemByAlias("tin");
				item.addQuantity(1);
			}
			if(dice(sand_perc)){
				message += ", sand";
				var item = g.getInventoryItemByAlias("sand");
				item.addQuantity(1);
			}
			message += "."
			this.message = message;

		}
		this.game.buttons.push(b);

	}

	this.update = function(delta) {
		if(this.clicked) {
			this.buy();
		}
		this.clicked = false;
	}

	this.draw =  function() {
	    $("#upgrade_shovel").find("strong").find("span").html(this.nextLevel().name);
    	var f = this;
		$("#upgrade_shovel").click(function() {
			f.clicked = true;
		});
	    for(c in this.nextLevel().costs){
	    	cost = this.nextLevel().costs[c];
	    	$("#shovel_cost").html("<div class='btn' id='upgrade_shovel_btn'>"+ cost.amount +" "+ cost.alias +"</div>");
	    
	    	var f = this;
			$("#upgrade_shovel_btn").click(function() {
				f.clicked = true;
			});

	    }

		iron = this.game.getInventoryItemByAlias("iron");


	};

	this.buy = function() {
		// iron = game.getInventoryItemByAlias("iron");
		// dirt = game.getInventoryItemByAlias("dirt");
		// sand = game.getInventoryItemByAlias("sand");
		
		costs = this.nextLevel().costs

		var hasResources = true;

		for(c in costs) {
			cost = costs[c];
			item = game.getInventoryItemByAlias(cost.alias);

			if(item.quantity < cost.amount) {
				hasResources = false
			}
		}

		if(hasResources == true){
			this.level += 1;
			this.button.setName( "Dig (" + this.levelObject().name + ")")
			this.button.setCooldown( this.levelObject().cooldown )
			for(c in costs) {
				cost = costs[c];
				item = game.getInventoryItemByAlias(cost.alias);
				item.addQuantity(-costs.amount);
			}

		}
		this.draw();

		
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


	$("#game-2").find("#items").append("<div class='build' id='upgrade_shovel' ><strong>Upgrade Shovel to: <span></span></strong><br/><div id='shovel_cost'></div></div>");
	// $("#build_shovel").hide();


	this.init();
    this.draw();
}