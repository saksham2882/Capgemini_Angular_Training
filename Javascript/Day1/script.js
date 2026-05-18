function changeText() {
    document.getElementById("demo").innerHTML = "You clicked the button!"
}

function checkNumber() {
    let val = document.getElementById("num").value;
    let output = document.getElementById("res")

    if(val % 2 == 0){
        output.innerHTML = "Number is Even."
    }
    else {
        output.innerHTML = "Number is Odd."
    }
}

function changeColor(color) {
    let box = document.getElementsByClassName("demo2")[0]

    if(color == "red"){
        box.style.backgroundColor = "red";
    }
    if(color == "yellow"){
        box.style.backgroundColor = "yellow";
    }
    if (color == "aliceblue"){ 
        box.style.backgroundColor = "aliceblue";
    }
}