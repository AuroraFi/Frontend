import "./App.css";
import { BuildType, OktoProvider } from "okto-sdk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/Home";

const OKTO_CLIENT_API_KEY = import.meta.env.VITE_OKTO_API_KEY;

function App() {
  return (
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <div className="bg-[#fbfbe4] text-[#151515] w-full">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </OktoProvider>
  );
}

export default App;
