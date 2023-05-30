import * as React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Data_1 = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [5, 45, 15, 8, 3, 14],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
};
const Data_2 = [
  {
    name: "Cancelled",
    population: 5,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Completed",
    population: 15,
    color: "#0F0",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Shipped",
    population: 3,
    color: "#00F",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Pending",
    population: 2,
    color: "#FF0",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "reviewed",
    population: 3,
    color: "#0FF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  withInnerLines: true,
};
const bckimage = require("../../../assets/bck3.jpg");

export default function Tech_Dashboard() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={bckimage} style={styles.image_bck_vew}>
        <View
          style={{
            backgroundColor: "#cca6ff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 17,
            opacity: 0.8,
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: 24,
              color: "blue",
              fontStyle: "italic",
            }}
          >
            Orders History
          </Text>
          <PieChart
            data={Data_2}
            width={375}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            // hasLegend={true}
            // legendBorderColor="blue"
            // legendBorderWidth={3}
          />
        </View>

        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 24,
            color: "blue",
            fontStyle: "italic",
          }}
        >
          Expenditures History
        </Text>
        <LineChart
          data={Data_1}
          width={380}
          height={220}
          yAxisLabel="Rs:"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#e26af0",
            backgroundGradientFrom: "#fb1cff",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 315, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  image_bck_vew: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
