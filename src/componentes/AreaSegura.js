import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../estilos/cores';

export function AreaSegura({ children, bordas = ['left', 'right'] }) {
  // Cabeçalho e barra de abas do React Navigation já reservam topo e base.
  return (
    <SafeAreaView edges={bordas} style={estilos.container}>
      {children}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },
});
