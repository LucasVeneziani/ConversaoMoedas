import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

function renderizarConteudo(resultado, aoFechar) {
  if (resultado === null) {
    return null;
  }
  return (
    <View style={styles.pagina}>
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
    </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cartao: {
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    borderColor: '#000',
    padding: 24,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  valorOriginal: {
    fontSize: 20,
    color: '#000',
  },
  equivale: {
    fontSize: 14,
    color: '#555',
    marginVertical: 6,
  },
  valorConvertido: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  separador: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#000',
    marginVertical: 20,
  },
  detalhe: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  botao: {
    alignSelf: 'stretch',
    backgroundColor: '#000',
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
