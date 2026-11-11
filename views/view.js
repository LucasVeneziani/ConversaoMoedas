import { useEffect } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';  
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import ResultView from './resultView';

function mostrarAlerta(titulo, mensagem) {



  if (typeof document !== 'undefined') {
    window.alert(titulo + '\n\n' + mensagem  ); 
    return;
  }
  Alert.alert(titulo, mensagem);


}

function renderizarItensMoedas(moedas) {



  return moedas.map(function ( moeda ) {


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
    return <Text style={styles.textoBotao}>Convertendo...</Text>;
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

    <LinearGradient colors={['#000000', '#0b1b4e']} style={styles.tela}>

      <View style={styles.cabecalho}>

        <Text style={styles.tituloCabecalho}>Conversor Moedas da FrankFurther</Text>

        <Text style={styles.descricaoCabecalho}>

          Converta valores entre diferentes moedas facilmente

        </Text>



      </View>



      <ScrollView contentContainerStyle={styles.conteudo}>
        
        <View style={styles.cartao}>

          <Text style={styles.rotulo}>Valor Monetário (pode ser decimal)</Text>


          <TextInput
            style={styles.campo}

            placeholder="exemplo: 150,00 "

            placeholderTextColor="#888"

            keyboardType="decimal-pad"

            value={viewModel.valor}

            onChangeText= { viewModel.setValor }

            editable= { !viewModel.carregando }


          />


          <View style= {styles.linhaMoedas } >


            <View style={styles.colunaMoedas}>


              <Text style={styles.rotulo}> De </Text>

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

              <Text style={styles.rotulo}> Para </Text>

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
        resultado={viewModel.resultado }
        aoFechar={viewModel.fecharResultado }
      />

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  tela: {
    flex: 1,
  },


  cabecalho: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 40,
  },


  subtituloCabecalho: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
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
    padding: 16,
  },


  rotulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 6,
    alignSelf: 'center',
  },


  campo: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#ffffff',
  },


  dica: {
    fontSize: 12,
    color: '#aaa',
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
    borderColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },


  seletor: {
    color: '#fff',
    backgroundColor: '#000',
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
    color: '#fff',
  },


  textoInverter: {
    fontSize: 12,
    color: '#fff',
  },


  botao: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 8
    
  },


  textoBotao: {
    color: '#b59f12',
    fontSize: 16,
    fontWeight: 'bolder',
  },


  textoErro: {
    color: '#fff',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  }

});
