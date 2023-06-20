class Validator{

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-email-validate',
            'data-equal',
            'data-password-validate',
        ]
    }

    // Inicia a validação de todos os campos
    validate(form) {

         // limpa todas as validações antigas
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length) {
        this.cleanValidations(currentValidations);
        }

        // Pega os inputs
        let inputs = form.getElementsByTagName('input');

        // Transformando HTMLCollection em array
        let inputsArray = [...inputs];

        // loop nos inputs para validação
        inputsArray.forEach(function(input,obj) {

            //loop nas validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                // verifica se a validação existe no input
                if(input.getAttribute(this.validations[i]) != null) {

                    //transforma data-min-length em minlength (transforma string em método)
                    let method = this.validations[i].replace('data-', '').replace('-','');

                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // invoca o método
                    this[method](input, value);

                }
            }
        }, this);

    }

    // verifica se um input tem o número mínimo de caracteres
    minlength(input,minValue) {

        let inputLength = input.value.length;

        let errorMessage = 'O campo precisa ter no mínimo ' + minValue + ' caracteres';

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //validação de email
    emailvalidate(input){

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = 'Insira um email no padrão "email@email.com"';

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    //Comparação das senhas
    equal(input, inputName){
        
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = 'Este campo precisa ser igual a ' + inputName;

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    //validação da senha
    passwordvalidate(input) {

        //Transformando string em array
        let charArr = input.value.split("");
        
        //contador de caracteres e numeros
        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
            
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0) {
            
            let errorMessage = 'A senha precisa de uma letra maiúscula e um número';

            this.printMessage(input, errorMessage);
        }
    }

    //verifica se o input é requerido
    required(input) {
        
        let inputValue = input.value;

        if(inputValue === '') {
            
            let errorMessage = 'Este campo é obrigatório';

            this.printMessage(input, errorMessage);
        }
    }

    // método para imprimir mensagens de erro na tela
    printMessage(input,msg) {
        
        //quantidade de erros

        let errorsQty = input.parentNode.querySelector('.error-validation');

        // imprimir erro apenas se não tiver erros
        if(errorsQty === null) {

            // template recebe mensagem de validação de erro
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    



    //Limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações
submit.addEventListener('click', function(e) {

    e.preventDefault();

    validator.validate(form);

    console.log('funcionou');
});