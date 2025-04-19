let currentInput = "0";
let previousInput = "";
let operator = null;

const display = document.querySelector(".display");

function updateDisplay() {
    display.textContent = currentInput;
}

function clear() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    updateDisplay();
}

function inputNumber(num) {
    
    const MAX_DIGITS = 7;
    
    if (currentInput === "0") {
        currentInput = num;
    } else if (currentInput.replace('-', '').replace('.', '').length < MAX_DIGITS) {
        
        currentInput += num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    currentInput = "0";
    operator = op;
}

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+":
            currentInput = (prev + current).toString();
            break;
        case "−":
            currentInput = (prev - current).toString();
            break;
        case "×":
            currentInput = (prev * current).toString();
            break;
        case "÷":
            currentInput = current === 0 ? "Error" : (prev / current).toString();
            break;
    }
    operator = null;
    previousInput = "";
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value)) {
            inputNumber(value);
        } else if (value === ".") {
            inputDecimal();
        } else if (value === "AC") {
            clear();
        } else if (value === "=") {
            calculate();
        } else if (value === "±") {
            toggleSign();
        } else if (value === "%") {
            percentage();
        } else {
            handleOperator(value);
        }
    });
});


// Time
const hourElement = document.querySelector(".hour"); // Define hour element
const minuteElement = document.querySelector(".minute"); // Define minute element

const updateTime = () => {
    const currentTime = new Date();

    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour > 12) {
        currentHour -= 12;
    }

    hourElement.textContent = currentHour.toString();
    minuteElement.textContent = currentMinute.toString().padStart(2, '0');
};

setInterval(updateTime, 1000);
updateTime();

