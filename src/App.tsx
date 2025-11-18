import "./App.css";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";

export default function App() {
  return (
    <>
      <div className="p-10 text-3xl text-blue-500 font-bold">
        Tailwind 동작 확인!
      </div>

      <WeeklyForecast />
    </>
  );
}
