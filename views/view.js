import { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ResultView from './resultView';

function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(titulo + '\n\n' + mensagem);
    return;
  }
  Alert.alert(titulo, mensagem);
}

function renderizarItensMoedas(moedas) {
  return moedas.map(function (moeda) {
    return (
      <Picker.Item
        key={moeda.codigo}
        label={moeda.codigo + ' - ' + moeda.nome}
        value={moeda.codigo}
      />
    );
  });
}

function renderizarConteudoBotao(carregando) {
  if (carregando) {
    return (
      <View style={styles.linhaCarregando}>
        <ActivityIndicator color="#fff" />
        <Text style={styles.textoBotao}>Convertendo...</Text>
      </View>
    );
  }
  return <Text style={styles.textoBotao}>Converter valor</Text>;
}

function renderizarErro(erroConversao) {
  if (erroConversao === '') {
    return null;
  }
  return <Text style={styles.textoErro}>{erroConversao}</Text>;
}

export default function ConversaoView({ viewModel }) {
  useEffect(() => {
    if (viewModel.alerta !== null) {
      mostrarAlerta(viewModel.alerta.titulo, viewModel.alerta.mensagem);
      viewModel.limparAlerta();
    }
  }, [viewModel.alerta]);

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <Text style={styles.subtituloCabecalho}>CÂMBIO · FRANKFURTER</Text>
        <Text style={styles.tituloCabecalho}>Conversor de moedas</Text>
        <Text style={styles.descricaoCabecalho}>
          Consulte taxas de referência e converta seus valores.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cartao}>
          <Text style={styles.rotulo}>Valor</Text>
          <TextInput
            style={styles.campo}
            placeholder="Ex.: 150,00"
            placeholderTextColor="#888"
            keyboardType="decimal-pad"
            value={viewModel.valor}
            onChangeText={viewModel.setValor}
            editable={!viewModel.carregando}
          />
          <Text style={styles.dica}>Use ponto ou vírgula para separar os centavos.</Text>

          <View style={styles.linhaMoedas}>
            <View style={styles.colunaMoedas}>
              <Text style={styles.rotulo}>De</Text>
              <View style={styles.caixaSeletor}>
                <Picker
                  style={styles.seletor}
                  selectedValue={viewModel.origem}
                  onValueChange={viewModel.setOrigem}
                  enabled={!viewModel.carregando}
                >
                  {renderizarItensMoedas(viewModel.moedas)}
                </Picker>
              </View>

              <Text style={styles.rotulo}>Para</Text>
              <View style={styles.caixaSeletor}>
                <Picker
                  style={styles.seletor}
                  selectedValue={viewModel.destino}
                  onValueChange={viewModel.setDestino}
                  enabled={!viewModel.carregando}
                >
                  {renderizarItensMoedas(viewModel.moedas)}
                </Picker>
              </View>
            </View>

            <Pressable
              style={styles.botaoInverter}
              onPress={viewModel.inverterMoedas}
              disabled={viewModel.carregando}
            >
              <Text style={styles.setas}>⇅</Text>
              <Text style={styles.textoInverter}>Inverter</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.botao}
            onPress={viewModel.converter}
            disabled={viewModel.carregando}
          >
            {renderizarConteudoBotao(viewModel.carregando)}
          </Pressable>

          {renderizarErro(viewModel.erroConversao)}
        </View>
      </ScrollView>

      <ResultView
        resultado={viewModel.resultado}
        aoFechar={viewModel.fecharResultado}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cabecalho: {
    backgroundColor: '#000',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: Platform.select({ web: 12, default: 48 }),
  },
  subtituloCabecalho: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  tituloCabecalho: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  descricaoCabecalho: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  conteudo: {
    padding: 16,
    alignItems: 'center',
  },
  cartao: {
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    borderColor: '#000',
    padding: 16,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 12,
    marginBottom: 6,
  },
  campo: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  dica: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  linhaMoedas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colunaMoedas: {
    flex: 1,
  },
  caixaSeletor: {
    borderWidth: 1,
    borderColor: '#000',
  },
  seletor: {
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 0,
    padding: 10,
    fontSize: 15,
  },
  botaoInverter: {
    width: 72,
    marginLeft: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  setas: {
    fontSize: 32,
    color: '#000',
  },
  textoInverter: {
    fontSize: 12,
    color: '#000',
  },
  botao: {
    backgroundColor: '#000',
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  linhaCarregando: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoErro: {
    color: '#000',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
});
