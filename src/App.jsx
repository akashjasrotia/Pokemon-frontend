import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import { Toaster } from "react-hot-toast";
import Cought from "./pages/cought";
function App() {
  return (
    <div>
      <Toaster position="top-left" 
      toastOptions={{
        style: {
          border: '2px solid black',
          padding: '16px',
          color: 'black',
          fontWeight:'bold',
          fontSize:'16px',
          backgroundColor:'yellow'
        }}}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cought" element={<Cought />} />
      </Routes>
    </div>
  );
}

export default App;
