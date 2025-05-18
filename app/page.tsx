'use client'

import Image from "next/image";
import WeatherComponent from "./components/weather-component";
import { useState, useEffect } from "react";
import WeekdaySelector from "./components/weekday-selector";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null); // Weather data state
  const [selectedWeatherData, setselectedWeatherData] = useState<WeatherData | null>(null); // Selected weather data state
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // API Key for WeatherAPI.com
  const lat = 56.1518; // Latitude for Rosenkrantzgade 19B, 8000 Aarhus C
  const lon = 10.2064; // Longitude for Rosenkrantzgade 19B, 8000 Aarhus C

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&lang=da`);
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
      setselectedWeatherData(data[0]);
    }
    fetchWeather();
  }, []);

  function onSelectDate(date: Date) {
    if (!weatherData) return; // if weatherData isn't fetched yet, this function cannot work. 
    const now = new Date();
    const diffMs = date.getTime() - now.getTime(); // Gets difference in ms
    const daysUntil = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // using ceil, so it current date won't result in -1
    setselectedWeatherData(weatherData.at(daysUntil) || null);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <a
        className="flex items-center mt-8 gap-2 hover:underline hover:underline-offset-4"
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
        <h1 className="text-4xl font-bold mb-8">Hvordan er vejret på kontoret?</h1>
        <WeekdaySelector onSelect={onSelectDate}/> {/* selecter for the next 7 days including current date */}
        <WeatherComponent weatherData={selectedWeatherData}/> {/* shows the weather data for selected day */}
      </div>
    </div>
  );
}
