import { useSnakbarContext } from "./Context/SnakbarContext";
import { NavBar } from "./Components/NavBar";
import { Snakbar } from "./Components/Snakbar";
import { Navigation } from "./Components/Navigation/Navigation";
import { ErrorModel } from "./Components/ErrorModel";
import { useStatus } from "./Context/LoaderContext";
export default function App() {
  const { snakbarStatus } = useSnakbarContext();
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
