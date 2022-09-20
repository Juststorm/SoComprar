let telas = ['componente1', 'componente2', 'componente3', 'componente4'];

const mostra = (comp) => {
    telas.forEach((tela) => {
        document.querySelector('#' + tela).classList.add('hidden');
    });
    document.querySelector('#' + comp).classList.remove('hidden')
};

const ativa = (elem) => {
    let irmaos = elem.parentNode.children;
    for(let i=0; i<irmaos.length;i++) irmaos[i].classList.remove('active');
    elem.classList.add('active');
};

onload = () => {
    document.querySelector('#tab1').onclick = (e) => {
        mostra('componente1');
        ativa(e.target);
    };
    document.querySelector('#tab2').onclick = (e) => {
        mostra('componente2');
        ativa(e.target);
    };
    document.querySelector('#tab3').onclick = (e) => {
        mostra('componente3');
        ativa(e.target);
    };
    document.querySelector('#tab4').onclick = (e) => {
        mostra('componente4');
        ativa(e.target);
    };
};