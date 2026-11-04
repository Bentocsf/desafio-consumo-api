import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITAS = '@conversor-moedas/moedas-favoritas';

// Os favoritos ficam guardados no próprio celular.
export async function carregarMoedasFavoritas() {
  // Se não houver nada salvo ainda, devolvo uma lista vazia para começar.
  const dados = await AsyncStorage.getItem(CHAVE_FAVORITAS);
  return dados ? JSON.parse(dados) : [];
}

export async function salvarMoedasFavoritas(moedas) {
  // O AsyncStorage só salva texto, então converto a lista para JSON.
  await AsyncStorage.setItem(CHAVE_FAVORITAS, JSON.stringify(moedas));
}
