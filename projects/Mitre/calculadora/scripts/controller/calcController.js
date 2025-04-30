class CalcController {

    constructor() {
        this._lastOperator = ""; // Último operador
        this._lastNumber = ""; // Último número
        this._operation = [0]; // Operações realizadas
        this._operator = "0"; // Operador atual
        this._isCalculated = false; // Flag para verificar se está calculando
        this._display = document.querySelector("#display"); // Elemento do display
        this._displayOperation = document.querySelector("#displayOperation"); // Elemento do displayOperation
        this.initButtonsEvents(); // Inicializa os eventos dos botões

    }

    initialize() {
        this._display.innerHTML = "0"; // Inicializa o display com 0
        this._displayOperation.innerHTML = ""; // Limpa o displayOperation

    }

    // Método utilitário para adicionar múltiplos eventos a um elemento
    addEventListenerAll(element, events, fn) {
        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    get display () {
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

    setDisplayOperation() {
        if (this._operation.length == 0) {
            this._displayOperation.innerHTML = "Array vazio"; // Exibe "Array vazio" se não houver operações
        } else {
        this._displayOperation.innerHTML = this._operation.join(" "); // Concatena os valores da operação
        }
    }

    setDisplay(value) {
        if(value) {
            this._display.innerHTML = "Error"; // Exibe "Error" se o valor for inválido
        } else {
            this._display.innerHTML = this._operator; // Atualiza o display com o operador atual
        }
    }

    // Inicializa os eventos dos botões
    initButtonsEvents() {
        let buttons = document.querySelectorAll(".buttons button"); // Seleciona todos os botões

        buttons.forEach(btn => {
            // Remove todos os ouvintes existentes antes de adicionar novos
            btn.replaceWith(btn.cloneNode(true));
            btn = document.querySelector(`[data-value="${btn.getAttribute("data-value")}"]`);

            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.getAttribute("data-value"); // Obtém o valor do botão
                this.execBtn(textBtn); // Executa a ação do botão
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer"; // Altera o cursor para "pointer"
            });
        });
    }

    // Executa a ação correspondente ao botão clicado
    execBtn(value) {
        this.checkValues(); // Verifica os valores antes de executar a ação
    console.log("Valor do botão:", value); // Log do valor do botão
        switch (value) {
            case "C":
                this.clearAll(); // Limpa tudo
                break;
            case "CE":
                this.clearEntry(); // Limpa a última entrada
                break;
            case "=":
                this.calculate(); // Realiza o cálculo
                break;
            case "backspace":
                this.removeLastDigit(); // Remove o último dígito
                break;
            case "1/x":

            break;
            case "x2":

                break;
            case "vx":

                    break;
            case "+/-":
                this.toggleSign(); // Alterna o sinal do número atual
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
                this.addOperation(value); // Adiciona o valor ao display
                this._isCalculated = false; // Reseta a flag de cálculo
                break;
                default:                    
                    console.log("Default switch") // Adiciona o valor ao display
        }
    }

    addOperation(value) {
        if (this.isOperator(value)) {
            this.resetOperator(); // Reseta o operador
            if(this.isOperator(this.getLastOperation())) {
                this.setLastOperation(value); // Atualiza o último operador
            } else {
                this.pushOperation(value); // Adiciona o último operador à operação
            }
        } else {
            if (isNaN(Number(value))) {
                if (this._operator.includes(".")) {
                    console.log("Valor já contém ponto decimal."); // Log se o valor já contém ponto decimal
                } else {
                    this.updateOpeators(value); // Atualiza o operador
                }
            } else {
                this.updateOpeators(value); // Atualiza o operador
            }
        }
    }

    updateOpeators(value) {
        this.setOperator(value); // Adiciona o valor ao operador
        if (this.isOperator(this.getLastOperation())) {
            this.pushOperation(parseFloat(this._operator));

            
        } else {
            this.setLastOperation(parseFloat(this._operator)); // Adiciona o valor ao operador
        }
        
    }


    setOperator(value) {
        if (this._operator.length >= 16) {
            console.log("Limite de dígitos atingido."); // Log se o limite de dígitos for atingido
            return; // Retorna se o limite for atingido
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
            this.calculate(); // Realiza o cálculo se houver mais de 3 operações
            console.log("push:", this._operation); // Log da operação atual
        }
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value; // Atualiza o último valor da operação
        console.log("set:", this._operation); // Log da operação atual

    }

    getLastOperation() {
        const lastOperation = this._operation.length === 0 ? null : this._operation[this._operation.length - 1];
        return lastOperation;
    }

    toggleSign() {
        if (this._operator !== "0") {
            this._operator = this._operator.startsWith("-") ? this._operator.slice(1) : "-" + this._operator;
            this.setLastOperation(parseFloat(this._operator)); // Atualiza o último operador
        } else {
            this._operator = "-" + this.getLastItem(false); // Obtém o último número
        }
    }

    // Limpa todo o display
    clearAll() {
        this._operation = [0]; // Reseta a operação
        this.resetOperator(); // Reseta o operador
        this._lastOperator = ""; // Reseta o último operador
        this._lastNumber = ""; // Reseta o último número
        this._isCalculated = false; // Reseta a flag de cálculo
        this.displayEl.innerHTML = "0"; // Limpa o display
    }

    // Limpa a última entrada
    clearEntry() {
        this.resetOperator(); // Reseta o operador
        if (!this.isOperator(this.getLastOperation())) {
            this._operation.pop(); // Remove o último item da operação
        }
    }

    // Remove o último dígito do display
    removeLastDigit() {
        if (this._operator.length > 1) {
            this._operator = this._operator.slice(0, -1); // Remove o último dígito do operador
        } else {
            this.resetOperator(); // Reseta o operador se não houver mais dígitos
        }
    }

    // Adiciona um valor ao display
    addToDisplay(value) {}

    // Realiza o cálculo
    calculate() {
        let result = 0; // Inicializa o resultado como 0
        let lastItem = this.getLastItem(); // Obtém o último item da operação

        if (this._isCalculated) {
            this.pushOperation(this._lastNumber); // Adiciona o primeiro número à operação
        } else if (this._operation.length == 2) {
            this.pushOperation(this._operation[0]); // Adiciona o primeiro número à operação
        }

        if (this._operation.length > 3) {
            this._operation.pop(); // Remove o último item da operação
        }
        this._lastNumber = this.getLastItem(false); // Obtém o último número
        result = eval(this._operation.join("")); // Avalia a operação
        this._operation = [parseFloat(result)]; // Atualiza a operação com o resultado
        this.pushOperation(lastItem); // Adiciona o resultado à operação
        this._isCalculated = true; // Define a flag como verdadeira
        this.resetOperator(); // Reseta o operador
    }

    getLastItem(value = true) {
        if (value) {
            for (let i = this._operation.length - 1; i >= 0; i--) {
                if (this.isOperator(this._operation[i])) {
                    return this._operation[i]; // Retorna o último item se for um operador
                }
            }
        } else {
            for (let i = this._operation.length - 1; i >= 0; i--) {
                if (!this.isOperator(this._operation[i])) {
                    return this._operation[i]; // Retorna o último item se for um operador
                }
            }
        }
        
    }

    isOperator(value) {
        return ["+", "-", "*", "/"].includes(value);
    }

    resetOperator() {
        this._operator = "0";
    }

    checkValues(){
        if(this._operation.length == 0) {
            this.clearAll(); // Limpa tudo se não houver operações
        }
        if(this._operator == "") {
            this.resetOperator(); // Reseta o operador se estiver vazio
        }
        if(this._isCalculated == "") {
            this._isCalculated = false; // Reseta a flag de cálculo se estiver vazia
        }

    }
}