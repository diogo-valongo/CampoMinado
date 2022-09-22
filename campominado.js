var numeroDeBandeiras = 0;
var mostradorDeBombas = document.getElementById("nBombas");


function criaCampoZerado(x, y) {
    let campo = [];
    campo.length = x;
    for (let index = 0; index < campo.length; index++) {
        let linha = [];
        linha.length = y;
        for (let lindex = 0; lindex < campo.length; lindex++) {
            linha[lindex] = 0;
        }
        campo[index] = linha;

    }
    return campo;
}

function iniciaJogo(x, y, campo) {
    let tabela = document.getElementById("campo-minado");
    for (let i = 0; i < x; i++) {
        let linha = document.createElement('tr');
        for (let j = 0; j < y; j++) {
            let celula = document.createElement('td');
            celula.id = (i + " " + j);
            celula.classList.add('oculto');
            celula.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
                if (celula.classList.contains('oculto')) {
                    celula.classList.add('bandeira');
                    celula.classList.remove('oculto');
                    numeroDeBandeiras++;
                    mostradorDeBombas.textContent--;
                }
                else if (celula.classList.contains('bandeira')) {
                    celula.classList.add('oculto');
                    celula.classList.remove('bandeira');
                    numeroDeBandeiras--;
                    mostradorDeBombas.textContent++;
                }
                return false;
            }, false);
            celula.addEventListener('click', function (ev) {
                ev.preventDefault();
                //revela(parseInt(celula.id.split(" ")[0]), parseInt(celula.id.split(" ")[1]), campo)
                revela(i, j, campo)
            }, false);
            linha.appendChild(celula);
        }
        tabela.appendChild(linha);
    }
}

function contaBombasRedor(x, y, campo) {
    console.log(campo)
    let contador = 0;
    if (x == 0 && y == 0) {
        if (campo[x][y + 1] == 1) {
            contador++;
        } // direita
        if (campo[x + 1][y + 1] == 1) {
            contador++;
        } // inferior direita
        if (campo[x + 1][y] == 1) {
            contador++;
        }; // inferior
    }
    else if (x == campo.length - 1 && y == 0) {
        if (campo[x - 1][y] == 1) {
            contador++;
        }; // superior
        if (campo[x - 1][y + 1] == 1) {
            contador++;
        }; // superior direita
        if (campo[x][y + 1] == 1) {
            contador++;
        }; // direita
    }
    else if (x == 0 && y == campo[0].length - 1) {
        if (campo[x + 1][y] == 1) {
            contador++;
        }; // inferior
        if (campo[x + 1][y - 1] == 1) {
            contador++;
        }; // inferior esquerda
        if (campo[x][y - 1] == 1) {
            contador++;
        }; // esquerda
    }
    else if (x == campo.length - 1 && y == campo[0].length - 1) {
        if (campo[x][y - 1] == 1) {
            contador++;
        }; // esquerda
        if (campo[x - 1][y - 1] == 1) {
            contador++;
        }; // superior esquerda
        if (campo[x - 1][y] == 1) {
            contador++;
        }; // superior

    }
    else if (x == 0) {
        if (campo[x][y + 1] == 1) {
            contador++;
        }; // direita
        if (campo[x + 1][y + 1] == 1) {
            contador++;
        }; // inferior direita
        if (campo[x + 1][y] == 1) {
            contador++;
        }; // inferior
        if (campo[x + 1][y - 1] == 1) {
            contador++;
        }; // inferior esquerda
        if (campo[x][y - 1] == 1) {
            contador++;
        }; // esquerda
    }
    else if (x == campo.length-1) {
        if (campo[x][y - 1] == 1) {
            contador++;
        }; // esquerda
        if (campo[x - 1][y - 1] == 1) {
            contador++;
        }; // superior esquerda
        if (campo[x - 1][y] == 1) {
            contador++;
        }; // superior
        if (campo[x - 1][y + 1] == 1) {
            contador++;
        }; // superior direita
        if (campo[x][y + 1] == 1) {
            contador++;
        }; // direita
    }
    else if (y == 0) {
        if (campo[x - 1][y] == 1) {
            contador++;
        }; // superior
        if (campo[x - 1][y + 1] == 1) {
            contador++;
        }; // superior direita
        if (campo[x][y + 1] == 1) {
            contador++;
        }; // direita
        if (campo[x + 1][y + 1] == 1) {
            contador++;
        }; // inferior direita
        if (campo[x + 1][y] == 1) {
            contador++;
        }; // inferior
    }
    else if (y == campo[0].length - 1) {
        if (campo[x + 1][y] == 1) {
            contador++;
        }; // inferior
        if (campo[x + 1][y - 1] == 1) {
            contador++;
        }; // inferior esquerda
        if (campo[x][y - 1] == 1) {
            contador++;
        }; // esquerda
        if (campo[x - 1][y - 1] == 1) {
            contador++;
        }; // superior esquerda
        if (campo[x - 1][y] == 1) {
            contador++;
        }; // superior
    }
    else {
        if (campo[x - 1][y] == 1) {
            contador++;
        }; // superior
        if (campo[x - 1][y + 1] == 1) {
            contador++;
        }; // superior direita
        if (campo[x][y + 1] == 1) {
            contador++;
        }; // direita
        if (campo[x + 1][y + 1] == 1) {
            contador++;
        }; // inferior direita
        if (campo[x + 1][y] == 1) {
            contador++;
        }; // inferior
        if (campo[x + 1][y - 1] == 1) {
            contador++;
        }; // inferior esquerda
        if (campo[x][y - 1] == 1) {
            contador++;
        }; // esquerda
        if (campo[x - 1][y - 1] == 1) {
            contador++;
        }; // superior esquerda

    }
    return contador;
}

