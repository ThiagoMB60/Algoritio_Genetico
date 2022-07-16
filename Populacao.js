export default class Populacao {
  constructor(id, arrayPopulacao) {
    this.id = id;
    this.pop = arrayPopulacao;
  }

  GetMaiorAptidao() {
    let maiorAptidao = -Infinity;
    this.pop.forEach((individuo) => {
      maiorAptidao = (individuo.aptidao > maiorAptidao) ? individuo.aptidao : maiorAptidao;
    })
    return maiorAptidao;
  }

  GetMenorAptidao() {
    let menorAptidao = Infinity;
    this.pop.forEach((individuo) => {
      menorAptidao = (individuo.aptidao < menorAptidao) ? individuo.aptidao : menorAptidao;
    })
    return menorAptidao;
  }

  GetMediaAptidao() {
    let mediaAptidao = (this.GetTotalAptidao() / this.pop.length);
    return mediaAptidao;
  }

  GetTotalAptidao() {
    let totalAptidao = 0
    this.pop.forEach((individuo) => {
      totalAptidao += individuo.aptidao;
    })
    return totalAptidao
  }

}

