import Header from "@/components/Header";
import { Stack } from "expo-router";


export default function RootLayout() {
  
  return <Stack screenOptions={
    { 
      headerShown: true,
    }}>
      <Stack.Screen options={{
          title: "Portão Automático",
        }}
        name="index"/>
    </Stack>
}
