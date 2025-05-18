'use client'

import React, { useEffect, useState} from 'react';
import { useRive, useStateMachineInput } from 'rive-react';


export default function WeatherComponentBasic({ weatherData }: { weatherData: WeatherData | null}) {
  // Component size state
  const [size, setSize] = useState({ width: 400, height: 160 });

  // Rive file configs
  const stateMachineName: string = "SM"; // State Machine title - set for the rive file
  const temperatureText: string = "t_degree_num"; // Text title - needed for changing temperature
  const conditionsText: string = "t_condition"; // Text title - needed for changing condition text, eg. sunny
  const timeHourText: string = "t_hour"; // Text title - needed for changing hourly time. eg. XX:00
  const timeMinuteText: string = "t_minute"; // Text title - needed for changing minute time. eg. 16:XX
  const timeMonthText: string = "t_month"; // Text title - needed for changing displayed month. eg. January
  const timeDayText: string = "t_day"; // Text title - needed for changing displayed month. eg. January

  const { rive, RiveComponent } = useRive({
    artboard: "WeatherWidget",
    src: "rive/weather_widget_basic.riv",
    stateMachines: stateMachineName,
    autoplay: true,
  });

  const conditionsValue = useStateMachineInput(rive, stateMachineName, 'weather_condition');

  function updateConditionsNumber(value: number) {
    if (conditionsValue) {
      conditionsValue.value = value;
    }
  }

  function conditionToConditionNumber(condition: string): number {
    condition = condition.toLowerCase();
    if (condition.includes("regn")) return 3;
    if (condition.includes("storm") || condition.includes("torden")) return 4;
    if (condition.includes("sne") || condition.includes("slud")) return 2;
    return 1;
  }

  useEffect(() => {
    setSize({
      width: Math.min(window.innerWidth * 0.9, 400),
      height: Math.min(window.innerWidth * 0.9, 400) / 5 * 2.5,
    });
    if (rive && weatherData !== null) {
      const now = new Date();
      now.setDate(now.getDate() + weatherData.index);
      rive.setTextRunValue(temperatureText, weatherData.temperature.toFixed(0));
      rive.setTextRunValue(conditionsText, weatherData.condition);
      rive.setTextRunValue(timeHourText, now.getHours().toFixed(0));
      rive.setTextRunValue(timeMinuteText, now.getMinutes().toFixed(0));
      rive.setTextRunValue(timeMonthText, now.toLocaleString('default', { month: 'long' }));
      rive.setTextRunValue(timeDayText, now.getDate().toFixed(0));
      updateConditionsNumber(conditionToConditionNumber(weatherData.condition));
    }
  }, [rive, weatherData]);

  return (
    <RiveComponent style={size}/>
  );
}
