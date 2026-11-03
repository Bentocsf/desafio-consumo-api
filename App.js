import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProvedorFavoritas } from './src/contextos/ContextoFavoritas';
import { NavegadorPrincipal } from './src/navegacao/NavegadorPrincipal';

export default function Aplicativo() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProvedorFavoritas>
        <NavegadorPrincipal />
      </ProvedorFavoritas>
    </GestureHandlerRootView>
  );
}
