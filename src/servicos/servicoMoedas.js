const URL_BASE = 'https://v6.exchangerate-api.com/v6';

export function validarValorConversao(texto) {
  if (!texto || !texto.trim()) {
    throw new Error('Informe um valor para converter.');
  }

  const textoNormalizado = texto.trim().replace(',', '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(textoNormalizado)) {
    throw new Error('Informe um valor numérico válido.');
  }

  const valor = Number(textoNormalizado);

  if (!Number.isFinite(valor) || valor <= 0) {
    throw new Error('Informe um valor numérico maior que zero.');
  }

  return valor;
}

export async function converterParMoedas(moedaOrigem, moedaDestino, valor) {
  const chaveApi = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_KEY;

  if (!chaveApi) {
    throw new Error('Chave da API não configurada. Defina EXPO_PUBLIC_EXCHANGE_RATE_API_KEY no arquivo .env.');
  }

  let resposta;

  try {
    resposta = await fetch(
      `${URL_BASE}/${chaveApi}/pair/${encodeURIComponent(moedaOrigem)}/${encodeURIComponent(moedaDestino)}/${encodeURIComponent(String(valor))}`,
    );
  } catch {
    throw new Error('Não foi possível conectar à ExchangeRate-API. Verifique sua conexão e tente novamente.');
  }

  if (!resposta.ok) {
    throw new Error(`A conversão falhou (HTTP ${resposta.status}).`);
  }

  let dados;

  try {
    dados = await resposta.json();
  } catch {
    throw new Error('A resposta da ExchangeRate-API não pôde ser lida.');
  }

  if (dados.result !== 'success') {
    const tipoErro = dados['error-type'] ? ` (${dados['error-type']})` : '';
    throw new Error(`A ExchangeRate-API retornou um erro${tipoErro}.`);
  }

  if (
    typeof dados.conversion_rate !== 'number' || !Number.isFinite(dados.conversion_rate) ||
    typeof dados.conversion_result !== 'number' || !Number.isFinite(dados.conversion_result)
  ) {
    throw new Error('A resposta da ExchangeRate-API não contém um resultado válido.');
  }

  return {
    valorOriginal: valor,
    moedaOrigem: dados.base_code,
    moedaDestino: dados.target_code,
    valorConvertido: dados.conversion_result,
    taxaConversao: dados.conversion_rate,
  };
}

export async function buscarMoedas() {
  const chaveApi = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_KEY;

  if (!chaveApi) {
    throw new Error('Chave da API não configurada. Defina EXPO_PUBLIC_EXCHANGE_RATE_API_KEY no arquivo .env.');
  }

  let resposta;

  try {
    resposta = await fetch(`${URL_BASE}/${chaveApi}/codes`);
  } catch {
    throw new Error('Não foi possível conectar à ExchangeRate-API. Verifique sua conexão e tente novamente.');
  }

  if (!resposta.ok) {
    throw new Error(`A consulta de moedas falhou (HTTP ${resposta.status}).`);
  }

  let dados;

  try {
    dados = await resposta.json();
  } catch {
    throw new Error('A resposta da ExchangeRate-API não pôde ser lida.');
  }

  if (dados.result !== 'success') {
    const tipoErro = dados['error-type'] ? ` (${dados['error-type']})` : '';
    throw new Error(`A ExchangeRate-API retornou um erro${tipoErro}.`);
  }

  if (!Array.isArray(dados.supported_codes)) {
    throw new Error('A resposta da ExchangeRate-API não contém uma lista válida de moedas.');
  }

  return dados.supported_codes.map((item) => {
    if (!Array.isArray(item) || typeof item[0] !== 'string' || typeof item[1] !== 'string') {
      throw new Error('A resposta da ExchangeRate-API contém uma moeda em formato inválido.');
    }

    return { codigo: item[0], nome: item[1] };
  });
}
