
import { StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import {Message,Client} from "paho-mqtt"
import { useEffect, useState } from 'react';

const clientId = "emqx_react_" + Math.random().toString(16).substring(2, 8);

const client = new Client("waee7215.ala.us-east-1.emqxsl.com",8084, clientId)


export default function App() {
  const [connected, setConnected]= useState(false)

  function onSuccess() {
    client.subscribe("portao")
    setConnected(true)
  }
  
  function onFailure() {
    Alert.alert("Erro"," Falha na conexão com o broker"); 
    setConnected(false)
  }
  
  useEffect(()=>{
    client.connect({
      onSuccess:onSuccess,
      onFailure: onFailure,
      useSSL: true,
      userName: process.env.EXPO_PUBLIC_NAME,
      password: process.env.EXPO_PUBLIC_PASSWORD
    });
    return () => {
      client.disconnect();
    };
  },[])
  

 
  function notifyBroker(){
    const message = new Message("acionado")
    message.destinationName="portao"
    client.send(message);
  }

  return (
    <View style={styles.container}>
      {connected&&<TouchableOpacity style={styles.portao} onPress={()=>notifyBroker()}>
        <Text style={styles.botaoText}>Acionar portão</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portao:{
    width: "80%",
    height: 60,
    backgroundColor: "blue",
    marginTop: 24,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
    
  },
  botaoText: {
    fontFamily: "outfit-extrabold",
    fontSize: 20,
    color: "#FFF",
  },
});
