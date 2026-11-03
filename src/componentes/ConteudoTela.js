import { StyleSheet, Text, View } from 'react-native';

export function ConteudoTela({ titulo, identificacao }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>
      <Text>{identificacao}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
