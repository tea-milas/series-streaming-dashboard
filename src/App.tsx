import "./global.css";
import SeriesProvider from "./context/SeriesContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Series from "./pages/Series/Series";
import SearchResults from "./pages/SearchResults/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <SeriesProvider>
        <Header />
        <main>
          <Routes>
            <Route path={"/"} element={<Dashboard />} />
            <Route path={"/series/:id"} element={<Series />} />
            <Route path={"/search-results"} element={<SearchResults />} />
          </Routes>
        </main>
        <Footer />
      </SeriesProvider>
    </BrowserRouter>
  );
}

export default App;
