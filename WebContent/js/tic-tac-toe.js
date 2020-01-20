var board = [];
var row;
var col;
$(document).ready(function() {
	$('td').click(function(){ 
    	col = $(this).parent().children().index($(this));
    	row = $(this).parent().parent().children().index($(this).parent());
    	
	});
	
	$('table tr td').click(function(){
	      if($(this).text() == ""){
	    	  $(this).text('o');
	      }
	      getBoardValues();
	});
	
});

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
	
	
	$.ajax({
		url : "http://localhost:8088/tictactoe/board/"+board+"/row/"+row+"/col/"+col,
		type: 'GET',
		dataType: 'json',
		contentType : 'application/json',
		mimeType : 'application/json',

		success : function(data) {
			$("#ttt"+data[0]+data[1]).text('x');
		},
		error : function(data, status, er) {
			console.log("error: " + data + " status: " + status + " er:" + er);
		}
	});
}