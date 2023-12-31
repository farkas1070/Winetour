import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./EventsStyle";
import Card from "./components/Card";
import moment from "moment";
import { EventsContext } from "../../context/PointOfInterestContext.js";

const Events = () => {
  const [showListFirst, setShowListFirst] = useState(true);
  const [currentDate, setCurrentDate] = useState("2023-06-20");
  const [events, setEvents] = useContext(EventsContext);
  const [searchText, setSearchText] = useState("");

  function showDifferentLayout() {
    setShowListFirst(!showListFirst);
  }

  const filterItems = () => {
    return events.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  function getDatesInRange(startDate, endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    const dates = [];
    let currentDate = start.clone();

    while (currentDate.isSameOrBefore(end, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }

    return dates;
  }

  return (
    <View style={styles.maincontainer}>
      <View style={{ paddingRight: 10, flexDirection: "row" }}>
        <TouchableOpacity>
          <Ionicons
            name="calendar"
            size={30}
            color="black"
            style={{ marginRight: 20, marginTop: 20 }}
            onPress={() => {
              showDifferentLayout();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="list"
            size={30}
            color="black"
            style={{ marginTop: 20 }}
            onPress={() => {
              showDifferentLayout();
            }}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.textinput}
          placeholder="Keresés"
          placeholderTextColor="#000"
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
        />
      </View>
      {showListFirst ? (
        <ScrollView>
          {filterItems().map((item, index) => {
            return <Card item={item} index={index} key={index} />;
          })}
        </ScrollView>
      ) : (
        <Agenda
          selected={currentDate}
          items={events.reduce((acc, event) => {
            const { start_date, end_date, title, image } = event;
            const dateRange = getDatesInRange(start_date, end_date);
            dateRange.forEach((date) => {
              const formattedDate = moment(date).format("YYYY-MM-DD");
              if (!acc[formattedDate]) {
                acc[formattedDate] = [];
              }
              acc[formattedDate].push({
                name: title,
                image: image,
                start_date: start_date,
                end_date: end_date,
              });
            });
            return acc;
          }, {})}
          renderItem={(item, isFirst) => (
            <TouchableOpacity style={styles.item}>
              <View style={styles.card}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.dateText}>
                  {item.start_date} - {item.end_date}
                </Text>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          )}
          showClosingKnob={true}
          renderEmptyData={() => {
            return (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ textAlign: "center" }}>
                  Nincsenek események ezen a napon.
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Events;
