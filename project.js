let myCanvas = document.querySelector("#canvas");
let context = myCanvas.getContext("2d");

context.beginPath();
context.rect(325,50,800,600);
context.fillStyle = 'blue';
context.fill();
context.stroke();


let arrayColors = new Array(7);
let arrayCoords = new Array(7);
for (i = 0; i < 7; i++) {
    arrayColors[i] = new Array(6);
    arrayCoords[i] = new Array(6);
}
for (i = 0; i < 7; i++) {
    for (j = 0; j < 6; j++) {
        arrayColors[i][j] = "white";
        arrayCoords[i][j] = [(285+((i+1)*(70+39))), (15+((j+1)*(70+26)))];
    }
}

function drawCircles() {
    for (i = 1; i < 8; i++) {
        for (j = 1; j < 7; j++) {
            context.beginPath();
            context.arc(285+(i*(70+39)), 15+(j*(70+26)), 35, 0, 2 * Math.PI);
            context.fillStyle = arrayColors[i-1][j-1];
            context.fill();
            context.stroke();
        }
    }
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let clickbox = [event.clientX, event.clientY]; 
    return clickbox;
}

function canPlace(x, y) {
    place = false;
    if (arrayColors[x][y] == "white") {
        if (y == 5 || arrayColors[x][y+1] != "white") {
            place = true;
        }
    }
    return place;
}

function writeTurn() {
    let canvas = document.querySelector("myCanvas");
    var context = canvas.getContext("2d");
    context.font = "30px Arial";
    if (isPlayer1Turn == true) {
        context.fillText("Red Player's Turn!", 20, 50);
    }
    else{
        context.fillText("Yellow Player's Turn!", 20, 50);
    }
}

function redWins() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 6; j++) {
            if (arrayColors[i][j] == "red" && arrayColors[i+1][j] == "red" && arrayColors[i+2][j] == "red" && arrayColors[i+3][j] == "red") {
                return true;
            }
        }
    }
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 3; j++) {
            if (arrayColors[i][j] == "red" && arrayColors[i][j+1] == "red" && arrayColors[i][j+2] == "red" && arrayColors[i][j+3] == "red") {
                return true;
            }
        }
    }
    for (i = 3; i < 7; i++) {
        for (j = 0; j < 3; j++) {
            if (arrayColors[i][j] == "red" && arrayColors[i-1][j+1] == "red" && arrayColors[i-2][j+2] == "red" && arrayColors[i-3][j+3] == "red") {
                return true;
            }
        }
    }
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 3; j++) {
            if (arrayColors[i][j] == "red" && arrayColors[i+1][j+1] == "red" && arrayColors[i+2][j+2] == "red" && arrayColors[i+3][j+3] == "red") {
                return true;
            }
        }
    }
    return false;
}

function yellowWins() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 6; j++) {
            if (arrayColors[i][j] == "yellow" && arrayColors[i+1][j] == "yellow" && arrayColors[i+2][j] == "yellow" && arrayColors[i+3][j] == "yellow") {
                return true;
            }
        }
    }
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 3; j++) {
            if (arrayColors[i][j] == "yellow" && arrayColors[i][j+1] == "yellow" && arrayColors[i][j+2] == "yellow" && arrayColors[i][j+3] == "yellow") {
                return true;
            }
        }
    }
    for (i = 3; i < 7; i++) {
        for (j = 0; j < 3; j++) {
            if (arrayColors[i][j] == "yellow" && arrayColors[i-1][j+1] == "yellow" && arrayColors[i-2][j+2] == "yellow" && arrayColors[i-3][j+3] == "yellow") {
                return true;
            }
        }
    }
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 3; j++) {
            if (arrayColors[i][j] == "yellow" && arrayColors[i+1][j+1] == "yellow" && arrayColors[i+2][j+2] == "yellow" && arrayColors[i+3][j+3] == "yellow") {
                return true;
            }
        }
    }
    return false;
}

drawCircles();
let isPlayer1Turn = true;
canvas.addEventListener("mousedown", function(e) {  
    userClick = getMousePosition(myCanvas, e);
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 6; j++) {
            if (userClick[0] < arrayCoords[i][j][0]+50 && userClick[0] > arrayCoords[i][j][0]-35 && userClick[1] < arrayCoords[i][j][1]+40 && userClick[1] > arrayCoords[i][j][1]-35) {
                if (canPlace(i,j) == true) {
                    if (isPlayer1Turn == true) {
                        arrayColors[i][j] = "red";
                        isPlayer1Turn = false;
                        document.querySelector("#para").innerHTML = "Yellow's Turn!";
                    } else {
                        arrayColors[i][j] = "yellow";
                        isPlayer1Turn = true;
                        document.querySelector("#para").innerHTML = "Red's Turn!";
                    }
                    drawCircles();
                    if(yellowWins()) {
                        setTimeout( () => {alert("Yellow wins! Click OK to play again!");}, 50);
                        setTimeout( () => {location.reload();}, 3000);
                    }
                    if(redWins()) {
                        setTimeout( () => {alert("Red wins! Click OK to play again!");}, 50);
                        setTimeout( () => {location.reload();}, 3000);
                    }
                }
            }
        }
    }
});

