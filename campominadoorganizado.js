

function criaCampoVizivel(nl, nc){
    let tabela = document.getElementById("campo-minado");
    for (let i = 0; i < nl; i++) {
        let linha = document.createElement('tr');
        for (let j = 0; j < nc; j++) {
            let celula = document.createElement('td');
            celula.id = (i + " " + j);
            celula.classList.add('oculto');
            /* Regras sobre numeracao e seus significados...
            0- vazio
            1- 1 bomba *ao redor
            2- 2 bombas *
            3- 3 bombas *
            4- 4 bombas *
            5- 5 bombas *
            6- 6 bombas *
            7- 7 bombas *
            8- 8 bombas *
            9- Tem uma bomba
            10- tem Bandeira
            11- oculto
            */
            celula.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
                colocaBandeira(i,j);
                return false;
            }, false);
            celula.addEventListener('click', function (ev) {
                ev.preventDefault();
                revela(i, j);
            }, false);
            linha.appendChild(celula);
        }
        tabela.appendChild(linha);
    }
}


function criaMatrixBombas(nl, nc, nBombas){
    
}



function main(){
    //pergunta para o usuario o tamanho e numero de bombas...
    let nl = 9
    let nc = 9
    let nbombas = 10 
    // por enquanto usarei 9x9 com 10 bombas...
    let matrixBombas = criaMatrixBombas(nl, nc, nbombas)
    //let representacaoCV = criaRepresentacaoCV(nl, nc) 
    criaCampoVizivel(nl,nc)

}

main()