import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function renderizarConteudo(resultado, aoFechar) {
  if (resultado === null) {
    return null;
  }
  return (
    <LinearGradient colors={['#000000', '#040a1c']} style={styles.pagina}>
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Resultado da conversão</Text>
        <Text style={styles.valorOriginal}>{resultado.valorOriginal}</Text>
        <Text style={styles.equivale}>equivalem a</Text>
        <Text style={styles.valorConvertido}>{resultado.valorConvertido}</Text>

        <View style={styles.separador} />

        <Text style={styles.detalhe}>Cotação: {resultado.taxa}</Text>
        <Text style={styles.detalhe}>Data da cotação: {resultado.data}</Text>

        <Pressable style={styles.botao} onPress={aoFechar}>
          <Text style={styles.textoBotao}>Nova conversão</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

export default function ResultView({ resultado, aoFechar }) {
  return (
    <Modal
      visible={resultado !== null}
      animationType="slide"
      onRequestClose={aoFechar}
    >
      {renderizarConteudo(resultado, aoFechar)}
    </Modal>
  );
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cartao: {
    width: '100%',
    maxWidth: 520,
    padding: 24,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  valorOriginal: {
    fontSize: 20,
    color: '#fff',
  },
  equivale: {
    fontSize: 14,
    color: '#aaa',
    marginVertical: 6,
  },
  valorConvertido: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  separador: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  detalhe: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  botao: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
