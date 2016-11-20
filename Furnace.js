var Furnace = function (game) {
	
	this.game = game;
	this.currentAction = undefined;
	this.bought = false;
	this.clicked = false;
	this.cooldownLeft = 0;
	this.actions = [];
	this.selectedAction = undefined;
	this.select_html = "";
	this.activateClicked = false;
	this.discovered = false;

	this.init = function() {
		a = new FurnaceAction(this.game, "Brick", "brick", 1000, [["clay", 1],["coal", 1]], [["brick", 1]],"", "coal" );
		this.actions.push(a);
		a = new FurnaceAction(this.game, "Iron", "iron", 1000, [["iron-ore", 1],["coal", 1]], [["iron", 1]],"", "iron-ore" );
		this.actions.push(a);
		a = new FurnaceAction(this.game, "Bronze", "bronze", 1000, [["copper", 5],["tin", 1]], [["bronze", 1]],"", "copper" );
		this.actions.push(a);
		a = new FurnaceAction(this.game, "Steel", "steel", 1000, [["iron", 1],["coal", 3]], [["steel", 1]],"", "iron" );
		this.actions.push(a);
		a = new FurnaceAction(this.game, "Glass", "glass", 1000, [["sand", 10]],[["glass", 1]],"", "sand" );
		this.actions.push(a);


		this.select_html = "<select id='furnace-select'>";
		this.select_html += "<option>Choose action</option>";
		for(a in this.actions) {
			this.select_html += "<option hidden id='require-"+ this.actions[a].requiredAlias + "' value='" + this.actions[a].alias +"'>Create " + this.actions[a].name + " (";
			for( i in this.actions[a].res_in ) {

				this.select_html += this.actions[a].res_in[i][1] + " " + this.actions[a].res_in[i][0];
				if(i != this.actions[a].res_in.length -1){
					this.select_html += " + ";
				}
			}

			this.select_html += ")</option>"

		}
		this.select_html += "</select><div class='button'> <div id='activate-furnace' >Activate</div></div><div class='loader' id='furnace_loader'></div>";
	
	}

	this.update = function(delta) {
		if (this.cooldownLeft <= 0 ) {
			this.cooldownLeft = 0;
		} else {
			this.cooldownLeft -= delta;
		}
	}
	this.draw =  function() {


		rocks = game.getInventoryItemByAlias("rock");
		this.selectedAction = this.getFurnaceActionByAlias($('#furnace-select').val());
		
		if( !this.bought && rocks.quantity >= FURNACE_COST ) {
			$("#build_furnace").show();
			if(this.discovered != true) {
				this.game.highlightShopTab();
				this.discovered = true;
			}
		}

		if(this.clicked) {
			this.buy();
		}
		this.clicked = false;

		if( !(this.selectedAction == undefined) && this.activateClicked && this.cooldownLeft == 0) {
			this.selectedAction.activate();
		}

		this.activateClicked = false;

		$("#furnace_loader").css("width", 100 -100*this.cooldownRatio() + "%");
	};

	this.buy = function() {
		rocks = game.getInventoryItemByAlias("rock");
		if(rocks.quantity >= FURNACE_COST) {
			rocks.addQuantity(-FURNACE_COST);

			this.bought = true;
			$("#furnace-button").show();
		

			f = this;
			$("#activate-furnace").click(function() {
				f.activateClicked = true;
			});
			
			$("#build_furnace").hide()
		} else {
			console.log("Not enough rocks.")
		}
		
	}

	this.cooldownRatio = function() {
		if (this.currentAction == undefined) {
			return 0;
		} else {
			return (this.cooldownLeft * 1.0) / (this.currentAction.cooldown * 1.0)
			
		}
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


	$("#game-2").find("#items").append("<div class='build' id='build_furnace' ></div>");
	$("#build_furnace").html("<strong>Build Furnace</strong><br/><div href='#' class='btn buy_btn'>"+ FURNACE_COST+" Rock</div>");
	var f = this;
	$(".buy_btn").click(function() {
		f.clicked = true;
	});
	$("#build_furnace").hide();
	this.init();
	$("#buttons").append("<div class='button' id='furnace-button'></div>")

	$("#furnace-button").html("<strong>Furnace</strong><br/> \
			" + this.select_html);
	$("#furnace-button").hide()

}