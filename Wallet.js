var Wallet = function (game) {
	
	this.game = game;
	// this.currentAction = undefined;
	// this.clicked = false;
	this.clicked = false;
	this.button = undefined;
	// this.actions = [];
	// this.selectedAction = undefined;
	// this.select_html = "";
	// this.activateClicked = false;

	this.amount = 0;



	this.init = function() {
		this.amount = 0;
	}

	this.update = function(delta) {

	}

	this.addQuanity = function(amount) {
		if(this.amount + amount >= 0) {
			this.amount += amount;
		}
	}

	this.draw =  function() {
		$("#amount_money").html(this.amount);
	};





	this.init();
    this.draw();
}