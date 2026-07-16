import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./appRoutes/AppRoutes";
import ChatbotWidget from "./components/ChatbotWidget";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ChatbotWidget />
    </BrowserRouter>
  );
}

export default App;