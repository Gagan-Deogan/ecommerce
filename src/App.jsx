import { useSnakbar } from "context/SnakbarProvider";
import { NavBar } from "components/NavBar";
import { Snakbar } from "components/Snakbar";
import { Navigation } from "components/Navigation/Navigation";
import { ErrorModel } from "components/ErrorModel";
export default function App() {
  const { snakbarStatus } = useSnakbar();
  return (
    <main>
      <NavBar />
      <Navigation />
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
      <ErrorModel />
    </main>
  );
}
