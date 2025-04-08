import { HomeContextProvider } from "./context";
import EntryPoint from "./EntryPoint";

function HomePage() {
  return (
    <HomeContextProvider>
      <EntryPoint />
    </HomeContextProvider>
  );
}

export default HomePage;
