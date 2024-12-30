const formulario = document.querySelector( '#formulario' );
formulario.addEventListener( 'submit', function( e ){
    e.preventDefault();

    const peso = Number( formulario.querySelector( '[name=peso]' ).value );
    const altura = Number( formulario.querySelector( '[name=altura]' ).value );

    const erro = obterMensagemErro( peso, altura );
    if( erro !== '' ){
        adicionarMensagem( erro, false );
        return false;
    }

    const pesoFormatado = formatarValorNumerico( peso );
    const alturaFormatada = formatarValorNumerico( altura );
    const imc = calcularIMC( pesoFormatado, alturaFormatada );
    const nivel = obterNivelDeAcordoComIMC( imc );

    adicionarMensagem( `Seu IMC é ${imc} ( ${nivel} ).` );
} );

function obterMensagemErro( peso, altura ){
    if( peso === '' ){
        return 'Preencha o campo peso.';
    }

    if( ! peso ){
        return 'Preencha o peso com um valor numérico válido.';
    }

    if( altura == '' ){
        return 'Preencha o campo altura.';
    }

    if( ! altura ){
        return 'Preencha a altura com um valor numérico válido.';
    }

    return '';
}

function adicionarMensagem( mensagem, sucesso = true ){
    const mensagemErro = document.querySelector( '#mensagem' );
    mensagemErro.innerText = mensagem;
    mensagemErro.className = sucesso ? 'mensagem-sucesso' : 'mensagem-erro';
}

function formatarValorNumerico( valor ){
    return Number( valor ).toFixed( 2 );
}

function calcularIMC( peso, altura ){
    const imc = peso / Math.pow( altura, 2 );
    return formatarValorNumerico( imc );
}

function obterNivelDeAcordoComIMC( imc ){
    const valorMinimoPesoNormal = 18.5;
    const valorMaximoPesoNormal = 24.9;
    const valorMinimoSobrepeso = 25;
    const valorMaximoSobrepeso = 29.9;
    const valorMinimoObesidadeGrau1 = 30;
    const valorMaximoObesidadeGrau1 = 34.9;
    const valorMinimoObesidadeGrau2 = 35;
    const valorMaximoObesidadeGrau2 = 39.9;
    const valorMinimoObesidadeGrau3 = 40;

    let nivel = 'Abaixo do peso';

    if( imc >= valorMinimoPesoNormal && imc < valorMaximoPesoNormal ){
        nivel = 'Peso do normal';
    } else if( imc >= valorMinimoSobrepeso && imc < valorMaximoSobrepeso ){
        nivel = 'Sobrepeso';
    } else if( imc >= valorMinimoObesidadeGrau1 && imc < valorMaximoObesidadeGrau1 ){
        nivel = 'Obesidade grau 1';
    } else if( imc >= valorMinimoObesidadeGrau2 && imc < valorMaximoObesidadeGrau2 ){
        nivel = 'Obesidade grau 2';
    } else if( imc >= valorMinimoObesidadeGrau3 ){
        nivel = 'Obesidade grau 3';
    }

    return nivel;
}