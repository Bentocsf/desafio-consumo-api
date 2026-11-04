import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../estilos/cores';

// Reaproveito essa moldura para o conteúdo não ficar embaixo das bordas do celular.
export function AreaSegura({ children, bordas = ['left', 'right'] }) {
  // O cabeçalho e as abas cuidam do topo e da base; aqui protejo as laterais.
  return (
    <SafeAreaView edges={bordas} style={estilos.container}>
      {children}
    </SafeAreaView>
  );
}

// Essa área ocupa a tela toda e usa o fundo padrão do aplicativo.
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
  },
});
