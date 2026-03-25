import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginForm() {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>LogIn</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 10,
    padding: 30,
    borderRadius: 15,
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9927D",
  },

  input: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    fontSize: 15,
    width: "100%",
  },

  btn: {
    backgroundColor: "#F2F4F3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 10,
    alignItems: "center",
    width: "50%",
  },

  btnText: {
    fontSize: 15,
    fontWeight: "bold",
  }
});
