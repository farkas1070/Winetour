import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";
import { styles } from "./WineriesStyle";
import Card from "./components/Card";
import { WineriesContext } from "../../context/GlobalContext.js";
import SearchBar from "./components/Search";
import Map from "../../views/map/Map.js";
import { Ionicons } from "@expo/vector-icons";
import FilterCarousel from "../map/components/FilterCarousel";
import Header from "./components/Header";

const Wineries = () => {
  const [wineries, setWineries] = useContext(WineriesContext);
  const [searchText, setSearchText] = useState("");
  const [showMap, setShowMap] = useState(false);

  const filterItems = () => {
    return wineries.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header setSearchText={setSearchText} />
      {showMap ? (
        <Map setShowMap={setShowMap} />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.maincontainer}>
            <ScrollView style={styles.scrollview}>
              {filterItems().map((item, index) => {
                return <Card item={item} index={index} key={index} />;
              })}
            </ScrollView>
            <TouchableOpacity
              style={styles.mapbutton}
              onPress={() => setShowMap(true)}
            >
              <Text>Map</Text>
              <Ionicons name="map" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

export default Wineries;
