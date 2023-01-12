import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Route";
import { ReactNotifications } from "react-notifications-component";
function App() {
  return (
    <>
      <BrowserRouter>
        <ReactNotifications />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
