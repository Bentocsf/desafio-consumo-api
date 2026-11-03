import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavegadorPrincipal } from './src/navegacao/NavegadorPrincipal';

export default function Aplicativo() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavegadorPrincipal />
    </GestureHandlerRootView>
  );
}
