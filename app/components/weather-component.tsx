'use client'

import React, { useEffect, useState} from 'react';
import { useRive } from 'rive-react';


export default function WeatherComponent({ weatherData }: { weatherData: WeatherData | null}) {
  // Component size state
  const [size, setSize] = useState({ width: 400, height: 400 });

  // Rive file configs
  const stateMachineName: string = "SM"; // State Machine title - set for the rive file
  const temperatureText: string = "temperature"; // Text title, set in the rive file - needed for changing temperature
  const highLowText: string = "highlow"; // Text title, set in the rive file - needed for changing high-low temperature text
  const conditionText: string = "conditions"; // Text title, set in the rive file - needed for changing fx. "clear" to "snowy"

  const { rive, RiveComponent } = useRive({
    artboard: "WeatherComponent",
    src: "rive/weather_widget.riv",
    stateMachines: stateMachineName,
    autoplay: true,
  });

  useEffect(() => {
    setSize({
      width: window.innerWidth / 2.5,
      height: window.innerWidth / 2.5 / 5 * 4,
    });
    if (rive && weatherData !== null) {
      rive.setTextRunValue(temperatureText, `${weatherData.temperature}°`);
      rive.setTextRunValue(highLowText, `h:${weatherData.high}° l:${weatherData.low}°`);
      rive.setTextRunValue(conditionText, `${weatherData.condition}`);
    }
  }, [rive, weatherData]);

  return (
    <RiveComponent style={size}/>
  );
}
