import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorFavoritas } from './src/contextos/ContextoFavoritas';
import { NavegadorPrincipal } from './src/navegacao/NavegadorPrincipal';

// Aqui eu junto as partes que precisam estar disponíveis no app inteiro:
// gestos, área segura do celular, favoritos compartilhados e navegação.
export default function Aplicativo() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ProvedorFavoritas>
          <NavegadorPrincipal />
        </ProvedorFavoritas>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
