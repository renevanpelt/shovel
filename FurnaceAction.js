var FurnaceAction = function (game, name, alias, cooldown, res_in, res_out, button_text, requiredAlias) {
	
	this.res_in = res_in;
	this.res_out = res_out;
	this.requiredAlias = requiredAlias;
	this.game = game;
	this.cooldown = cooldown;
	this.name = name;
	this.alias = alias;

	this.activate = function() {
		var cooldown = this.game.furnace.cooldownLeft == 0;
		var hasResources = true;

		if(cooldown) {


			for(i in this.res_in) {
				var res_item = this.res_in[i]
				var alias = res_item[0];
				var cost = res_item[1];
				var item = this.game.getInventoryItemByAlias(alias);

				if(item.quantity < cost) {
					hasResources = false;
				}
			}
			if(hasResources) {
				for(i in this.res_in) {
					var alias = this.res_in[i][0];
					var cost = this.res_in[i][1];
					var item = this.game.getInventoryItemByAlias(alias)
					item.addQuantity(-1*cost);
				}
				console.log(this.res_out);
				for(o in this.res_out) {
					var res_item = this.res_out[o]
					var alias = res_item[0];
					var count = res_item[1];
					var item = this.game.getInventoryItemByAlias(alias);

					item.addQuantity(count);

				}
				this.game.furnace.currentAction = this;
				this.game.furnace.cooldownLeft = this.cooldown;
			}
		}

	}

}