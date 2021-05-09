import { useSnakbarContext } from "./Context/SnakbarContext";
import { NavBar } from "./Components/NavBar";
import { Snakbar } from "./Components/Snakbar";
import { Navigation } from "./Components/Navigation/Navigation";

export default function App() {
  const { snakbarStatus } = useSnakbarContext();
  return (
    <main>
      <NavBar />
      <Navigation />
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </main>
  );
}
