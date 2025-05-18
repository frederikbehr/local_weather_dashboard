'use client'

import Image from "next/image";
import WeatherComponent from "./components/weather-component";
import { useState, useEffect } from "react";
import WeekdaySelector from "./components/weekday-selector";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null); // Weather data state
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // API Key for WeatherAPI.com
  const lat = 56.1518; // Latitude for Rosenkrantzgade 19B, 8000 Aarhus C
  const lon = 10.2064; // Longitude for Rosenkrantzgade 19B, 8000 Aarhus C

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });

  type WeatherData = {
    sunrise: string;
    sunset: string;
    temperature: number;
    high: number;
    low: number;
    condition: string;
  };

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`);
      const json = await res.json();

      const data: WeatherData[] = json.forecast.forecastday.map((day: any) => ({
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        temperature: day.day.avgtemp_c,   // average temp for the day
        high: day.day.maxtemp_c,
        low: day.day.mintemp_c,
        condition: day.day.condition.text,
      }));
      setWeatherData(data);
    }
    fetchWeather();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://www.betterdevelopers.dk"
        target="_blank"
      >
        <Image
          aria-hidden
          src="/bd-logo.webp"
          alt="www.betterdevelopers.dk"
          width={24}
          height={24}
        />
        www.betterdevelopers.dk
      </a>
      <div className="absolute bottom-0 w-full flex flex-col items-center gap-2">
        <WeekdaySelector onSelect={(date) => console.log(date)}/>
        <WeatherComponent/>
      </div>
    </div>
  );
}
