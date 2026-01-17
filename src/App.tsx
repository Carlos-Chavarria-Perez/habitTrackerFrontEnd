import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashbord from "./pages/Dashbord";
import CreateHabit from "./pages/CreateHabit";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateLayout from "./components/PrivateLayout";
import Map from "./components/Map";
import UpdateHabit from "./pages/UpdateHabit";

function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PrivateLayout>
                  <Dashbord />
                </PrivateLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/createhabit"
            element={
              <ProtectedRoute>
                <PrivateLayout>
                  <CreateHabit />
                </PrivateLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:habit_id"
            element={
              <ProtectedRoute>
                <PrivateLayout>
                  <UpdateHabit />
                </PrivateLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <PrivateLayout>
                  <Map />
                </PrivateLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
