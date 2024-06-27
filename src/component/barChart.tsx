import React from 'react';
import { View } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

const data = [
  { month: 'Ene', value: 50 },
  { month: 'Feb', value: 60 },
  { month: 'Mar', value: 70 },
  { month: 'Abr', value: 65 },
  { month: 'May', value: 55 },
  { month: 'Jun', value: 75 },
];

const SimpleBarChart = () => {
  const barData = data.map(item => item.value);
  const labels = data.map(item => item.month);

  return (
    <View style={{ flexDirection: 'row', height: 300, paddingVertical: 16 }}>
      <YAxis
        data={barData}
        contentInset={{ top: 20, bottom: 20 }}
        svg={{ fontSize: 10, fill: 'grey' }}
        numberOfTicks={5}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <BarChart
          style={{ flex: 1 }}
          data={barData}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          contentInset={{ top: 30, bottom: 30 }}
        >
          <Grid />
        </BarChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={barData}
          formatLabel={(value, index) => labels[index]}
          contentInset={{ left: 30, right: 30 }}
          svg={{ fontSize: 10, fill: 'black' }}
        />
      </View>
    </View>
  );
};

export default SimpleBarChart;