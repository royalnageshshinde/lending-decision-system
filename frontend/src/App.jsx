import LoanForm from "./components/LoanForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <LoanForm />
      <ToastContainer />
    </>
  );
}

export default App;