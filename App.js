import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function Aplicativo() {
  return (
    <View style={estilos.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
