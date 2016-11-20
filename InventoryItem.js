var InventoryItem = function (game, name, alias, qty, sellPrice) {
	
	this.game = game;
	this.quantity =  qty;
	this.sellPrice =  sellPrice;
	
	this.name =  name;
	this.alias =  alias;
	this.sell_clicked = false;

	this.imageUrl = function() {
		return "img/" + this.alias + ".png"
	}

	this.update = function () {
		console.log(this.game);
		if(this.sell_clicked){
			this.game.wallet.addQuanity(this.quantity * this.sellPrice);
			this.quantity = 0;
		}
		this.sell_clicked = false;
	}
	
	this.addQuantity = function(amount) {
		if(this.quantity + amount < 0 ) {
			console.log("CANNOT BE BELOW ZERO");
		} else {
			this.quantity += amount;
		}

		$("#item_"+this.alias).show();
		$("option#require-"+this.alias).show();
	}

	this.draw =  function() {

		$("#item_"+this.alias).find("strong").html(this.name);
		$("#item_"+this.alias).find("span").html(this.quantity);
		$("#sell_amount_"+this.alias).html(this.quantity*this.sellPrice);

	};

	// console.log(23);
	$("#game").find("#inventory").append(" \
		<div hidden class='inventory_item' id='item_"+ alias +"' > <img style='max-width:45px' src='"+ this.imageUrl() +"'></img><div class='sell' id='sell_"+this.alias+"'>Sell all: $ <span id='sell_amount_"+this.alias+"'>"+this.sellPrice+"</span></div><br/>\
		<strong>:&nbsp;</strong><span></span></div> \
		");


	var f = this;
	$("#sell_"+this.alias).click(function() {
		f.sell_clicked = true;
	});



}