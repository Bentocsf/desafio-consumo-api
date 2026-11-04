import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITAS = '@conversor-moedas/moedas-favoritas';

// Os favoritos ficam guardados no próprio celular.
export async function carregarMoedasFavoritas() {
  const dados = await AsyncStorage.getItem(CHAVE_FAVORITAS);
  return dados ? JSON.parse(dados) : [];
}

export async function salvarMoedasFavoritas(moedas) {
  await AsyncStorage.setItem(CHAVE_FAVORITAS, JSON.stringify(moedas));
}
