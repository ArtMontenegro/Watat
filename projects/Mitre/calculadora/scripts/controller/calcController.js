class CalcController {

    constructor() {
        this._lastNumber = ""; // Último número
        this._specialNumber = "";
        this._operation = [0]; // Operações realizadas
        this._operator = "0"; // Operador atual
        this._isCalculated = false; // Flag para verificar se está calculando
        this._specialValue = "";
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
        if(value) {
            this._display.innerHTML = "Error"; // Exibe "Error" se o valor for inválido
        } else {
            this._display.innerHTML = this._operator; // Atualiza o display com o operador atual
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
                this.removeLastDigit(); // Remove o último dígito
                break;
            case "+/-":
                this.toggleSign();
                break;
            case "%":

                break;

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
            this.resetOperator(); // Reseta o operador
            if (this.isOperator(this.getLastOperation())) {
                this.setLastOperation(value); // Atualiza o último operador
            } else {
                this.pushOperation(value);
            }
        } else {
            if (isNaN(Number(value))) {
                if (this.isSpecial(value)) {
                    this._specialValue = value;
                    value = this.calculateSepecial(value);
                    console.log("value "+value)
                    this.updateOpeators(value); // Atualiza o operador
                    this.calculate();
                } else {
                    if (this._operator.includes(".")) {
                        console.log("Valor já contém ponto decimal."); // Log se o valor já contém ponto decimal
                    } else {
                        this.updateOpeators("."); // Atualiza o operador
                    }
                }
            } else {
                if (this._isCalculated) {
                    this.clearAll()
                }
                this.updateOpeators(value); // Atualiza o operador
            }
        }
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
        if (this._operator === "0") {
            this._operator = value;
        } else {
            this._operator += value;
        }
        this.setDisplay();
    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calculate();
        }
        if (!this._isCalculated) {
            if (this.isOperator(value)){
                this.setDisplayOperation(this._operation.join(" "));
            }
            
        } 
        
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value; // Atualiza o último valor da operação
    }

    getLastOperation() {
        const lastOperation = this._operation.length === 0 ? null : this._operation[this._operation.length - 1];
        return lastOperation;
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
        this._operation = [0]; // Reseta a operação
        this.resetOperator(); // Reseta o operador
        this._lastOperator = ""; // Reseta o último operador
        this._lastNumber = ""; // Reseta o último número
        this._isCalculated = false; // Reseta a flag de cálculo
        this.setDisplay("0");// Limpa o display
        this.setDisplayOperation("")
    }

    clearEntry() {
        this.resetOperator(); // Reseta o operador
        this.setLastOperation(this._operator)
        if (!this.isOperator(this.getLastOperation())) {
            this._operation.pop(); // Remove o último item da operação
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
        this.setLastOperation(this._operator)
        this.setDisplay(this._operator);
        
    }

    calculate() {
        let result = 0; // Inicializa o resultado como 0
        let lastItem = this.getLastItem(); // Obtém o último item da operação
        let lastOperation = "";
        let specialOperation = ""
        let specialOperation2 = this._operation;

        if (this._specialValue != "" && this._operation.length < 2) {
            if (this._specialValue != "%") {
                if (this._specialValue == "fraction") {
                    specialOperation = `1/(${this._specialNumber})`;
                } else if (this._specialValue == "expo") {
                    specialOperation = `sqr(${this._specialNumber})`
                } else if (this._specialValue == "square") {
                    specialOperation = `&radic;(${this._specialNumber})`
                }
                this.setDisplayOperation(specialOperation);
            } else {
                this.setDisplayOperation("0");
            }
            this._isCalculated = true; // Define a flag como verdadeira
            this._specialValue = "";
            this.resetOperator(); // Reseta o operador
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
            this._lastNumber = this.getLastItem(false); // Salva o último número antes do cálculo
        }
        result = eval(this._operation.join("")); // Avalia a operação

        if (this._specialValue != "") {
            if (this._specialValue == "fraction") {
                specialOperation = `1/(${this._specialNumber})`;
            } else if (this._specialValue == "expo") {
                specialOperation = `sqr(${this._specialNumber})`
            } else if (this._specialValue == "square") {
                specialOperation = `&radic;(${this._specialNumber})`
            }
            specialOperation2[2] = specialOperation;
            lastOperation = specialOperation2.join(" ") + " =";
        } else {
            lastOperation = this._operation.join(" ") + " =";
        }
        this._operation = [parseFloat(result)]; // Atualiza a operação com o resultado
        this.setDisplay(this._operation)
        this.pushOperation(lastItem); // Adiciona o resultado à operação
        this._isCalculated = true; // Define a flag como verdadeira
        this._specialValue = "";
        this.resetOperator(); // Reseta o operador
        this.setDisplayOperation(lastOperation);
        console.log("last number "+this.lastNumber)
        
    }

    calculateSepecial(value) {
        const lastNumber = this.getLastItem(false);
        this._specialNumber = lastNumber;
        const firstNumber = this._operation[0];
        if (value == "fraction") {
            return (1 / lastNumber).toPrecision(16);
        } else if (value == "expo") {
            return (lastNumber ** 2);
        } else if (value == "square") {
            return (Math.sqrt(lastNumber)).toPrecision(16);
        } else {
            if (this._operation.length < 2) {
                return "0";
            }
            return  String(firstNumber * lastNumber / 100);
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

    resetOperator() {
        this._operator = "0";
    }

    checkValues(){
        if (this._operation.length == 0) {
            this.clearAll(); // Limpa tudo se não houver operações
        }
        if (this._operator == "") {
            this.resetOperator(); // Reseta o operador se estiver vazio
        }
        if (this._isCalculated == "") {
            this._isCalculated = false; // Reseta a flag de cálculo se estiver vazia
        }
    }
}