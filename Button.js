var Button = function (game, name, alias, cooldown, message) {
	this.game = game;
	this.name =  name;
	this.alias =  alias;
	this.message =  message;
	this.cooldown =  cooldown;
	this.cooldownLeft = this.cooldown;
	this.loader_html_id = "loader_" + alias
	this.clicked = false;


	this.setCooldown = function(c) {
		this.cooldown = c;
	}

	this.setAlias = function(a) {
		this.alias = a;
	}

	this.setName = function(n) {
		this.name = n;
	}

	this.setMessage = function(msg) {
		this.message = msg;
	}

	this.update =  function(delta) {
		if (this.cooldownLeft <= 0 ) {
			this.cooldownLeft = 0;
		} else {
			this.cooldownLeft -= delta;
		}
		if(this.clicked && this.cooldownLeft == 0) {
			this.action();
			this.cooldownLeft = this.cooldown;
			this.game.addLogBookRule(this.message);
		}

		this.clicked = false;
	};

	this.action = function() {

	}


	this.draw =  function() {
		$("#"+this.loader_html_id).css("width", 100 -100*this.cooldownRatio() + "%");
		$("#"+this.alias).find("strong").html(this.name);
	};




	this.cooldownRatio = function () {

		return (this.cooldownLeft * 1.0) / (this.cooldown * 1.0)
	}


	$("#game").find("#buttons").prepend(" \
		<div class='button' id='"+ this.alias +"' > \
			<strong class='name'>" + this.name + "</strong> \
			<div class='loader' id='" + this.loader_html_id + "'></div> \
		</div> \
		");

	this.press = function(){
		this.cooldownLeft = this.cooldown;
	}
	
	var f = this;
	$(".button#" + alias).click(function(){
		f.clicked = true;
		f.game
	});

}