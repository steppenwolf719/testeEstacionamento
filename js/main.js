document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);

function cadastraVeiculo(e) {
    var modeloCarro = document.getElementById('modeloCarro').value;
    var placaCarro = document.getElementById('placaCarro').value; 
    var time = new Date();     

    if(!modeloCarro && !placaCarro) {
        alert('Por favor, preencha os campos em branco.')
        return false; //nao da continuidade, para o looping.
    } 

    carro = { //armazena as infos
        modelo: modeloCarro, //recebe a info de modeloCarro
        placa: placaCarro, //recebe a info de placaCarro
        hora: time.getHours(), //recebe horas
        minutos: time.getMinutes() //recebe minutos
    }

/*
    localStorage.setItem('teste', "Olá Mundo!"); //armazenar o valor. Armazena "ola mundo" dentro da chave(key) teste
    console.log(localStorage.getItem('teste')); //retorna o valor (busca o que ta armazenado na chave acima ex: na chave 'teste')
    localStorage.removeItem('teste'); //remove o item do storage
    console.log(localStorage.getItem('teste'));
*/

    // console.log(carro);

    //algoritmo para capturar os valores
    if(localStorage.getItem('patio2') === null){
        var carros = []; // array pra guardar objetos
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros));
    } else {
        var carros = JSON.parse(localStorage.getItem('patio2'));
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros));
    }

    //JSON.parse  transforma pra array/ objeto
    //JSON.strigify transforma o retorno pra string

    // if (carro.hora + carro.minutos > time) {
    //     console.log(" Deve pagar")
    // } else {
    //     console.log(" Isento ")        
    // }

    document.getElementById('formulario').reset();

    mostraPatio();

    e.preventDefault();
}

function apagarVeiculo(placa) {
    var carros = JSON.parse(localStorage.getItem('patio2'));

    for(var i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1); //tira na posicao i 1 objeto
        }

        localStorage.setItem('patio2', JSON.stringify(carros));

    }

    mostraPatio();
}

//add carro é push carros.push
//deletar carro é splice carros.splice

function mostraPatio() {
    var carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById('resultados')

    carrosResultado.innerHTML = "";

    for(var i = 0; i < carros.length; i++){
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        carrosResultado.innerHTML += '<tr><td>' + modelo +
                                '</td><td>' + placa +
                                '</td><td>' + hora + ' : ' + minutos +
                                '</td><td><button class="btn btn-danger" onclick="apagarVeiculo(\'' + placa + '\')">Excluir</button></td>' +
                                '</tr>';
    }

}

// document.getElementById > pega do doc html
//innerHTML