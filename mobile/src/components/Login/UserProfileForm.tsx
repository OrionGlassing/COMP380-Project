import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import HorizontalMenu from "../ui/HorizontalMenu";
import Icon from "../ui/Icon";
import { useState } from "react";
import Divider from "../ui/Divider";
import Button from "../ui/Button";

export default function UserProfileForm() {
  const [allergyNone, setAllergyNone] = useState(false);
  const [add, setAdd] = useState(false);

  const handleSave = () => {};
  return (
    <ScrollView>
      <Divider>DIET & RESTRICTIONS</Divider>
      <Text>Select your diet:</Text>
      <HorizontalMenu />
      <Text>Food allergies?</Text>
      <View>
        <TouchableOpacity
          style={[styles.btn, allergyNone && styles.btnActive]}
          onPress={() => {
            setAllergyNone(true);
            setAdd(false);
          }}
        >
          <Text style={[styles.text, allergyNone && styles.textActive]}>
            None
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, add && styles.btnActive]}
          onPress={() => {
            setAdd(!add);
            setAllergyNone(false);
          }}
        >
          <Icon name="add-outline" />
          <Text style={[styles.text, add && styles.textActive]}>Add</Text>
        </TouchableOpacity>
        {add && (
          <View style={styles.dropdown}>
            <TextInput
              style={styles.input}
              placeholder="Specify your allergies..."
              placeholderTextColor="#aaa"
            />
          </View>
        )}
      </View>
      <Divider>Food Preferences</Divider>
      <Text>Describe some ingredients you love: </Text>
      <TextInput
        style={styles.input}
        placeholder="Specify ingredients..."
        placeholderTextColor="#aaa"
      />
      <Text>Describe some ingredients you hate:</Text>
      <TextInput
        style={styles.input}
        placeholder="Specify ingredients..."
        placeholderTextColor="#aaa"
      />
      <Text>Preferred Spice Level</Text>
      {/* options work in progress */}
      <Divider>Cooking</Divider>
      <Text>Experience Level:</Text>
      <Text>Select available kitchen tools: </Text>
      <Button label={"Exit"} onPress={() => {}}></Button>
      <Button label={"Save and Exit"} onPress={handleSave}></Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F2F4F3",
  },

  btnActive: {
    backgroundColor: "#1D2D44",
  },
  text: {
    color: "black",
    fontSize: 14,
  },
  textActive: {
    color: "white",
    fontWeight: "bold",
  },

  dropdown: {
    position: "absolute",
    top: 55,
    right: 15,
    zIndex: 100,
    backgroundColor: "#F2F4F3",
    borderRadius: 15,
    padding: 10,
    width: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  input: {
    fontSize: 14,
    color: "black",
    paddingHorizontal: 5,
  },
});
