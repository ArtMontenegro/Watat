class CalcController {

    constructor() {
        this._lastNumber = ""; // Último número
        this._specialNumber = "";// Último número especial
        this._operation = [0]; // Operação atual
        this._operator = "0"; // Operador atual
        this._isCalculated = false; // Flag para verificar se está calculando
        this._specialValue = ""; // Valor especial (fração, exponenciação, raiz quadrada, porcentagem)
        this._display = document.querySelector("#display"); // Elemento do display
        this._displayOperation = document.querySelector("#displayOperation"); // Elemento do displayOperation
        this.initButtonsEvents(); // Inicializa os eventos dos botões
    }

    initialize() {
        this._display.innerHTML = "0"; // Inicializa o display com 0
        this._displayOperation.innerHTML = ""; // Limpa o displayOperation
    }

    addEventListenerAll(element, events, fn) {
        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    get display() {
        return this._display.innerHTML; // Retorna o valor do display
    }

    set display(value) {
        this._display.innerHTML = value; // Define o valor do display
    }

    get displayOperation() {
        return this._displayOperation.innerHTML; // Retorna o valor do displayOperation
    }

    set displayOperation(value) {
        this._displayOperation.innerHTML = value; // Define o valor do displayOperation
    }

    setDisplayOperation(value) {
        this._displayOperation.innerHTML = value; // Concatena os valores da operação
    }

    setDisplay(value) {
        if (value == undefined) {
            this._display.innerHTML = "Error"; // Exibe "Error" se o valor for inválido
        } else {
            this._display.innerHTML = value; // Atualiza o display com o operador atual
        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll(".buttons button");

        buttons.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
            btn = document.querySelector(`[data-value="${btn.getAttribute("data-value")}"]`);

            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.getAttribute("data-value");
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    execBtn(value) {
        this.checkValues();
        switch (value) {
            case "C":
                this.clearAll();
                break;
            case "CE":
                this.clearEntry();
                break;
            case "=":
                this.calculate();
                break;
            case "backspace":
                this.removeLastDigit();
                break;
            case "+/-":
                this.toggleSign();
                break;
            case "fraction":
            case "expo":
            case "square":
            case "%":
            case ".":
            case "+":
            case "-":
            case "*":
            case "/":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                this.addOperation(value);
                this._isCalculated = false;
                break;
            default:
        }
    }

    addOperation(value) {
        if (this.isOperator(value)) {
            this.resetOperator();
            if (this.isOperator(this.getLastOperation())) {
                this.setLastOperation(value);
            } else {
                this.pushOperation(value);
            }
        } else {
            if (isNaN(Number(value))) {
                if (this.isSpecial(value)) {
                    this._specialValue = value;
                    value = (this.calculateSepecial(value)).toString();
                    this.updateOpeators(value);
                    if (this._operation.length < 2) {
                        this.calculate();
                    }
                } else {
                    if (this._operator.includes(".")) {
                    } else {
                        this.updateOpeators(".");
                    }
                }
            } else {
                this.updateOpeator(value);
            }
        }
    }

    updateOpeator(value) {
        if (this._isCalculated) {
            this.clearAll();
        }
        this.updateOpeators(value);
    }

    updateOpeators(value) {
        this.setOperator(value);
        if (this.isOperator(this.getLastOperation())) {
            this.pushOperation(parseFloat(this._operator));
        } else {
            this.setLastOperation(parseFloat(this._operator));
        }
    }

    setOperator(value) {
        if (this._operator.length >= 16) {
            return;
        }
        if (this._operator === "0" || this._specialValue != "") {
            this._operator = value;
        } else {
            this._operator += value;
        }
        this.setDisplay(this._operator);
    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calculate();
        }
        if (!this._isCalculated) {
            if (this.isOperator(value)) {
                this.setDisplayOperation(this._operation.join(" "));
            }
        }
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    getLastOperation() {
        return this._operation.length === 0 ? null : this._operation[this._operation.length - 1];
    }

    toggleSign() {
        if (this._operator !== "0") {
            this._operator = this._operator.startsWith("-") ? this._operator.slice(1) : "-" + this._operator;
            this.setLastOperation(parseFloat(this._operator));
        } else {
            this._operator = "-" + this.getLastItem(false);
        }
    }

    clearAll() {
        this._operation = [0];
        this.resetOperator();
        this._lastNumber = "";
        this._isCalculated = false;
        this.setDisplay("0");
        this.setDisplayOperation("");
    }

    clearEntry() {
        this.resetOperator();
        this.setLastOperation(this._operator);
        if (!this.isOperator(this.getLastOperation())) {
            this._operation.pop();
            this.checkValues();
        }
        this.setDisplay(this._operator);
    }

    removeLastDigit() {
        if (this._operator.length > 1) {
            this._operator = this._operator.slice(0, -1);
        } else {
            this.resetOperator();
        }
        this.setLastOperation(this._operator);
        this.setDisplay(this._operator);
    }

    calculate() {
        let result = 0;
        let lastItem = this.getLastItem();
        let lastNumber = this.getLastItem(false);

        if (this._specialValue != "" && this._operation.length < 2) {
            if (this._isCalculated && this._specialValue == "Calculado") {
                return;
            }
            if (this._specialValue != "%") {
                if (this._specialValue == "fraction") {
                    this.setDisplayOperation(`1/(${this._specialNumber})`);
                } else if (this._specialValue == "expo") {
                    this.setDisplayOperation(`sqr(${this._specialNumber})`);
                } else if (this._specialValue == "square") {
                    this.setDisplayOperation(`&radic;(${this._specialNumber})`);
                }
            } else {
                this.setDisplayOperation("0");
            }
            this._isCalculated = true;
            this._specialValue = "Calculado";
            this.resetOperator();
            return;
        }

        if (this._isCalculated) {
            this.pushOperation(this._lastNumber);
        } else if (this._operation.length == 2) {
            this.pushOperation(this._operation[0]);
        }

        if (this._operation.length > 3) {
            this._operation.pop();
        }

        if (!this._isCalculated) {
            this._lastNumber = lastNumber;
        }

        try {
            result = eval(this._operation.join(""));
        } catch (error) {
            this.setDisplay("Error");
            return;
        }
        if (this._specialValue != "" && !this._isCalculated) {
            let specialOperation = "";
            let operation = this._operation;
            if (this._specialValue == "fraction") {
                specialOperation = `1/(${this._specialNumber})`;
            } else if (this._specialValue == "expo") {
                specialOperation = `sqr(${this._specialNumber})`;
            } else if (this._specialValue == "square") {
                specialOperation = `&radic;(${this._specialNumber})`;
            }
            operation[2] = specialOperation;
            this.setDisplayOperation(operation.join(" ") + " =");
        } else if (!this._isCalculated) {
            this.setDisplayOperation(this._operation.join(" ") + " =");
        }

        this._operation = [parseFloat(result)];
        this.setDisplay(this._operation);
        this.pushOperation(lastItem);
        this._isCalculated = true;
        this._specialValue = "";
        this.resetOperator();
    }

    calculateSepecial(value) {
        const lastNumber = this.getLastItem(false);
        this._specialNumber = lastNumber;

        if (value == "fraction") {
            return Number((1 / lastNumber).toPrecision(16));
        } else if (value == "expo") {
            return Number((lastNumber ** 2).toPrecision(16));
        } else if (value == "square") {
            return Number((Math.sqrt(lastNumber)).toPrecision(16));
        } else {
            if (this._operation.length < 2) {
                return 0;
            }
            return Number((this._operation[0] * lastNumber / 100).toPrecision(16));
        }
    }

    getLastItem(value = true) {
        if (value) {
            for (let i = this._operation.length - 1; i >= 0; i--) {
                if (this.isOperator(this._operation[i])) {
                    return this._operation[i];
                }
            }
        } else {
            for (let i = this._operation.length - 1; i >= 0; i--) {
                if (!this.isOperator(this._operation[i])) {
                    return this._operation[i];
                }
            }
        }
        return undefined;
    }

    isOperator(value) {
        return ["+", "-", "*", "/"].includes(value);
    }

    isSpecial(value) {
        return ["fraction", "expo", "square", "%"].includes(value);
    }

    resetOperator() {
        this._operator = "0";
    }

    checkValues() {
        if (this._operation.length == 0) {
            this.clearAll();
        }
        if (this._operator == "") {
            this.resetOperator();
        }
        if (this._isCalculated == "") {
            this._isCalculated = false;
        }
    }
}