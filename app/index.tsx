
import { StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import {Message,Client,} from "paho-mqtt"
import { useEffect, useState } from 'react';

const clientId = "emqx_react_" + Math.random().toString(16).substring(2, 8);

const client = new Client("waee7215.ala.us-east-1.emqxsl.com",8084, clientId)





export default function App() {
  const [connected, setConnected]= useState(false)
  const [status,setStatus] = useState<"Aberto" | "Fechado" | "Entre Aberto" | "" | "Sem conexão">("")

  function onSuccess() {
    client.subscribe("portao")
    setConnected(true)
    notifyBroker("get_report")
  }
  
  function onFailure() {
    Alert.alert("Erro"," Falha na conexão com o broker"); 
    setConnected(false)
    setStatus("Sem conexão")
  }


  client.onMessageArrived = (message:Message)=>{
    switch (message.payloadString){
      case "open":
        setStatus("Aberto")
        break;
      case "closed":
        setStatus("Fechado")
        break;
      case "halfOpen":
        setStatus("Entre Aberto")
    }
  };
  
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
  

 
  function notifyBroker(msg:string){
    const message = new Message(msg)
    message.destinationName="portao"
    client.send(message);
  }



  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.statusArea}>
          <Text style={styles.text}>Status:</Text>
          <Text style={status==="Fechado"?styles.closed:styles.open}>{status}</Text>
        </View>
      </View>
      <View style={styles.main}>
      {connected&&
        <TouchableOpacity style={styles.button} onPress={()=>notifyBroker("acionado")}>
          <Text style={styles.botaoText}>Acionar portão</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection:"column"
  },
  main:{
    flex: 1,
    height:"80%"
  },
  topMenu:{
    flex: 1,
    flexDirection: "column",
    alignSelf:'flex-start',
    height:"20%"
  },
  button:{
    height: 60,
    padding:10,
    backgroundColor: "blue",
    borderRadius: 20,
    flexDirection: "row"
  },
  statusArea:{
    flex: 1,
    flexDirection:"row",
    width:"50%"
  },
  requestStatusArea:{

  },
  botaoText: {
    fontFamily: "outfit-extrabold",
    fontSize: 20,
    color: "#FFF",
  },
  text:{
    fontSize:20
  },
  open:{
    fontSize:20,
    color:"red"
  },
  closed:{
    fontSize:20,
    color:"green"
  }
})
