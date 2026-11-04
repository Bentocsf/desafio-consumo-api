const URL_BASE = 'https://v6.exchangerate-api.com/v6';

// Uma checagem simples aqui evita repetir o mesmo aviso nas duas consultas.
function pegarChaveApi() {
  const chave = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_KEY;
  if (!chave) throw new Error('Configure a chave da API no arquivo .env.');
  return chave;
}

async function consultarApi(caminho) {
  const resposta = await fetch(`${URL_BASE}/${pegarChaveApi()}/${caminho}`);
  if (!resposta.ok) throw new Error('Não foi possível consultar a ExchangeRate-API.');

  const dados = await resposta.json();
  if (dados.result !== 'success') throw new Error('A API não conseguiu concluir a consulta.');
  return dados;
}

export function validarValorConversao(texto) {
  const valor = Number(texto.trim().replace(',', '.'));
  if (!texto.trim() || !Number.isFinite(valor) || valor <= 0) {
    throw new Error('Digite um valor maior que zero.');
  }
  return valor;
}

export async function converterParMoedas(moedaOrigem, moedaDestino, valor) {
  const dados = await consultarApi(
    `pair/${moedaOrigem}/${moedaDestino}/${encodeURIComponent(valor)}`,
  );

  return {
    valorOriginal: valor,
    moedaOrigem: dados.base_code,
    moedaDestino: dados.target_code,
    valorConvertido: dados.conversion_result,
    taxaConversao: dados.conversion_rate,
  };
}

export async function buscarMoedas() {
  const dados = await consultarApi('codes');
  return dados.supported_codes.map(([codigo, nome]) => ({ codigo, nome }));
}
