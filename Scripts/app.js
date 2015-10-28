$(document).ready(function () {
	// 	Todo
	// Pre-load resources
	/*var x = new Image();
	x.src = "/Content/Images/TicTacToeX.png";
	var o = new Image();
	o.src = "/Content/Images/TicTacToeO.png";*/

	$("#register").show();
	$("#findOpponent").hide();
	$("#waitingForOpponent").hide();
	$("#game").hide();
	$("#findAnotherGame").hide();

	var game = $.connection.TicTacToe;

	game.client.waitingForOpponent = function (message) {
		$("#information").html("<strong>Изчакай опонета прави ход</strong>");
		//$('#debug').append('<li>Изчакай опонета прави ход</li>');
	};
	game.client.waitingForMarkerPlacement = function (message) {
		$("#information").html("<strong>Ти си на ход</strong>");
		// $('#debug').append('<li>You\'re up, make your move!</li>');
	};
	game.client.foundOpponent = function (message) {
		$("#findAnotherGame").hide();
		$("#waitingForOpponent").hide();
		$("#gameInformation").html("Играеш под името: " + message);
		//$('#debug').append('<li>You\'re playing against ' + message + '</li>');

		$("#game").html('<div id="information" /><br/>');
		for (var i = 0; i < 9; i++) {

			$("#game").append("<span id=" + i + " class='box' />");
		}

		$("#game").show();
	};
	game.client.noOpponents = function (message) {
		$("#information").html("<strong>Looking for an opponent!</strong>");
		//$('#debug').append('<li>Waiting for opponents to connect...</li>');
	};
	game.client.addMarkerPlacement = function (message) {
		if (message.OpponentName !== $('#gamaName').val()) {
			$("#" + message.MarkerPosition).addClass("mark2");
			$("#" + message.MarkerPosition).addClass("marked");
			$("#information").html("<strong>Ти си</strong>");
		} else {
			$("#" + message.MarkerPosition).addClass("mark1");
			$("#" + message.MarkerPosition).addClass("marked");
			$("#information").html("<strong>Изчакай опонента да направи своя ход</strong>");
		}
		$('#debug').append('<li>Marker was placed by ' + message.OpponentName + ' at position ' + message.MarkerPosition + '</li>');
	};
	game.client.opponentDisconnected = function (message) {
		$("#gameInformation").html("<strong>Ти загуби " + message + " left and you won on walk over</strong>");
		//$('#debug').append('<li>Your opponent left! Congratulations you won!</li>');

		$("#findAnotherGame").show();
		$("#game").hide();
	};
	game.client.registerComplete = function (message) {
		$('#debug').append('<li>Можеш да започнеш</li>');
	};
	game.client.gameOver = function (message) {
		$("#gameInformation").html("You're playing against " + message);
		$("#information").html('<strong>Победител е ' + message + '</strong>');
		//$('#debug').append('<li>Game is over and We have a Winner!! Congratulations ' + message + '</li>');
		$("#findAnotherGame").show();
	}
	game.client.refreshAmountOfPlayers = function (message) {
		$("#amountOfGames").html(message.amountOfGames);
		$("#amountOfClients").html(message.amountOfClients);
		$("#totalAmountOfGames").html(message.totalGamesPlayed);
	};
	$("#game").on("click", ".box", function (event) {
		if ($(this).hasClass("marked")) return;

		game.server.play(event.target.id);
	});
	$("#registerName").click(function () {
		game.server.registerClient($('#gamaName').val());

		$("#register").hide();
		$("#findOpponent").show();
	});

	$(".findGame").click(function () {
		findGame();
	});
	$("#findAnotherGame").click(function () {
		$("#gameInformation").html("");
		$("#game").hide();
		$("#findAnotherGame").hide();
		game.server.registerClient($('#gamaName').val());

		findGame();
	});
	function findGame() {
		game.server.findOpponent();
		$("#waitingForOpponent").show();
		$("#register").hide();
		$("#findOpponent").hide();
	}

	$.connection.hub.start().done();
});