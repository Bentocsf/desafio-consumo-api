import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores } from '../estilos/cores';

export function SeletorMoeda({ rotulo, valor, moedas, aoSelecionar }) {
  const [aberto, setAberto] = useState(false);
  const moedaSelecionada = moedas.find((moeda) => moeda.codigo === valor);

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
          {moedaSelecionada.codigo} — {moedaSelecionada.nome}
        </Text>
        <Text style={estilos.seta}>{aberto ? '⌃' : '⌄'}</Text>
      </Pressable>
      {aberto && (
        <View style={estilos.opcoes}>
          {moedas.map((moeda) => (
            <Pressable
              key={moeda.codigo}
              accessibilityRole="button"
              onPress={() => {
                aoSelecionar(moeda.codigo);
                setAberto(false);
              }}
              style={estilos.opcao}
            >
              <Text style={estilos.textoOpcao}>
                {moeda.codigo} — {moeda.nome}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

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
  opcao: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  textoOpcao: {
    color: cores.preto,
    fontSize: 15,
  },
});
