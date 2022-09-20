let compras = [
    {id: '1', descricao: 'Compras de Natal'},
    {id: '2', descricao: 'Compras de Ano Novo'},
    {id: '3', descricao: 'Compras de Carnaval'}
];

onload = () => {
    mostraCompras();
    document.querySelector('#inputNovaLista').oninput = monitoraCampoAdic;

    document.querySelector('#buttonAdic').onclick = () => {
        document.querySelector('#buttonIncluir1').disabled = true;
        ativa('tela2');
        document.querySelector('#inputNovaLista').focus();
    };

    document.querySelector('#buttonCanc1').onclick = () => {
        document.querySelector('#inputNovaLista').value = '';
        ativa('tela1');
    }

    document.querySelector('#buttonIncluir1').onclick = () => {
        adicionaLista();
    };
}

const mostraCompras = () => {
    const listaDeCompras = document.querySelector('#listaDeCompras');
    listaDeCompras.innerHTML = '';
    compras.forEach((c) => {
        let elemCompra = document.createElement('li');
        elemCompra.innerHTML = c.descricao;
        elemCompra.onclick = () => {
            //editar lista de compras
        }
        listaDeCompras.appendChild(elemCompra);
    });
    document.querySelector('#estado').innerText = compras.length;
    if(compras.length > 0) {
        listaDeCompras.classList.remove('hidden');
        document.querySelector('#blank').classList.add('hidden');
    } else {
        listaDeCompras.classList.add('hidden');
        document.querySelector('#blank').classList.remove('hidden');
    }
}

const ativa = (comp) => {
    let listaDeTelas = document.querySelectorAll('body > .component');
    listaDeTelas.forEach((c) => 
        c.classList.add('hidden'));
        document.querySelector('#' + comp).classList.remove('hidden');    
}

const adicionaLista = () => {
    let campo = document.querySelector('#inputNovaLista');
    let descricao = campo.value;
    if(descricao != '') {
        compras.push({
        id: Math.random().toString().replace('0.', ''),
        descricao: descricao
    });
    campo.value = '';
    ativa('tela1');
    mostraCompras();
    }
}

const monitoraCampoAdic = (e) => {
    let botao = document.querySelector('#buttonIncluir1');
    if(e.target.value.length > 0) botao.disabled = false;
    else botao.disabled = true;
}