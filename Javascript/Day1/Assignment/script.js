function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function isPerfectSquare(num) {
    if (num < 0){
        return false;
    }
    let root = Math.floor(Math.sqrt(num));
    return (root * root === num);
}

function generatePyramid() {
    let input = document.getElementById("p1-input").value;
    let errorEl = document.getElementById("p1-error");
    let outputEl = document.getElementById("p1-output");

    errorEl.innerText = "";
    outputEl.innerText = "";

    let n = Number(input);
    if (n < 1 || n > 10 || isNaN(n)) {
        errorEl.innerText = "Enter number between 1 and 10";
        return;
    }

    let result = "";

    for (let i = 1; i <= n; i++) {
        let row = "";

        for (let j = 1; j <= i; j++) {
            let value;
            if (i === Math.ceil(n / 2) || i === n) {
                value = i;
            }
            else if (i % 2 !== 0) {
                value = j;
            }
            else {
                value = i - j + 1;
            }
            if (value % 3 === 0) {
                row += "*" + value + " ";
            }
            else {
                row += value + " ";
            }
        }
        result += row + "\n";
    }
    outputEl.innerText = result;
}

function generateFizzBuzz() {
    let input = document.getElementById("p2-input").value;
    let errorEl = document.getElementById("p2-error");
    let outputEl = document.getElementById("p2-output");
    errorEl.innerText = "";
    outputEl.innerHTML = "";

    let n = Number(input);
    if (isNaN(n) || n < 10 || n > 100) {
        errorEl.innerText = "Enter number between 10 and 100";
        return;
    }

    let html = "<table>";
    for (let i = 1; i <= n; i++) {
        if ((i - 1) % 3 === 0) {
            html += "<tr>";
        }

        let text = i;
        let bg = "white";
        let color = "black";

        if (i % 3 === 0 && i % 5 === 0) {
            text = "FizzBuzz";
            bg = "purple";
            color = "white";
        }
        else if (i % 3 === 0) {
            text = "Fizz";
            bg = "blue";
            color = "white";
        }
        else if (i % 5 === 0) {
            text = "Buzz";
            bg = "green";
            color = "white";
        }
        else if (isPrime(i)) {
            bg = "gold";
        }

        html += `
            <td style="background:${bg}; color:${color};">
                ${text}
            </td>
        `;

        if (i % 3 === 0 || i === n) {
            html += "</tr>";
        }
    }
    html += "</table>";
    outputEl.innerHTML = html;
}


function calculateSums() {
    let input = document.getElementById("p3-input").value;
    let errorEl = document.getElementById("p3-error");
    let outputEl = document.getElementById("p3-output");

    errorEl.innerText = "";
    outputEl.innerHTML = "";

    let n = Number(input);

    if (isNaN(n) || n < 5 || n > 50) {
        errorEl.innerText = "Enter number between 5 and 50";
        return;
    }

    let evenSum = 0;
    let oddSum = 0;
    let divSum = 0;
    let primeSum = 0;

    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            evenSum += i;
        }
        else {
            oddSum += i;
        }
        if ((i % 3 === 0 || i % 5 === 0) && !(i % 3 === 0 && i % 5 === 0)) {
            divSum += i;
        }
        if (isPrime(i)) {
            primeSum += i;
        }
    }
    let max = Math.max(evenSum, oddSum, divSum, primeSum);
    let min = Math.min(evenSum, oddSum, divSum, primeSum);

    function getColor(sum) {
        if (sum === max) {
            return "green";
        }
        if (sum === min) {
            return "red";
        }
        return "black";
    }

    outputEl.innerHTML = `
        <div style="color:${getColor(evenSum)}">
            Even Sum = ${evenSum}
        </div>
        <div style="color:${getColor(oddSum)}">
            Odd Sum = ${oddSum}
        </div>
        <div style="color:${getColor(divSum)}">
            Sum of 3 or 5 = ${divSum}
        </div>
        <div style="color:${getColor(primeSum)}">
            Prime Sum = ${primeSum}
        </div>
    `;
}


function generateReversePyramid() {
    let input = document.getElementById("p4-input").value;
    let errorEl = document.getElementById("p4-error");
    let outputEl = document.getElementById("p4-output");

    errorEl.innerText = "";
    outputEl.innerText = "";

    let n = Number(input);
    if (isNaN(n) || n < 5 || n > 15) {
        errorEl.innerText = "Enter number between 5 and 15";
        return;
    }

    let result = "";

    for (let i = n; i >= 1; i--) {
        let row = "";
        for (let j = 1; j <= i; j++) {
            let value = i * j;
            let sqrt = Math.sqrt(value);

            if (sqrt === Math.floor(sqrt)) {
                row += "■ ";
            }
            else {
                row += i + " ";
            }
        }
        result += row + "\n";
    }
    outputEl.innerText = result;
}

function generateAll() {
    if (!document.getElementById("p1-input").value) document.getElementById("p1-input").value = 5;
    if (!document.getElementById("p2-input").value) document.getElementById("p2-input").value = 15;
    if (!document.getElementById("p3-input").value) document.getElementById("p3-input").value = 10;
    if (!document.getElementById("p4-input").value) document.getElementById("p4-input").value = 5;

    generatePyramid();
    generateFizzBuzz();
    calculateSums();
    generateReversePyramid();
}

function clearAll() {
    document.getElementById("p1-input").value = "";
    document.getElementById("p1-error").innerText = "";
    document.getElementById("p1-output").innerText = "";

    document.getElementById("p2-input").value = "";
    document.getElementById("p2-error").innerText = "";
    document.getElementById("p2-output").innerHTML = "";

    document.getElementById("p3-input").value = "";
    document.getElementById("p3-error").innerText = "";
    document.getElementById("p3-output").innerHTML = "";

    document.getElementById("p4-input").value = "";
    document.getElementById("p4-error").innerText = "";
    document.getElementById("p4-output").innerText = "";
}
