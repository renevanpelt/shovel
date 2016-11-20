var Sieve = function (game) {
	
	this.game = game;
	// this.currentAction = undefined;
	// this.clicked = false;
	this.clicked = false;
	// this.cooldownLeft = 0;
	// this.actions = [];
	// this.selectedAction = undefined;
	// this.select_html = "";
	// this.activateClicked = false;


	this.init = function() {
	
	}

	this.update = function(delta) {
		if(this.clicked) {
			this.buy();

		}
		this.clicked = false;
	}

	this.draw =  function() {
		iron = this.game.getInventoryItemByAlias("iron");

		if( iron.quantity >= SIEVE_COST ) {

		  $("#build_sieve").show();
		}
	};

	this.buy = function() {
		var iron = game.getInventoryItemByAlias("iron");
		var dirt = game.getInventoryItemByAlias("dirt");
		var sand = game.getInventoryItemByAlias("sand");
		if(iron.quantity >= SIEVE_COST) {
	      iron.addQuantity(-SIEVE_COST);
	      // $("#sieve-button").show();
		  var b = new Button(this.game,"Sieve dirt ("+ SIEVE_DIRT_IN+")", "sieve",200,"Sivved");
		  b.action = function () {
		  	if(dirt.quantity >= SIEVE_DIRT_IN) {
	      	  dirt.addQuantity(-SIEVE_DIRT_IN);
	      	  sand.addQuantity(SIEVE_SAND_OUT);
		  	}
		  }
          this.game.buttons.push(b);

		} else {
			console.log("Not enough iron.")
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


	$("#game-2").find("#items").append("<div class='build' id='build_sieve' ></div>");
    $("#build_sieve").html("<strong>Build Sieve</strong><br/><div class='btn' id='buy_sieve_btn'>"+ SIEVE_COST +" Iron</div>");
	$("#build_sieve").hide();


	this.init();
	var f = this;
	$("#buy_sieve_btn").click(function() {
		f.clicked = true;
	});

}