import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import { useUserSync } from "./hooks/useUserSync";

function App() {
  useUserSync();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;