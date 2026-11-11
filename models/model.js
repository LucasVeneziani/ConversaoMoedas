const URL_BASE = 'https://api.frankfurter.dev/v1';

function verificarResposta(resposta) {
  if (!resposta.ok) {
    const erro = new Error('Erro HTTP ' + resposta.status);
    erro.status = resposta.status;
    throw erro;
  }
}

function transformarEmLista(dados) {
  const lista = [];
  const codigos = Object.keys(dados);
  for (let i = 0; i < codigos.length; i++) {
    lista.push({ codigo: codigos[i], nome: dados[codigos[i]] });
  }
  return lista;
}

function obterTaxa(dados, destino) {
  if (!dados.rates) {
    throw new Error('Cotação indisponível');
  }
  const taxa = dados.rates[destino];
  if (typeof taxa !== 'number') {
    throw new Error('Cotação indisponível');
  }
  return taxa;
}

export async function buscarMoedas() {
  const resposta = await fetch(URL_BASE + '/currencies');
  verificarResposta(resposta);
  const dados = await resposta.json();
  return transformarEmLista(dados);
}

export async function converterValor(valor, origem, destino) {
  const endereco = URL_BASE + '/latest?base=' + origem + '&symbols=' + destino;
  const resposta = await fetch(endereco);
  verificarResposta(resposta);
  const dados = await resposta.json();
  const taxa = obterTaxa(dados, destino);
  return {
    valorConvertido: valor * taxa,
    taxa: taxa,
    data: dados.date,
  };
}
