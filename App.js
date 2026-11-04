import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorFavoritas } from './src/contextos/ContextoFavoritas';
import { NavegadorPrincipal } from './src/navegacao/NavegadorPrincipal';

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
