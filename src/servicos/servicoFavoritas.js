import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITAS = '@conversor-moedas/moedas-favoritas';

function removerDuplicadas(moedas) {
  const codigosVistos = new Set();

  return moedas.filter((moeda) => {
    if (!moeda || typeof moeda.codigo !== 'string' || typeof moeda.nome !== 'string') {
      return false;
    }

    if (codigosVistos.has(moeda.codigo)) {
      return false;
    }

    codigosVistos.add(moeda.codigo);
    return true;
  });
}

export async function carregarMoedasFavoritas() {
  const dadosSalvos = await AsyncStorage.getItem(CHAVE_FAVORITAS);

  if (!dadosSalvos) {
    return [];
  }

  try {
    const moedasSalvas = JSON.parse(dadosSalvos);
    return Array.isArray(moedasSalvas) ? removerDuplicadas(moedasSalvas) : [];
  } catch {
    return [];
  }
}

export async function salvarMoedasFavoritas(moedas) {
  const moedasSemDuplicadas = removerDuplicadas(moedas);
  await AsyncStorage.setItem(CHAVE_FAVORITAS, JSON.stringify(moedasSemDuplicadas));
}
