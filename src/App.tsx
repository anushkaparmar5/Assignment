import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="container mx-auto">
            {" "}
            <Navbar />{" "}
          </div>
          <main
            className="container mx-auto main-content"
            style={{ paddingTop: "80px" }}
          >
            <Routes>
              <Route path="/" element={<ProductsList />} />
              <Route path="/product" element={<ProductsList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
