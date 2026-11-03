import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavegadorAbas } from './NavegadorAbas';
import { TelaInicio } from '../telas/TelaInicio';
import { TelaSobre } from '../telas/TelaSobre';

const MenuLateral = createDrawerNavigator();

export function NavegadorPrincipal() {
  return (
    <NavigationContainer>
      <MenuLateral.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#17324D' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '600' },
          drawerActiveTintColor: '#17324D',
          drawerActiveBackgroundColor: '#EAF0F5',
          drawerInactiveTintColor: '#1F2933',
          drawerStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <MenuLateral.Screen
          name="Inicio"
          component={TelaInicio}
          options={{ title: 'Início' }}
        />
        <MenuLateral.Screen
          name="Sobre"
          component={TelaSobre}
          options={{ title: 'Sobre' }}
        />
        <MenuLateral.Screen
          name="Moedas"
          component={NavegadorAbas}
          options={{ title: 'Moedas' }}
        />
      </MenuLateral.Navigator>
    </NavigationContainer>
  );
}
