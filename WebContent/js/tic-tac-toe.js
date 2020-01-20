var board = [];
var row;
var col;

$(document).ready(function() {
	/* Get the row and the column of where the user clicked*/
	$('td').click(function(){ 
    	col = $(this).parent().children().index($(this));
    	row = $(this).parent().parent().children().index($(this).parent());
    	
	});
	/*Firstly, we will add the circle on the board where the user played.
	 * Secondly, it will call the function to add all the board values on the board
	 * and lastly check if the user won the game with that move.*/
	$('table tr td').click(function(){
	      if($(this).text() == ""){
	    	  $(this).text('o');
	      }
	      getBoardValues();
	      checkUserWin(board);
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
			} else if(data == 'CIRCLE'){
				alert('The user won the game!');
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
			if(data == 'CROSS'){
				alert('The computer won the game!')
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
		url : "http://localhost:8088/tictactoe/board/"+board+"/row/"+row+"/col/"+col,
		type: 'GET',
		dataType: 'json',
		contentType : 'application/json',
		mimeType : 'application/json',

		success : function(data) {
			if(data[0] == -100 && data[1] == -100){
				alert('It is a draw!!');
			} else{
				$("#ttt"+data[0]+data[1]).text('x');
				getBoardValues();
				checkComputerWin(board);
			}
		},
		error : function(data, status, er) {
			console.log("error: " + data + " status: " + status + " er:" + er);
		}
	});
}