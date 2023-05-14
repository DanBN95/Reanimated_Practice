import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import * as Haptics from 'expo-haptics';

import { SafeAreaView } from "react-native-safe-area-context";
import { Candle } from "./Model";
import Row from "./Row";
import Animated, { SharedValue, call, divide, floor, onChange, runOnJS, useCode, useDerivedValue } from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black"
  },
  table: {
    flexDirection: "row",
    padding: 16
  },
  date: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500"
  },
  column: {
    flex: 1
  },
  separator: {
    width: 16
  }
});

const formatValue = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

interface HeaderProps {
  caliber: number;
  candles: Candle[];
  candleIndex: SharedValue<number>;
}

export default ({ candles, caliber, candleIndex }: HeaderProps) => {
  const [{ date, open, close, high, low }, setCandle] = useState(candles[1]);
  const diff = `${((close - open) * 100) / open}`;
  const change = close - open < 0 ? diff.substring(0, 5) : diff.substring(0, 4);

  useDerivedValue(() => {
    const calIndex = Math.floor(candleIndex.value / caliber);
    const index = calIndex < 0 ? 0 : calIndex;
    runOnJS(setCandle)(candles[index]);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="Open" value={formatValue(open)} />
          <Row label="Close" value={formatValue(close)} />
          <Row label="Volume" value="" />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row label="High" value={formatValue(high)} />
          <Row label="Low" value={formatValue(low)} />
          <Row
            label="Change"
            value={`${change}%`}
            color={close - open > 0 ? "#4AFA9A" : "#E33F64"}
          />
        </View>
      </View>
      <Text style={styles.date}>
        {moment(date).format("h:mm MMM Do, YYYY")}
      </Text>
    </SafeAreaView>
  );
};