function revela(x, y, campo) {
    //ve se eh uma bomba, se for revelatodo campo.
    //se nao for bomba descobre qual numero e mostra o numero
    //se nao tiver bomba é vazio e aplica revela nos vizinhos.
    let celula = document.getElementById(x + " " + y);
    if (celula.classList.contains('oculto')) {

        if (campo[x][y] == 1) {
            celula.classList.add('bomba');
            celula.classList.remove('oculta');
            window.open("https://youtu.be/dQw4w9WgXcQ");
            //revelaTudo(campo);
        }
        else {
            nBombas = contaBombasRedor(x, y, campo);
            celula.classList.add('m' + nBombas);
            celula.classList.remove('oculto');
            if (nBombas == 0) {
                console.log(campo.length, campo[0].length, x, y)
                if (x == 0 && y == 0) {
                    revela(x, y + 1, campo); // direita
                    revela(x + 1, y + 1, campo); // inferior direita
                    revela(x + 1, y, campo); // inferior
                }
                else if (x == campo.length - 1 && y == 0) {
                    revela(x - 1, y, campo); // superior
                    revela(x - 1, y + 1, campo); // superior direita
                    revela(x, y + 1, campo); // direita
                }
                else if (x == 0 && y == campo[0].length - 1) {
                    revela(x + 1, y, campo); // inferior
                    revela(x + 1, y - 1, campo); // inferior esquerda
                    revela(x, y - 1, campo); // esquerda
                }
                else if (x == campo.length - 1 && y == campo[0].length - 1) {
                    revela(x, y - 1, campo); // esquerda
                    revela(x - 1, y - 1, campo); // superior esquerda
                    revela(x - 1, y, campo); // superior
                }
                else if (x == 0) {
                    revela(x, y + 1, campo); // direita
                    revela(x + 1, y + 1, campo); // inferior direita
                    revela(x + 1, y, campo); // inferior
                    revela(x + 1, y - 1, campo); // inferior esquerda
                    revela(x, y - 1, campo); // esquerda
                }
                else if (x == campo.length-1) {
                    revela(x, y - 1, campo); // esquerda
                    revela(x - 1, y - 1, campo); // superior esquerda
                    revela(x - 1, y, campo); // superior
                    revela(x - 1, y + 1, campo); // superior direita
                    revela(x, y + 1, campo); // direita
                }
                else if (y == 0) {
                    revela(x - 1, y, campo); // superior
                    revela(x - 1, y + 1, campo); // superior direita
                    revela(x, y + 1, campo); // direita
                    revela(x + 1, y + 1, campo); // inferior direita
                    revela(x + 1, y, campo); // inferior
                }
                else if (y == campo[0].length - 1) {
                    revela(x + 1, y, campo); // inferior
                    revela(x + 1, y - 1, campo); // inferior esquerda
                    revela(x, y - 1, campo); // esquerda
                    revela(x - 1, y - 1, campo); // superior esquerda
                    revela(x - 1, y, campo); // superior
                }
                else {
                    revela(x - 1, y, campo); // superior
                    revela(x - 1, y + 1, campo); // superior direita
                    revela(x, y + 1, campo); // direita
                    revela(x + 1, y + 1, campo); // inferior direita
                    revela(x + 1, y, campo); // inferior
                    revela(x + 1, y - 1, campo); // inferior esquerda
                    revela(x, y - 1, campo); // esquerda
                    revela(x - 1, y - 1, campo); // superior esquerda
                }
            }
        }
    }
}


function verificaSeTemBombaRepetida(mat, pos) {
    mat.forEach(element => {
        if (pos[0] == mat[0] || pos[1] == mat[1]) {
            return true;
        }
    });
    return false;
}

function criaBombas(nBombas, x, y) {
    let bombas = new Set();
    while(bombas.size != nBombas){
        bombas.add([Math.floor(Math.random() * x), Math.floor(Math.random() * y)]);
    }
    return bombas   
}
/* function criaBombas(nBombas, x, y) {
    let bombas = [];
    for (let i = 0; i < nBombas; i++) {
        let posicao = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
        while (verificaSeTemBombaRepetida(bombas, posicao)) {
            posicao = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
        }
        bombas[i] = posicao;
    }
    return bombas
} */

function colocaBombasEmCampo(matriz, nBombas) {
    mostradorDeBombas.textContent = nBombas;
    let posBombas = criaBombas(nBombas, matriz.length, matriz[0].length);
    posBombas.forEach(posBomba => {
        matriz[posBomba[0]][posBomba[1]] = 1;
    });
    return matriz
}



function main() {
    campo = criaCampoZerado(8, 8);
    leMatrix(campo)
    campo = colocaBombasEmCampo(campo, 10);
    leMatrix(campo)
    console.log(campo);
    iniciaJogo(8, 8, campo);

}

function leMatrix(mat) {
    for (let index = 0; index < mat.length; index++) {
        console.log(mat[index]);
    }
}


main()