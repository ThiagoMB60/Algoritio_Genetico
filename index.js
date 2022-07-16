import Indiv from "./Individuo.js";
import Populacao from "./Populacao.js";

//DECLARAÇÕES ABAIXO
const muro = 2;
const lata = 1;
const vazio = 0;
const tamanho = 12;
const totalMovimentos = 200;
const totalIndividuos = 100;
const totalIteracoes = 1000;
const percentualMutacao = 2; //20% de chance de mutação sendo 2 em 10

let arrayPopulacoes = []
let matrizInicial = undefined;
//DECLARAÇÕES ACIMA

//====================================================

//FUNCOES ABAIXO
function PegaAleatorioInteiro(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)))
}

function GeraMatrizInicial(tam) {
  let totalLinhas = tam;
  let totalColunas = tam;
  let linhas = [];

  for (let i = 0; i < totalLinhas; i++) {
    let colunas = [];
    for (let j = 0; j < totalColunas; j++) {
      if (i == 0 || i == totalLinhas - 1 || j == 0 || j == totalColunas - 1) {
        colunas.push(muro)
      } else {
        let terreno = PegaAleatorioInteiro(vazio, muro);
        colunas.push(terreno)
      }
    }
    linhas.push(colunas)
  }

  return linhas;
}

function GeraIndividuos(matriz) {
  let arrayIndividuos = [];
  for (let i = 0; i < totalIndividuos; i++) {
    let Individuo = new Indiv(i)
    Individuo.GeraMovimentos(totalMovimentos);
    Individuo.CalculaAptidao(matriz)
    arrayIndividuos.push(Individuo);
  }
  return arrayIndividuos;
}

function OrdenaIdividuos(array) {
  array.sort((a, b) => {
    return parseInt(a.aptidao) - parseInt(b.aptidao);
  });
  return array;
}

function SelecionaMetadeIndividuos(arrayIndividuos) {
  let individuosOrdenados = OrdenaIdividuos(arrayIndividuos);
  let melhoresIndividuos = [];
  for (let i = 50; i < (individuosOrdenados.length); i++) {
    individuosOrdenados[i].id = i;
    melhoresIndividuos.push(individuosOrdenados[i]);
  }
  return melhoresIndividuos;
}

function Mutacao(filhos) {
  let chanceMutacao = undefined;
  let movimentoAuxiliar = undefined;
  for (let i = 0; i < filhos[0].movimentos.length; i++) {
    chanceMutacao = PegaAleatorioInteiro(1, 10)
    if (chanceMutacao <= percentualMutacao) {
      movimentoAuxiliar = filhos[0].movimentos[i]
      filhos[0].movimentos[i] = filhos[1].movimentos[i]
      filhos[1].movimentos[i] = movimentoAuxiliar
    }
  }
  return filhos;
}

function realizarCruzamento(pai, mae) {
  let filhos = []
  let filho1 = new Indiv
  for (let i = 0; i < pai.movimentos.length; i++) { //gera movimentos do flho 1
    if (i < 100) {
      filho1.movimentos[i] = pai.movimentos[i]
    } else {
      filho1.movimentos[i] = mae.movimentos[i]
    }
  }

  let filho2 = new Indiv
  for (let i = 0; i < pai.movimentos.length; i++) { //gera movmentos do flho 2
    if (i > 100) {
      filho2.movimentos[i] = pai.movimentos[i]
    } else {
      filho2.movimentos[i] = mae.movimentos[i]
    }
  }
  filhos.push(filho1, filho2)
  filhos = Mutacao(filhos);

  return filhos;
}

function Crossover(arrayIndividuos, mundo) { //seleciona os pais para o cruzamento e os inclui junto com os filhos no arrayIndividuos
  let novoArray = [];                 //da nova polulação
  let totalPais = arrayIndividuos.length;
  while (arrayIndividuos.length > 0) {
    let id = PegaAleatorioInteiro(0, arrayIndividuos.length - 1)  //seleciona um index aleatoriamente
    let IndividuoPai = arrayIndividuos[id]
    IndividuoPai.id = arrayIndividuos.length - 1;                       //captura o Individuo desse index
    arrayIndividuos.splice(id, 1);             //remove o Individuo do array

    id = PegaAleatorioInteiro(0, arrayIndividuos.length - 1) //repete o procedimento acima para a mae
    let IndividuoMae = arrayIndividuos[id]
    IndividuoMae.id = arrayIndividuos.length - 1;
    arrayIndividuos.splice(id, 1);

    novoArray.push(IndividuoPai, IndividuoMae);
    realizarCruzamento(IndividuoPai, IndividuoMae).forEach((filho) => {
      totalPais += 1
      filho.id = totalPais;
      //console.log(mundo)
      filho.CalculaAptidao(mundo)
      //console.log(filho)
      novoArray.push(filho);
    })
  }
  return novoArray;
}



function PlotaGrafico(arrayPopulacoes) {
  let idPopulacao = []
  let maiorAptidao = []
  let menorAptidao = []
  let mediaAptidao = []
  let totalAptidao = []
  let intervalo = 15

  for (let i = 0; i < arrayPopulacoes.length; i += intervalo) {
    idPopulacao.push(arrayPopulacoes[i].id);
    maiorAptidao.push(arrayPopulacoes[i].GetMaiorAptidao())
    menorAptidao.push(arrayPopulacoes[i].GetMenorAptidao())
    mediaAptidao.push(arrayPopulacoes[i].GetMediaAptidao())
    totalAptidao.push(arrayPopulacoes[i].GetTotalAptidao())
  }
  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: idPopulacao,
      datasets: [{
        label: 'Maior Aptidão da População',
        data: maiorAptidao,
        backgroundColor: [
          'rgba(0, 255, 0, 0.5)',
        ],
        borderColor: [
          'rgba(0, 255, 0, 0.5)',
        ],
        borderWidth: 1
      }, {
        label: 'Menor Aptidao da População',
        data: menorAptidao,
        backgroundColor: [
          'rgba(255, 0, 0, 0.5)',
        ],
        borderColor: [
          'rgba(255, 0, 0, 0.5)',
        ],
        borderWidth: 1
      }, {
        label: 'Aptidao Média da População',
        data: mediaAptidao,
        backgroundColor: [
          'rgba(0, 0, 255, 0.5)',
        ],
        borderColor: [
          'rgba(0, 0, 255, 0.5)',
        ],
        borderWidth: 1
      }, {
        label: 'Aptidao Total da População',
        data: totalAptidao,
        backgroundColor: [
          'rgba(0, 0, 0, 0.5)',
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.5)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function Main() {
  let populacao = undefined
  for (let i = 0; i < totalIteracoes; i++) {
    matrizInicial = GeraMatrizInicial(tamanho);
    let arrayIndividuos = GeraIndividuos(matrizInicial);
    arrayIndividuos = Crossover(SelecionaMetadeIndividuos(arrayIndividuos), matrizInicial);
    populacao = new Populacao(i, arrayIndividuos);
    arrayPopulacoes.push(populacao);
  }
  PlotaGrafico(arrayPopulacoes);
}
//FUNCOES ACIMA

//====================================================

//EXECUÇÃO ABAIXO
Main();

//EXECUCAO ACIMA