import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { useState } from "react";
import Icon from "./Icon";

const options = ["Vegan", "Gluten-Free", "Dairy-Free", "Keto"];

export default function HorizontalMenu() {
  const [selected, setSelected] = useState<string[]>([]);
  const [chosen, setChosen] = useState(false);
  const [none, setNone] = useState(false);

  const handleNone = () => {
    setNone(true);
    setSelected([]);
    setChosen(false);
  };

  const handleSelect = (option: string) => {
    setNone(false);
    setChosen(false);
    if (option === "All") {
      setSelected([]);
      return;
    }
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  const handleCustomize = () => {
    setNone(false);
    setChosen((prev) => !prev);
    setSelected([]);
  };

  const isAllActive = selected.length === 0 && !chosen && !none;
  const isNoneActive = none;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <TouchableOpacity
          style={[styles.btn, isNoneActive && styles.btnActive]}
          onPress={handleNone}
        >
          <Text style={[styles.text, isNoneActive && styles.textActive]}>
            None
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, isAllActive && styles.btnActive]}
          onPress={() => handleSelect("All")}
        >
          <Text style={[styles.text, isAllActive && styles.textActive]}>
            All
          </Text>
        </TouchableOpacity>

        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.btn, selected.includes(option) && styles.btnActive]}
            onPress={() => handleSelect(option)}
          >
            <Text
              style={[
                styles.text,
                selected.includes(option) && styles.textActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.btn, styles.customizeBtn, chosen && styles.btnActive]}
          onPress={handleCustomize}
        >
          <Text style={[styles.text, chosen && styles.textActive]}>
            Customize
          </Text>
          <Icon name={chosen ? "close-outline" : "add-outline"} />
        </TouchableOpacity>
      </ScrollView>

      {chosen && (
        <View style={styles.dropdown}>
          <TextInput
            style={styles.input}
            placeholder="Specify your diet..."
            placeholderTextColor="#aaa"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F2F4F3",
  },
  customizeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
