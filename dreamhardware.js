let pecas = [];

onload = () => {
    
    const p = JSON.parse(localStorage.getItem('pecas'));
    if(p)
        pecas = p;

    mostraPecas();
    document.querySelector('#inputNovaPeca').oninput = monitoraCampoAdic;

    document.querySelector('#buttonAdic').onclick = () => {
        document.querySelector('#buttonIncluir1').disabled = true;
        ativa('tela2');
        document.querySelector('#inputNovaPeca').focus();
    };

    document.querySelector('#buttonCanc1').onclick = () => {
        document.querySelector('#inputNovaPeca').value = '';
        ativa('tela1');
    }

    document.querySelector('#buttonCanc2').onclick = () => {
        let campo = document.querySelector('#inputEditarPeca');
        campo.value = '';
        campo.removeAttribute('data-id', '');
        ativa('tela1');
    }

    document.querySelector('#buttonIncluir1').onclick = () => {
        adicionaPeca();
    };

    document.querySelector('#buttonSalvarAlt').onclick = () => {
        alteraPeca();
    };
    document.querySelector('#buttonExcluir').onclick = () => {
        apagaPeca();
    };
}

const mostraPecas = () => {
    const listaDePecas = document.querySelector('#listaDePecas');
    listaDePecas.innerHTML = '';
    pecas.forEach((p) => {
        let elemPeca = document.createElement('li');
        elemPeca.innerHTML = p.descricao + ' - R$ ' + p.preço;
        elemPeca.setAttribute('data-id', p.id);
        elemPeca.onclick = () => {
            let campo = document.querySelector('#inputEditarPeca');
            ativa('tela3');
            campo.value = p.descricao;
            campo.setAttribute('data-id', p.id);
            campo.focus();
        }
        listaDePecas.appendChild(elemPeca);
    });
    document.querySelector('#estado').innerText = pecas.length;
    if(pecas.length > 0) {
        listaDePecas.classList.remove('hidden');
        document.querySelector('#blank').classList.add('hidden');
    } else {
        listaDePecas.classList.add('hidden');
        document.querySelector('#blank').classList.remove('hidden');
    }
}

const ativa = (comp) => {
    let listaDeTelas = document.querySelectorAll('body > .component');
    listaDeTelas.forEach((c) => 
        c.classList.add('hidden'));
        document.querySelector('#' + comp).classList.remove('hidden');    
}

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

const monitoraCampoAdic = (e) => {
    let botao = document.querySelector('#buttonIncluir1');
    if(e.target.value.length > 0) botao.disabled = false;
    else botao.disabled = true;
}

const alteraPeca = () => {
    let campo = document.querySelector('#inputEditarPeca');
    let idPeca = campo.getAttribute('data-id');
    let i = pecas.findIndex((p) => p.id == idPeca);
    pecas[i].descricao = campo.value;
    campo.value = '';
    campo.removeAttribute('data-id', '');
    ativa('tela1');
    salvaPecas();
    mostraPecas();
}

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

const salvaPecas = () => {
    localStorage.setItem('pecas', JSON.stringify(pecas));
}

navigator.serviceWorker.register('./sw.js');