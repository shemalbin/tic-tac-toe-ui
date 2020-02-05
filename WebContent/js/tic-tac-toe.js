var board = [];
var row;
var col;
var playerMark;

$(document).ready(function() {
	
	$('#xbutton').click(function(){ 
    	sessionStorage.setItem('mark','x');
	});
	
	$('#obutton').click(function(){ 
		sessionStorage.setItem('mark','o');
    	
	});
	
	/* Get the row and the column of where the user clicked*/
	$('td').click(function(){ 
    	col = $(this).parent().children().index($(this));
    	row = $(this).parent().parent().children().index($(this).parent());
    	
	});
	/*Firstly, we will add the circle on the board where the user played.
	 * Secondly, it will call the function to add all the board values on the board
	 * and lastly check if the user won the game with that move.*/
	$('table tr td').click(function(){
		playerMark = sessionStorage.getItem('mark');
	      if($(this).text() == ""){
	    	  $(this).text(playerMark);
	    	  getBoardValues();
		      checkUserWin(board);
	      }
	      
	});
	
});

/* This function will get all the values which are on the board*/
function getBoardValues(){
	board = [];
	board.push($("#ttt00").text());
	board.push($("#ttt01").text());
	board.push($("#ttt02").text());
	board.push($("#ttt10").text());
	board.push($("#ttt11").text());
	board.push($("#ttt12").text());
	board.push($("#ttt20").text());
	board.push($("#ttt21").text());
	board.push($("#ttt22").text());
	
}

/* This function will check if the user won the game, 
 * if not it will call the function to get the computer move.
 * It will return EMPTY if there is no winner
 * and it will return CIRCLE if the user won the game.*/
function checkUserWin(board){
	$.ajax({
		url : "http://localhost:8088/tictactoe/board/"+board,
		type: 'GET',
		dataType: 'json',
		contentType : 'application/json',
		mimeType : 'application/json',

		success : function(data) {
			if(data == 'EMPTY'){
				makeMove();
			} else if(data == 'CIRCLE' && playerMark == 'o'){
				$("#message").empty();
				$("#message").append($('<div class="alert alert-primary alert-dismissible" role="alert">'
						+'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
						+'<span aria-hidden="true">&times;</span></button>'
						+'<i class="fa fa-check-circle" style="text-align: center">The user won the game!</i></div>'));
			} else if(data == 'CROSS' && playerMark == 'x'){
				$("#message").empty();
				$("#message").append($('<div class="alert alert-primary alert-dismissible" role="alert">'
						+'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
						+'<span aria-hidden="true">&times;</span></button>'
						+'<i class="fa fa-check-circle" style="text-align: center">The user won the game!</i></div>'));
			} 
		},
		error : function(data, status, er) {
			console.log("error: " + data + " status: " + status + " er:" + er);
		}
	});
}

/*This function will check if the computer won the game.
 * It will return CROSS if the computer won.*/
function checkComputerWin(board){
	$.ajax({
		url : "http://localhost:8088/tictactoe/board/"+board,
		type: 'GET',
		dataType: 'json',
		contentType : 'application/json',
		mimeType : 'application/json',

		success : function(data) {
			if(data == 'CROSS' && playerMark == 'o'){
				$("#message").empty();
				$("#message").append($('<div class="alert alert-danger alert-dismissible" role="alert">'
						+'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
						+'<span aria-hidden="true">&times;</span></button>'
						+'<i class="fa fa-check-circle" style="text-align: center">The computer won the game!</i></div>'));
			} else if(data == 'CIRCLE' && playerMark == 'x'){
				$("#message").empty();
				$("#message").append($('<div class="alert alert-danger alert-dismissible" role="alert">'
						+'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
						+'<span aria-hidden="true">&times;</span></button>'
						+'<i class="fa fa-check-circle" style="text-align: center">The computer won the game!</i></div>'));
			}
		},
		error : function(data, status, er) {
			console.log("error: " + data + " status: " + status + " er:" + er);
		}
	});
}

/*This function will get the computer move coordinates and add them on the board.
 * If the coordinates returned are[-100,-100] means there are no longer any other move,
 * else it will place the cross on the exact coordinate of the game board,
 * get the new board values and then check if the computer won.*/
function makeMove(){
	$.ajax({
		url : "http://localhost:8088/tictactoe/board/"+board+"/row/"+row+"/col/"+col+"/mark/"+playerMark,
		type: 'GET',
		dataType: 'json',
		contentType : 'application/json',
		mimeType : 'application/json',

		success : function(data) {
			if(data[0] == -100 && data[1] == -100){
				$("#message").empty();
				$("#message").append($('<div class="alert alert-secondary alert-dismissible" role="alert">'
						+'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
						+'<span aria-hidden="true">&times;</span></button>'
						+'<i class="fa fa-check-circle" style="text-align: center">It is a draw!</i></div>'));
			} else{
				if(playerMark == 'o'){
					$("#ttt"+data[0]+data[1]).text('x');
				} else if(playerMark == 'x'){
					$("#ttt"+data[0]+data[1]).text('o');
				}
				getBoardValues();
				checkComputerWin(board);
			}
		},
		error : function(data, status, er) {
			console.log("error: " + data + " status: " + status + " er:" + er);
		}
	});
}

function resetGame(){
	$("#ttt00").text('');
	$("#ttt01").text('');
	$("#ttt02").text('');
	$("#ttt10").text('');
	$("#ttt11").text('');
	$("#ttt12").text('');
	$("#ttt20").text('');
	$("#ttt21").text('');
	$("#ttt22").text('');
	$("#message").empty();
}