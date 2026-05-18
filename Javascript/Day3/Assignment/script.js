function getInput() {
    let text = document.getElementById("strInput").value;
    if (text.trim() === "") {
        alert("Please enter some text");
        return null;
    }
    return text;
}

function displayInfo() {
    let text = getInput();
    if(text == null) return;

    let res = `
                Length: ${text.length}
                Uppercase: ${text.toUpperCase()}
                Lowercase: ${text.toLowerCase()}
                First Character: ${text[0]}
                Last Character: ${text[text.length - 1]}
                Contains Number: ${containsNumber(text)}
            `;

    function containsNumber(str) {
        for (let i = 0; i < str.length; i++) {
            if (!isNaN(str[i]) && str[i] !== " ") {
                return true;
            }
        }
        return false;
    }

    showResult(res)
}


function reverseString() {
    let text = getInput();
    if(text == null) return;

    let reverse = text.split("").reverse().join("");
    showResult(reverse);
}


function trimSpaces() {
    let text = getInput();
    if (!text) return;
    showResult(text.trim());
}

function removeAllSpaces() {
    let text = getInput();
    if (!text) return;
    showResult(text.replaceAll(" ", ""));
}

function countVowels() {
    let text = getInput();
    if (!text) return;

    let count = 0;
    for (let i = 0; i < text.length; i++){
        if(("aeiouAEIOU").indexOf(text[i]) != -1){
            count++;
        }
    }
    showResult("Vowels Count: " + count);
}

function countConsonants() {
    let text = getInput();
    if (!text) return;

    let count = 0;
    let vowels = "aeiouAEIOU";
    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        if (/[a-zA-Z]/.test(ch)) {
            if (vowels.indexOf(ch) === -1) {
                count++;
            }
        }
    }
    showResult("Consonants Count: " + count);
}

function wordCount() {
    let text = getInput();
    if (!text) return;
    let words = text.trim().split(" ").length;
    showResult("Word Count: " + words);
}

function isPalindrome() {
    let text = getInput();
    if (!text) return;

    let org = text.toLowerCase().trim();
    let reverse = org.split("").reverse().join("");
    showResult("Palindrome: " + org === reverse ? " Yes" : " No");
}

function isEmailValid() {
    let text = getInput();
    if (!text) return;
    let valid = text.indexOf("@") !== 0 && text.includes("@") && text.includes(".");
    showResult(valid ? "Valid Email" : "Invalid Email");
}

function hasSpecialCharacters() {
    let text = getInput();
    if (!text) return;

    let special = false
    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        if (!(ch >= 'a' && ch <= 'z') && !(ch >= 'A' && ch <= 'Z') && !(ch >= '0' && ch <= '9') && ch !== ' ') {
            special = true;
            break;
        }
    }
    showResult(special ? "Contains Special Characters" : "No Special Characters");
}

function isStrongPassword() {
    let text = getInput();
    if (!text) return;

    let hasUpper = false;
    let hasLower = false;
    let hasDigit = false;

    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        if (ch >= 'A' && ch <= 'Z') {
            hasUpper = true;
        } else if (ch >= 'a' && ch <= 'z') {
            hasLower = true;
        } else if (ch >= '0' && ch <= '9') {
            hasDigit = true;
        }
    }

    let strong = text.length >= 8 && hasUpper && hasLower && hasDigit;
    showResult(strong ? "Strong Password" : "Weak Password");
}


function titleCase(){
    let text = getInput();
    if (!text) return;

    let words = text.toLowerCase().split(" ");
    let res = "";

    for(let i = 0; i < words.length; i++){
        let word = words[i];
        if(word.length > 0){
            res += word.charAt(0).toUpperCase() + word.slice(1);
        }
        if(i < word.length - 1){
            res += " ";
        }
    }
    showResult(res);
}


function camelCase() {
    let text = getInput();
    if (!text) return;

    let words = text.toLowerCase().split(" ");
    let res = words[0];

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        if (word.length > 0) {
            res += word.charAt(0).toUpperCase() + word.slice(1);
        }
    }
    showResult(res);
}


function snakeCase() {
    let text = getInput();
    if (!text) return;
    showResult(text.toLowerCase().replaceAll(" ", "_"));
}


function kebabCase() {
    let text = getInput();
    if (!text) return;
    showResult(text.toLowerCase().replaceAll(" ", "-"));
}


function alternatingCase() {
    let text = getInput();
    if (!text) return;

    let res = "";
    for (let i = 0; i < text.length; i++) {
        if (i % 2 === 0) {
            res += text[i].toLowerCase();
        }
        else {
            res += text[i].toUpperCase();
        }
    }
    showResult(res);
}


function findSubstring() {
    let text = getInput();
    if (!text) return;

    let sub = prompt("Enter substring to find:");
    if (!sub || sub.trim() === "") {
        alert("Please enter a valid substring.");
        return;
    }

    let pos = text.indexOf(sub);
    showResult(pos !== -1 ? "Position: " + pos : "Substring not found.");
}


function replaceFirst() {
    let text = getInput();
    if (!text) return;

    let oldWord = prompt("Enter word to replace:");
    if (!oldWord) return;
    let newWord = prompt("Enter new word:");
    if (newWord === null) return;
    
    showResult(text.replace(oldWord, newWord));
}


function replaceAllWords() {
    let text = getInput();
    if (!text) return;

    let oldWord = prompt("Enter word to replace:");
    if (!oldWord) return;
    let newWord = prompt("Enter new word:");
    if (newWord === null) return;
    
    showResult(text.replaceAll(oldWord, newWord));
}


function extractDomain() {
    let text = getInput();
    if (!text) return;
    
    if (!text.includes("@") || text.indexOf("@") === text.length - 1) {
        showResult("Error: Invalid email format. No domain found.");
        return;
    }
    
    let domain = text.split("@")[1];
    showResult("Domain: " + domain);
}


function extractInitials() {
    let text = getInput();
    if (!text) return;

    let words = text.split(" ");
    let initials = "";

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.length > 0) {
            initials += word[0].toUpperCase();
        }
    }
    showResult("Initials: " + initials);
}


function repeatString() {
    let text = getInput();
    if (!text) return;

    let times = Number(prompt("Repeat how many times?"));
    showResult(text.repeat(times));
}


function truncateString() {
    let text = getInput();
    if(!text) return;

    let len = Number(prompt("Enter max length: "));
    let res = text.length > len ? text.slice(0, len) + "..." : text;
    showResult(res);
}


function maskString() {
    let text = getInput();
    if (!text) return;

    if (text.length < 7) {
        showResult("String too short to mask");
        return;
    }
    let res = text.slice(0, 3) + "*".repeat(text.length - 6) + text.slice(-3);
    showResult(res);
}


function extractNumbers() {
    let text = getInput();
    if (!text) return;

    let numbers = [];
    let current = "";

    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        if (ch >= '0' && ch <= '9') {
            current += ch;
        } else {
            if (current.length > 0) {
                numbers.push(current);
                current = "";
            }
        }
    }
    if (current.length > 0) {
        numbers.push(current);
    }
    showResult(numbers.length > 0 ? numbers.join(", ") : "No numbers found");
}


function characterFrequency() {
    let text = getInput();
    if (!text) return;

    let freq = {};
    for (let char of text) {
        if (freq[char]) {
            freq[char]++;
        }
        else {
            freq[char] = 1;
        }
    } 

    let res = "";
    for (let key in freq) {
        res += `${key} : ${freq[key]}\n`;
    }
    showResult(res);
}

function showResult(result) {
    let res = document.getElementById("result");
    res.innerText = result;
}