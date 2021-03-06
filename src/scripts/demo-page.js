/*global CPF*/

const date = new Date();
document.getElementsByClassName('footer__year')[0].innerHTML = date.getFullYear();

//Helper functions
const addClass = (el, klass) => {
    'use strict';
    el[0].className += ' ' + klass;
};

const removeClass = (el, klass) => {
    'use strict';
    var elClass = ' ' + el[0].className + ' ';

    while(elClass.indexOf(' ' + klass + ' ') !== -1){
        elClass = elClass.replace(' ' + klass + ' ', '');
    }

    el[0].className = elClass;
};

const setListener = (className, func, action) => {
    'use strict';

    const elements = document.getElementsByClassName(className);

    Array.from(elements).forEach( (element) => {
        element.addEventListener(action, func, false);
    });
};


//CPF functions
const validate = () => {
    'use strict';
    event.preventDefault();

    const cpf = document.getElementById('validate-section__input--to-format').value,
        validCPF = CPF.validate(cpf),
        messageInput = document.getElementsByClassName('validate-section__input--message'),
        message = (validCPF) ? 'CPF Válido' : 'CPF Inválido';

    if (validCPF) {
        removeClass(messageInput, 'invalid');
        addClass(messageInput, 'valid');
    }else{
        removeClass(messageInput, 'valid');
        addClass(messageInput, 'invalid');
    }

    messageInput[0].setAttribute('value', message);

    typeof ga === 'function' && ga('send', 'event', 'button', 'click', 'Validate CPF');
};

const generate = () => {
    'use strict';
    document.getElementsByClassName('generate-section__input--generated')[0].setAttribute('value', CPF.generate());

    typeof ga === 'function' && ga('send', 'event', 'button', 'click', 'Generate CPF');
};

const format = () => {
    'use strict';
    event.preventDefault();
    const params = document.getElementsByClassName('format-section__params')[0].value,
        fieldValue = document.getElementById('format-section__input').value;

    document.getElementsByClassName('format-section__input--message')[0].setAttribute('value', CPF.format(fieldValue, params));

    typeof ga === 'function' && ga('send', 'event', 'button', 'click', 'Formate CPF');
};


// Download analytcs
const downloadDev = () => {
    'use strict';

    typeof ga === 'function' && ga('send', 'event', 'download', 'click', 'Download Dev version');
};

const downloadProd = () => {
    'use strict';

    typeof ga === 'function' && ga('send', 'event', 'download', 'click', 'Download Production version');
};


setListener('generate-section__submit-button', generate, 'click');
setListener('validate-section__form', validate, 'submit');
setListener('format-section__form', format, 'submit');
setListener('format-section__form', format, 'submit');
setListener('download-development', downloadDev, 'click');
setListener('download-production', downloadProd, 'click');
