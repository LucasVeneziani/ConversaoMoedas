import { useEffect, useState } from 'react';
import { buscarMoedas, converterValor } from '../models/model';

const MOEDAS_INICIAIS = [
  { codigo: 'BRL', nome: 'Brazilian Real' },
  { codigo: 'USD', nome: 'United States Dollar' },
];

function lerValor(texto) {
  const textoLimpo = texto.trim().replace(',', '.');
  if (textoLimpo === '') {
    return NaN;
  }
  return Number(textoLimpo);
}

function validar(texto, origem, destino) {
  if (texto.trim() === '') {
    return 'Informe o valor que deseja converter.';
  }
  const numero = lerValor(texto);
  if (isNaN(numero)) {
    return 'Informe um valor numérico válido.';
  }
  if (numero <= 0) {
    return 'O valor precisa ser maior que zero.';
  }
  if (origem === destino) {
    return 'Escolha moedas de origem e destino diferentes.';
  }
  return '';
}

function arredondar(numero) {
  return Math.round(numero * 100) / 100;
}

function formatarNumero(numero, casas) {
  return numero.toFixed(casas).replace('.', ',');
}

function formatarData(dataIso) {
  const partes = dataIso.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function criarAlertaDeErro(erro, mensagem) {
  if (erro.status) {
    return {
      titulo: 'Erro HTTP ' + erro.status,
      mensagem: mensagem + ' O servidor respondeu com o código ' + erro.status + '.',
    };
  }
  return {
    titulo: 'Erro',
    mensagem: mensagem + ' Verifique sua conexão e tente novamente.',
  };
}

export default function useConversaoViewModel() {
  const [valor, setValor] = useState('');
  const [moedas, setMoedas] = useState(MOEDAS_INICIAIS);
  const [origem, setOrigem] = useState('USD');
  const [destino, setDestino] = useState('BRL');
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erroConversao, setErroConversao] = useState('');
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    carregarMoedas();
  }, []);

  async function carregarMoedas() {
    try {
      const lista = await buscarMoedas();
      setMoedas(lista);
    } catch (erro) {
      setAlerta(criarAlertaDeErro(erro, 'Não foi possível carregar a lista de moedas.'));
    }
  }

  function inverterMoedas() {
    const origemAnterior = origem;
    setOrigem(destino);
    setDestino(origemAnterior);
  }

  async function converter() {
    const mensagemValidacao = validar(valor, origem, destino);
    if (mensagemValidacao !== '') {
      setAlerta({ titulo: 'Dados inválidos', mensagem: mensagemValidacao });
      return;
    }

    setCarregando(true);
    setErroConversao('');

    try {
      const numero = lerValor(valor);
      const conversao = await converterValor(numero, origem, destino);
      setResultado({
        valorOriginal: formatarNumero(arredondar(numero), 2) + ' ' + origem,
        valorConvertido: formatarNumero(arredondar(conversao.valorConvertido), 2) + ' ' + destino,
        taxa: '1 ' + origem + ' = ' + formatarNumero(conversao.taxa, 4) + ' ' + destino,
        data: formatarData(conversao.data),
      });
    } catch (erro) {
      setErroConversao('Não foi possível obter o valor da conversão.');
      setAlerta(criarAlertaDeErro(erro, 'Não foi possível obter o valor da conversão.'));
    } finally {
      setCarregando(false);
    }
  }

  function fecharResultado() {
    setResultado(null);
  }

  function limparAlerta() {
    setAlerta(null);
  }

  return {
    valor,
    setValor,
    moedas,
    origem,
    setOrigem,
    destino,
    setDestino,
    carregando,
    resultado,
    erroConversao,
    alerta,
    inverterMoedas,
    converter,
    fecharResultado,
    limparAlerta,
  };
}
