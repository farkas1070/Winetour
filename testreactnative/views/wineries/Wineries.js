import {
  View,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useContext } from "react";
import { styles } from "./WineriesStyle";
import Card from "./components/Card";
import { WineriesContext } from "../../context/PointOfInterestContext.js";

const Wineries = () => {
  const [wineries, setWineries] = useContext(WineriesContext);
  const [searchText, setSearchText] = useState("");

  const filterItems = () => {
    return wineries.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.maincontainer}>
        <TextInput
          style={styles.textinput}
          placeholder="Keresés"
          placeholderTextColor="#000"
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
        />
        <ScrollView style={styles.scrollview}>
          {filterItems().map((item, index) => {
            return <Card item={item} index={index} key={index} />;
          })}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Wineries;
