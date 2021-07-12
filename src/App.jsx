import { useSnakbar } from "context/SnakbarProvider";
import { NavBar } from "common-components/NavBar";
import { Snakbar } from "common-components/Snakbar";
import { Navigation } from "common-components/Navigation";
export default function App() {
  const { snakbarStatus } = useSnakbar();
  return (
    <main>
      <NavBar />
      <Navigation />
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </main>
  );
}
