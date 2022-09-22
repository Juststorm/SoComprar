//esvazia vetor de peças
let pecas = [];
//operações realizadas no carregamento da aplicação
onload = () => {
    //armazena localmente o vetor de peças
    const p = JSON.parse(localStorage.getItem('pecas'));
    if(p)
        pecas = p;

    mostraPecas();
    document.querySelector('#inputNovaPeca').oninput = monitoraCampoAdic;

    //botão que leva ao cadastero de peças
    document.querySelector('#buttonAdic').onclick = () => {
        document.querySelector('#buttonIncluir1').disabled = true;
        ativa('tela2');
        document.querySelector('#inputNovaPeca').focus();
    };

    //botão que cancela operação atual e desfaz operações, voltando ao estado inicial
    document.querySelector('#buttonCanc1').onclick = () => {
        document.querySelector('#inputNovaPeca').value = '';
        ativa('tela1');
    }

    //botão que cancela operação atual e desfaz operações, voltando ao estado inicial
    document.querySelector('#buttonCanc2').onclick = () => {
        let campo = document.querySelector('#inputEditarPeca');
        let campo2 = document.querySelector('#inputEditarValorPeca');
        campo.value = '';
        campo2.value = '';
        campo.removeAttribute('data-id', '');
        ativa('tela1');
    }

    //acionamento do botão de inclusão de peça no vetor
    document.querySelector('#buttonIncluir1').onclick = () => {
        adicionaPeca();
    };

    //acionamento do botão chama a função que edita a peça do vetor
    document.querySelector('#buttonSalvarAlt').onclick = () => {
        alteraPeca();
    };
    //acionamento do botão chama a função que apaga a peça do vetor
    document.querySelector('#buttonExcluir').onclick = () => {
        apagaPeca();
    };

}

//barra de busca para elementos da lista. converte tudo digitado para minusculo, para não ter problemas na correspondencia.
//aplica estilo de não exibição para itens não correspondentes
function barraBusca() {
    let input = document.getElementById('barraDeBusca').value
    input=input.toLowerCase();
    let p = document.getElementsByClassName('peca');
      
    for (i = 0; i < p.length; i++) { 
        if (!p[i].innerHTML.toLowerCase().includes(input)) {
            p[i].style.display="none";
        }
        else {
            p[i].style.display="list-item";                 
        }
    }
}

//função para mostrar as peças, chamada diversas vezes. Percorre o vetor e exibe as peças na tela, com as devidas informações. Usa elementos DOM
const mostraPecas = () => {
    const listaDePecas = document.querySelector('#listaDePecas');
    listaDePecas.innerHTML = '';
    pecas.forEach((p) => {
        let elemPeca = document.createElement('li');
        elemPeca.classList.add('peca');
        elemPeca.innerHTML = p.descricao + ' - R$ ' + p.preço;
        elemPeca.setAttribute('data-id', p.id);
        elemPeca.onclick = () => {
            let campo = document.querySelector('#inputEditarPeca');
            let campo2 = document.querySelector('#inputEditarValorPeca');
            ativa('tela3');
            campo.value = p.descricao;
            campo2.value = p.preço;
            campo.setAttribute('data-id', p.id);
            campo.focus();
        }
        listaDePecas.appendChild(elemPeca);

    });
    //document.querySelector('#estado').innerText = pecas.length;
    //Alterna exibição de componentes da tela de acordo com a quantidade de peças. Se vazio, não exibe nada.
    if(pecas.length > 0) {
        listaDePecas.classList.remove('hidden');
        document.querySelector('#blank').classList.add('hidden');
        document.querySelector('#qtdPecas').classList.remove('hidden');
        document.querySelector('#valorTotalPecas').classList.remove('hidden');
        document.querySelector('#barraDeBusca').classList.remove('hidden');

    } else {
        listaDePecas.classList.add('hidden');
        document.querySelector('#blank').classList.remove('hidden');
        document.querySelector('#qtdPecas').classList.add('hidden');
        document.querySelector('#valorTotalPecas').classList.add('hidden');
        document.querySelector('#barraDeBusca').classList.add('hidden');
    }

    //Função que conta a quantidade de elementos do vetor e também realiza a soma dos valores das peças, disponibilizando o total do orçamento.
    const contaPecas = () => {
        let total = pecas.length;
        let valorTotal = 0;
        pecas.forEach((p) => {
            valorTotal += parseFloat(p.preço);
        });
        document.querySelector('#qtdPecas').innerText = 'Quantidade de peças: ' + total;
        document.querySelector('#valorTotalPecas').innerText = 'Valor total do orçamento: R$ ' + valorTotal.toFixed(2);
    }

    contaPecas(pecas);

    //função descontinuada de sort
    //console.log(pecas.sort(function (a, b) {
    //   return a.preço - b.preço}));

}

//função principal para ativação de componentes na tela
const ativa = (comp) => {
    let listaDeTelas = document.querySelectorAll('body > .component');
    listaDeTelas.forEach((c) => 
        c.classList.add('hidden'));
        document.querySelector('#' + comp).classList.remove('hidden');    
}

//função para cadastrar no vetor a peça inputada pelo usuário
const adicionaPeca = () => {
    let campo = document.querySelector('#inputNovaPeca');
    let campo2 = document.querySelector('#inputValorPeca');
    let descricao = campo.value;
    let preco = campo2.value;
    if(descricao != '' && preco != '') {
        pecas.push({
        id: Math.random().toString().replace('0.', ''),
        descricao: descricao,
        preço: preco
    });
    campo.value = '';
    campo2.value = '';
    ativa('tela1');
    salvaPecas();
    mostraPecas();
    }
}

//Verifica e habilita o botão para utilização e cadastro de peça
const monitoraCampoAdic = (e) => {
    let botao = document.querySelector('#buttonIncluir1');
    if(e.target.value.length > 0) botao.disabled = false;
    else botao.disabled = true;
}

//Função para alteração da peça cadastrada. Traz os valores originais e permite salvar ao final a alteração.
const alteraPeca = () => {
    let campo = document.querySelector('#inputEditarPeca');
    let campo2 = document.querySelector('#inputEditarValorPeca');
    let idPeca = campo.getAttribute('data-id');
    let i = pecas.findIndex((p) => p.id == idPeca);
    pecas[i].descricao = campo.value;
    pecas[i].preço = campo2.value;
    campo.value = '';
    campo2.value = '';
    campo.removeAttribute('data-id', '');
    ativa('tela1');
    salvaPecas();
    mostraPecas();
}

//Função para remover a peça selecionada do vetor
const apagaPeca = () => {
    let campo = document.querySelector('#inputEditarPeca');
    let idPeca = campo.getAttribute('data-id');
    pecas = pecas.filter((p) => p.id != idPeca);
    campo.value = '';
    campo.removeAttribute('data-id', '');
    ativa('tela1');
    salvaPecas();
    mostraPecas();
}

//Função que salva em armazenamento local as peças no vetor
const salvaPecas = () => {
    localStorage.setItem('pecas', JSON.stringify(pecas));
}

//registro do service worker para funcionamento off-line
navigator.serviceWorker.register('./sw.js');