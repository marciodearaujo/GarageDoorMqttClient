import { View, Text,TouchableOpacity, StyleSheet } from "react-native";

// interface Props{
//     notifyBroker:(msg:string)=>void,
//     status:string
// }

export default function Header(){
    return(

        <View style={styles.container}>
            <View style={styles.statusArea}>
                <Text>Status:</Text>
                <Text >Teste</Text>
            </View>
            {/* <TouchableOpacity style={styles.requestStatus} onPress={()=>notifyBroker("get_report")}>
                <Text style={styles.botaoText}>Requisitar status</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    statusArea:{

    },
    statusOpen:{
    fontSize:30,
    color:"green",
  },
  statusClosed:{
    fontSize:30,
    color:"red"
  },
  statusHalfOpen:{
    fontSize:30,
    color:"yellow"
  }
})