import { Stack } from "expo-router";
import { AuthContext, AuthProvider } from "@/utils/authContext";
import { useContext } from "react";

export default function RootLayout() {
  const authState = useContext(AuthContext);

  return (
    <AuthProvider>
        <Stack>
          <Stack.Protected guard={authState.isLoggedIn}>
            <Stack.Screen
              name="protected"
              options={{
                headerShown: false,
                animation: "none",
              }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!authState.isLoggedIn}>
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="create-account" />
          </Stack.Protected>
      </Stack>
    </AuthProvider>
  );
};