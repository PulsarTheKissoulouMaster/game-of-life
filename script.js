var runButton = document.getElementById("start-btn");
var stopButton = document.getElementById("stop-btn");
var resetButton = document.getElementById("reset-btn");

var nbrow = 40;
var nbcol = 30;
var tableHtml = document.getElementById("game-table");

var iteration = 0;
var compteur = document.getElementById("count").textContent;
var gameLoop = null;

stopButton.style.display = "none";

function initGameTable(){

    for(var j = 0; j <= nbcol; j++){
        var trOpen = "<tr>";
        var td = "";

        for(var i = 0; i <= nbrow; i++){

            id = j+"-"+i;

            var tdOpen = "<td class=\"whited\" onclick=\"colBlack(this.id)\" id="+id+">";
            var colContent = "";
            var tdClose = "</td>";

            td = td+tdOpen+colContent+tdClose;
        }

        var trClose = "</tr>";

        var element = trOpen+td+trClose;

        tableHtml.insertAdjacentHTML("beforeend", element);
    }
}

function resetTable(){

    for(var j = 0; j <= nbrow; j++){
        for(var i = 0; i <= nbcol; i++){

            col = document.getElementById(i+"-"+j);

            if(col.classList.contains("blacked")){
                col.classList.remove("blacked");
                col.setAttribute("class", "whited");
            }
        }
    }
}

function initArrayTable(){

    var table = new Array(nbcol);
    
    for(var i = 0; i <= nbcol; i++){
        table[i] = new Array(nbrow);
    }

    for(var i = 0; i <= nbcol; i++){
        for(var j = 0; j <= nbrow; j++){

            var col = document.getElementById(i+"-"+j);
            //Blanc c'est false et noir c'est true

            if(col.classList.contains("blacked")){
                table[i][j] = true;
            }else{
                table[i][j] = false;
            }
        }
    }

    return table;
}

function colBlack(id){

    var col = document.getElementById(id);

    if(col.classList.contains("blacked")){
        col.classList.remove("blacked");
        col.setAttribute("class", "whited");
    }else{
        col.classList.remove("whited");
        col.setAttribute("class", "blacked");
    }

}

function getLiveNeighbor(x, y){

    var tableArray = initArrayTable();
    var nb = 0;

    var neighbor = [
        tableArray?.[x-1]?.[y-1] == undefined ? false : tableArray[x-1][y-1], 
        tableArray?.[x-1]?.[y] == undefined ? false : tableArray[x-1][y],
        tableArray?.[x-1]?.[y+1] == undefined ? false : tableArray[x-1][y+1],

        tableArray?.[x]?.[y-1] == undefined ? false : tableArray[x][y-1], 
        tableArray?.[x]?.[y+1] == undefined ? false : tableArray[x][y+1],

        tableArray?.[x+1]?.[y-1] == undefined ? false : tableArray[x+1][y-1],
        tableArray?.[x+1]?.[y] == undefined ? false : tableArray[x+1][y],
        tableArray?.[x+1]?.[y+1] == undefined ? false : tableArray[x+1][y+1]  
    ];

    for(var i = 0; i <= 7; i++){
        if(neighbor[i]){
            nb = nb +1;
        }
    }

    return nb;
}

function startGame(){
    
    console.log("Game started !");
    runButton.style.display = "none";
    stopButton.style.display = "block";

    var tableArray = initArrayTable();

    gameLoop = setInterval(function(){
        for(var i = 0; i <= nbcol; i++){
            for(var j = 0; j <= nbrow; j++){
                
                var cell = tableArray[i][j];
                var liveNgb = getLiveNeighbor(i, j);
    
                if (cell){
                    //Si la cellule est vivante
    
                    if(!(liveNgb == 2 || liveNgb == 3)){
                        tableArray[i][j] = false;
                    }
                }else{
                    //Si la cellule est morte
    
                    if(liveNgb == 3){
                        tableArray[i][j] = true;
                    }
                }
            }
        }
    
        for(var i = 0; i <= nbcol; i++){
            for(var j = 0; j <= nbrow; j++){
                var cell = i+"-"+j;
                var col = document.getElementById(cell);
                
                var cellArray = tableArray[i][j];

                if(!cellArray){
                    if(col.classList.contains("blacked")){
                        col.classList.remove("blacked")
                    }
    
                    col.setAttribute("class", "whited");
                }else{
                    if(col.classList.contains("whited")){
                        col.classList.remove("whited")
                    }
    
                    col.setAttribute("class", "blacked");
                }
            }   
        }

        console.log(iteration++);
        document.getElementById("count").textContent = ""+iteration;
    }, 300);
}

function stopGame(){
    
    clearInterval(gameLoop);
    runButton.style.display = "block";
    stopButton.style.display = "none";
    console.log("Game stoped !");
}

function resetGame(){

    stopGame();
    resetTable();
    iteration = 0;
    document.getElementById("count").textContent = ""+iteration;
    console.log("Game reseted !");
}

initGameTable();