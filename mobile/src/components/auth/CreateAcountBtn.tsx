import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface Props{
  onPress: () => void;
}
export default function CreateAccountBtn({onPress}: Props){
    return <TouchableOpacity
          style={styles.container}
          onPress={onPress}
        >
          <Text style={styles.text}>Create New Account</Text>
        </TouchableOpacity>
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F4F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
});