import { Stack } from "expo-router";
import { ThemeProvider} from "@/context/themeContext";

function AppLayout() {

  return (
 
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="parole" />
        <Stack.Screen name="admin" />
        <Stack.Screen name="ajout" />
        <Stack.Screen name="suppression" />
      </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}
