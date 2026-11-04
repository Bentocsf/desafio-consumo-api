import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { cores } from '../estilos/cores';

// Criei um seletor com busca porque a lista de moedas é bem comprida.
export function SeletorMoeda({ rotulo, valor, moedas, aoSelecionar }) {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState('');
  // Encontro o nome completo para mostrar algo mais amigável que só o código.
  const moedaSelecionada = moedas.find((moeda) => moeda.codigo === valor);
  // A lista é filtrada pelo código ou pelo nome digitado.
  const moedasFiltradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase();
    if (!termo) return moedas;
    return moedas.filter((moeda) =>
      moeda.codigo.toLocaleLowerCase().includes(termo) || moeda.nome.toLocaleLowerCase().includes(termo),
    );
  }, [busca, moedas]);

  return (
    <View style={estilos.container}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: aberto }}
        onPress={() => setAberto(!aberto)}
        style={estilos.selecao}
      >
        <Text style={estilos.valor}>
          {moedaSelecionada ? `${moedaSelecionada.codigo} — ${moedaSelecionada.nome}` : 'Selecione uma moeda'}
        </Text>
        <Text style={estilos.seta}>{aberto ? '⌃' : '⌄'}</Text>
      </Pressable>
      {aberto && (
        <View style={estilos.opcoes}>
          <TextInput
            accessibilityLabel={`Buscar ${rotulo.toLocaleLowerCase()}`}
            onChangeText={setBusca}
            placeholder="Buscar por código ou nome"
            placeholderTextColor={cores.cinzaTexto}
            style={estilos.busca}
            value={busca}
          />
          <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled" style={estilos.listaOpcoes}>
            {moedasFiltradas.length ? moedasFiltradas.map((moeda) => (
              <Pressable
                key={moeda.codigo}
                accessibilityRole="button"
                onPress={() => {
                  aoSelecionar(moeda.codigo);
                  setAberto(false);
                  setBusca('');
                }}
                style={estilos.opcao}
              >
                <Text style={estilos.textoOpcao}>{moeda.codigo} — {moeda.nome}</Text>
              </Pressable>
            )) : <Text style={estilos.semResultados}>Nenhuma moeda encontrada.</Text>}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// Estilos do campo e da lista suspensa de opções.
const estilos = StyleSheet.create({
  container: {
    gap: 7,
  },
  rotulo: {
    color: cores.preto,
    fontSize: 14,
    fontWeight: '600',
  },
  selecao: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: cores.cinzaBorda,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  valor: {
    color: cores.preto,
    fontSize: 15,
  },
  seta: {
    color: cores.cinzaTexto,
    fontSize: 20,
  },
  opcoes: {
    borderWidth: 1,
    borderColor: cores.cinzaBorda,
    borderRadius: 6,
    backgroundColor: cores.branco,
  },
  busca: {
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: cores.cinzaBorda,
    color: cores.preto,
    paddingHorizontal: 12,
  },
  listaOpcoes: {
    maxHeight: 220,
  },
  opcao: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  textoOpcao: {
    color: cores.preto,
    fontSize: 15,
  },
  semResultados: {
    color: cores.cinzaTexto,
    padding: 12,
  },
});
