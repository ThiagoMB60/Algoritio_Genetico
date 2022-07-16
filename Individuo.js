// MOVIMENTOS:	200

// NORTE		0
// SUL		    1
// LESTE		2
// OESTE		3
// ALEATORIO	4
// PARADO		5
// CURVAR		6

export default class Individuo {
  constructor(id) {
    this.id = id + 1
    this.aptidao = 0
    this.movimentos = []
    this.posLinha = 1
    this.posColuna = 1
  }

  ExecutaMovimentos(mov, mundo) {
    let pontuacao = undefined;
    switch (mov) {
      case 0: // NORTE
        if (mundo[this.posLinha - 1][this.posColuna] == 2) {
          pontuacao = -5;
        } else {
          this.posLinha -= 1;
          pontuacao = 0;
        }
        break;
      case 1: // SUL
        if (mundo[this.posLinha + 1][this.posColuna] == 2) {
          pontuacao = -5;
        } else {
          this.posLinha += 1;
          pontuacao = 0;
        }
        break;
      case 2: // LESTE
        if (mundo[this.posLinha][this.posColuna + 1] == 2) {
          pontuacao = -5;
        } else {
          this.posColuna += 1;
          pontuacao = 0;
        }
        break;
      case 3: // OESTE
        if (mundo[this.posLinha][this.posColuna - 1] == 2) {
          pontuacao = -5;
        } else {
          this.posColuna -= 1;
          pontuacao = 0;
        }
        break;
      case 4: // ALEATORIO
        pontuacao = this.ExecutaMovimentos(Math.floor(Math.random() * (Math.floor(7) - Math.ceil(0))), mundo)
        break;
      case 5: // PARADO
        pontuacao = 0;
        break;
      case 6: // CURVAR	
        pontuacao = mundo[this.posLinha][this.posColuna] == 1 ? 10 : -1;
        break;
    }
    return pontuacao;
  }

  CalculaAptidao(mundo) {
    this.movimentos.forEach(mov => {

      this.aptidao += this.ExecutaMovimentos(mov, mundo);
    });
  }

  GeraMovimentos(totalMovimentos) {
    for (let i = 0; i < totalMovimentos; i++) {
      this.movimentos.push(
        Math.floor(Math.random() * (Math.floor(7) - Math.ceil(0)))
      );
    }
  }

}

