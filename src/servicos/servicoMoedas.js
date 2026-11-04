const URL_BASE = 'https://v6.exchangerate-api.com/v6';

// Guardo o endereço da API numa constante para montar os pedidos num padrão só.

// Uma checagem simples aqui evita repetir o mesmo aviso nas duas consultas.
function pegarChaveApi() {
  const chave = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_KEY;
  if (!chave) throw new Error('Configure a chave da API no arquivo .env.');
  return chave;
}

async function consultarApi(caminho) {
  // Essa função cuida da parte comum: buscar, ler e conferir a resposta.
  const resposta = await fetch(`${URL_BASE}/${pegarChaveApi()}/${caminho}`);
  if (!resposta.ok) throw new Error('Não foi possível consultar a ExchangeRate-API.');

  const dados = await resposta.json();
  if (dados.result !== 'success') throw new Error('A API não conseguiu concluir a consulta.');
  return dados;
}

export function validarValorConversao(texto) {
  // Também aceito vírgula, que é o separador decimal mais comum em português.
  const valor = Number(texto.trim().replace(',', '.'));
  if (!texto.trim() || !Number.isFinite(valor) || valor <= 0) {
    throw new Error('Digite um valor maior que zero.');
  }
  return valor;
}

export async function converterParMoedas(moedaOrigem, moedaDestino, valor) {
  // O endpoint pair recebe as duas moedas e o valor que quero converter.
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
  // A API devolve pares [código, nome]; transformo cada par num objeto mais claro.
  const dados = await consultarApi('codes');
  return dados.supported_codes.map(([codigo, nome]) => ({ codigo, nome }));
}
