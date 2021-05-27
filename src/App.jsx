import { useSnakbar } from "./Context/SnakbarProvider";
import { NavBar } from "./Components/NavBar";
import { Snakbar } from "./Components/Snakbar";
import { Navigation } from "./Components/Navigation/Navigation";
import { ErrorModel } from "./Components/ErrorModel";
import { useStatus } from "./Context/LoaderProvider";
export default function App() {
  const { snakbarStatus } = useSnakbar();
  const { status } = useStatus();
  return (
    <main>
      <NavBar />
      <Navigation />
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
      <ErrorModel />
    </main>
  );
}
