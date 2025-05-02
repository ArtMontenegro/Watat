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
            case "+/-":
                this.toggleSign(); // Alterna o sinal do número atual
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
                this.addOperation(value); // Adiciona o valor ao display
                this._isCalculated = false; // Reseta a flag de cálculo
                break;
                default:                    
                    console.log("Default switch") // Adiciona o valor ao display
        }
        console.log(this._operation)
    }

    addOperation(value) {
        if (this.isOperator(value)) {
            this.resetOperator(); // Reseta o operador
            if (this.isOperator(this.getLastOperation())) {
                this.setLastOperation(value); // Atualiza o último operador
            } else {
                this.pushOperation(value); // Adiciona o último operador à operação
            }
        } else {
            if (isNaN(Number(value))) {
                if (this.isSpecial(value)) {
                    this._specialValue = value;
                    value = (this.calculateSepecial(value)).toString(); // Converte o valor especial para string
                    console.log("value "+value)
                    this.updateOpeators(value); 
                    if (this._operation.length < 2) {
                        this.calculate();
                    }
                } else {
                    if (this._operator.includes(".")) {
                        console.log("Valor já contém ponto decimal."); // Log se o valor já contém ponto decimal
                    } else {
                        this.updateOpeators("."); // Atualiza o operador
                    }
                }
                
            } else {
                this.updateOpeator(value); // Atualiza o operador
            }
        }
    }

    updateOpeator(value) {
        if (this._isCalculated) {
                this.clearAll()
            }
            this.updateOpeators(value); // Atualiza o operador
        
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
        if (this._operator === "0" || this._specialValue != "") {
            this._operator = value;
        } else {
            this._operator += value;
        }
        this.setDisplay(this._operator);
    }

    pushOperation(value) {
        console.log("pushOperation: Adicionando valor à operação:", value);
        this._operation.push(value);
        console.log("Operação atual:", this._operation);

        if (this._operation.length > 3) {
            this.calculate(); // Realiza o cálculo se houver mais de 3 operações
            console.log("push:", this._operation); // Log da operação atual
        }
        if (!this._isCalculated) {
            if (this.isOperator(value)){
                this.setDisplayOperation(this._operation.join(" "));
            }
            
        } 
        
    }

    setLastOperation(value) {
        console.log("setLastOperation: Atualizando último valor da operação para:", value);
        this._operation[this._operation.length - 1] = value;
        console.log("Operação atual:", this._operation);
    }

    getLastOperation() {
        return this._operation.length === 0 ? null : this._operation[this._operation.length - 1];
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
        this._lastNumber = ""; // Reseta o último número
        this._isCalculated = false; // Reseta a flag de cálculo
        this.setDisplay("0");// Limpa o display
        this.setDisplayOperation("")
    }

    // Limpa a última entrada
    clearEntry() {
        this.resetOperator(); // Reseta o operador
        this.setLastOperation(this._operator)
        if (!this.isOperator(this.getLastOperation())) {
            this._operation.pop(); // Remove o último item da operação
            this.checkValues();
        }
        this.setDisplay(this._operator);
        
    }

    // Remove o último dígito do display
    removeLastDigit() {
        if (this._operator.length > 1) {
            this._operator = this._operator.slice(0, -1); // Remove o último dígito do operador
        } else {
            this.resetOperator(); // Reseta o operador se não houver mais dígitos
        }
        this.setLastOperation(this._operator)
        this.setDisplay(this._operator);
        
    }

    // Realiza o cálculo
    calculate() {
        console.log("calculate: Iniciando cálculo.");
        console.log("Estado inicial:");
        console.log(" - Operação atual:", this._operation);
        console.log(" - Último número (_lastNumber):", this._lastNumber);
        console.log(" - Flag de cálculo (_isCalculated):", this._isCalculated);
        let result = 0; // Inicializa o resultado como 0
        let lastItem = this.getLastItem(); // Obtém o último item da operação
        let lastNumber = this.getLastItem(false); // Obtém o último número da operação
        console.log("->: Último número:", lastNumber);
        console.log("calculate: Último item antes do cálculo:", lastItem);
        

        if (this._specialValue != "" && this._operation.length < 2) {
            if (this._isCalculated && this._specialValue == "Calculado") {
                console.log("calculate: Cálculo já realizado. Retornando.");
                return; // Retorna se o cálculo já foi realizado
            }
            console.log("calculate: Operação especial detectada:", this._specialValue);
            if (this._specialValue != "%") {
                if (this._specialValue == "fraction") {
                    console.log("calculate: Operação especial - fração.");
                    this.setDisplayOperation(`1/(${this._specialNumber})`);
                } else if (this._specialValue == "expo") {
                    console.log("calculate: Operação especial - exponenciação.");
                    this.setDisplayOperation(`sqr(${this._specialNumber})`);
                } else if (this._specialValue == "square") {
                    console.log("calculate: Operação especial - raiz quadrada.");
                    this.setDisplayOperation(`&radic;(${this._specialNumber})`);
                }
            } else {
                this.setDisplayOperation("0");
            }
            this._isCalculated = true; // Define a flag como verdadeira
            this._specialValue = "Calculado"; // Define o valor especial como "Calculado"
            this.resetOperator(); // Reseta o operador
            console.log("calculate: Finalizando cálculo especial.");
            return;
        }

        if (this._isCalculated) {
            console.log("calculate: Adicionando último número à operação (cálculo já realizado). ultimo número:", this._lastNumber);
            this.pushOperation(this._lastNumber); // Adiciona o último número à operação
        } else if (this._operation.length == 2) {
            console.log("calculate: Adicionando primeiro número à operação.");
            this.pushOperation(this._operation[0]); // Adiciona o primeiro número à operação
        }

        if (this._operation.length > 3) {
            console.log("calculate: Operação possui mais de 3 itens. Removendo o último item.");
            this._operation.pop(); // Remove o último item da operação
        }
//--------------------------
        if (!this._isCalculated) {
            this._lastNumber = lastNumber; // Salva o último número antes do cálculo
            console.log("calculate: Último número salvo (_lastNumber):", this._lastNumber);
        }

        try {
            result = eval(this._operation.join("")); // Avalia a operação
            console.log("calculate: Resultado do cálculo:", result);
        } catch (error) {
            console.error("calculate: Erro ao avaliar a operação:", error);
            this.setDisplay("Error");
            return;
        }
        if (this._isCalculated) {
            console.log("Calculado - Valor especial (_specialValue):", this._specialValue);
        } else {
            console.log("Nao calculado- Valor especial (_specialValue):", this._specialValue);

        }
        if (this._specialValue != "" && !this._isCalculated) {
            console.log("calculate: Processando operação especial:", this._specialValue);
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

        this._operation = [parseFloat(result)]; // Atualiza a operação com o resultado
        console.log("calculate: Operação após cálculo:", this._operation);

        this.setDisplay(this._operation); // Atualiza o display com o resultado
        this.pushOperation(lastItem); // Adiciona o resultado à operação
        this._isCalculated = true; // Define a flag como verdadeira
        this._specialValue = "";
        this.resetOperator(); // Reseta o operador

        console.log("calculate: Finalizando cálculo.");
        console.log("Estado final:");
        console.log(" - Operação atual:", this._operation);
        console.log(" - Último número (_lastNumber):", this._lastNumber);
        console.log(" - Flag de cálculo (_isCalculated):", this._isCalculated);
    }

    calculateSepecial(value) {
        const lastNumber = this.getLastItem(false);
        this._specialNumber = lastNumber;

        if (value == "fraction") {
            return Number((1 / lastNumber).toPrecision(16)); // Limita a fração a 16 dígitos
        } else if (value == "expo") {
            return Number((lastNumber ** 2).toPrecision(16)); // Limita a exponenciação a 16 dígitos
        } else if (value == "square") {
            return Number((Math.sqrt(lastNumber)).toPrecision(16)); // Limita a raiz quadrada a 16 dígitos
        } else {
            if (this._operation.length < 2) {
                return 0; // Retorna 0 se não houver operação suficiente
            }
            return Number((this._operation[0] * lastNumber / 100).toPrecision(16)); // Limita a porcentagem a 16 dígitos
        }
    }

    getLastItem(value = true) {
        console.log("getLastItem: Obtendo último item. Operação atual:", this._operation);
        if (value) {
            for (let i = this._operation.length - 1; i >= 0; i--) {
                if (this.isOperator(this._operation[i])) {
                    console.log("getLastItem: Último operador encontrado:", this._operation[i]);
                    return this._operation[i]; // Retorna o último item se for um operador
                }
            }
        } else {
            for (let i = this._operation.length - 1; i >= 0; i--) {
                if (!this.isOperator(this._operation[i])) {
                    console.log("getLastItem: Último número encontrado:", this._operation[i]);
                    return this._operation[i]; // Retorna o último item se for um operador
                }
            }
        }
        console.log("getLastItem: Nenhum item encontrado.");
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