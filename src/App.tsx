import { Toaster } from "./components/ui/sonner";
import "./index.css";
import { CustomersPage } from "./pages/CustomersPage";

function App() {
  return (
    <>
      <CustomersPage />
      <Toaster />
    </>
  );
}

export default App;
