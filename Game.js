window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame	||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

this.Game = function (canvasId) {
    
	/* settings */
	fps = 30;

	/* runtime this.ables (no touchings) */

	this.last = new Date();
	this.ele = $("#"+canvasId);
	this.digs = 0;

	/* stats */

	digCount = 0;

	this.logBook = [];

    this.addLogBookRule = function(text) {
        this.logBook.push(text);
    };


    this.drawLogBook = function() {
    	$("#logBook").html("");
    	for(var i=this.logBook.length - 1; i> this.logBook.length - 10; i--){
    		$("#logBook").append("<div class='logBookMsg'>" + this.logBook[i] + "</div>");
    	}
    };

	this.init = function() {

      this.initButtons();
      this.initInventory();

	};

	this.draw = function() {
		this.drawButtons();
		this.drawLogBook();
	    this.drawInventory();
	    this.furnace.draw();
	    this.houseFactory.draw();
	    this.sieve.draw();
		this.wallet.draw();

	};

	this.buttons = [];

	this.updateButtons = function(delta) {
		for(button in this.buttons) {
			this.buttons[button].update(delta);
		}
	};

	this.drawButtons = function() {
		for(button in this.buttons) {
			this.buttons[button].draw();
		}
	};

	this.initButtons = function() {

	};

	this.update = function () {
		this.now = new Date();
		this.delta = this.now - this.last;
		this.last = this.now;
		this.updateButtons(this.delta);
		this.furnace.update(this.delta);
		this.sieve.update(this.delta);
		this.houseFactory.update();
		this.shovel.update();
		this.updateInventory();
		this.draw();
    };

	this.inventory = [];

	this.updateInventory = function () {
		for(i in this.inventory){
			this.inventory[i].update();
		}
	}

	this.getInventoryItemByAlias = function(alias) {
		for(i in this.inventory) {
			var item = this.inventory[i];
			console.log(alias)
			console.log(item.alias)
			if (item.alias == alias) {
				return item
			}
		}
		return undefined;
	}

	this.initInventory = function() {
		item = new InventoryItem(this, "Dirt", "dirt", 0, 1);
		this.inventory.push(item);
		item = new InventoryItem(this, "Clay", "clay", 0, 10);
		this.inventory.push(item);
		item = new InventoryItem(this, "Rock", "rock", 0, 30);
		this.inventory.push(item);
		item = new InventoryItem(this, "Copper", "copper", 0, 30);
		this.inventory.push(item);
		item = new InventoryItem(this, "Tin", "tin", 0, 30);
		this.inventory.push(item);
		item = new InventoryItem(this, "Bronze", "bronze", 0, 30);
		this.inventory.push(item);
		item = new InventoryItem(this, "Coal", "coal", 0, 100);
		this.inventory.push(item);
		item = new InventoryItem(this, "Brick", "brick", 0, 400);
		this.inventory.push(item);
		item = new InventoryItem(this, "Iron ore", "iron-ore", 0, 1000);
		this.inventory.push(item);
		item = new InventoryItem(this, "Iron", "iron", 0, 2000);
		this.inventory.push(item);
		item = new InventoryItem(this, "House", "house", 0, 1900);
		this.inventory.push(item);
		item = new InventoryItem(this, "Sand", "sand", 0, 10000);
		this.inventory.push(item);
		item = new InventoryItem(this, "Steel", "steel", 0, 10000);
		this.inventory.push(item);
		item = new InventoryItem(this, "Glass", "glass", 0, 10000);
		this.inventory.push(item);
	}

	this.highlightShopTab = function() {

		if($("#menu-game-2").hasClass("active") != true){
			$("#menu-game-2").addClass("badge");
		}
	}

	this.drawInventory = function() {
		for(i in this.inventory) {
			this.inventory[i].draw();
		}

	}


	  this.init();
	this.furnace = new Furnace(this);
	this.shovel = new Shovel(this);
	this.houseFactory = new HouseFactory(this);
	this.sieve = new Sieve(this);
	this.wallet = new Wallet(this);
	// function () {

	// }





    // requestAnimFrame(update);
}
