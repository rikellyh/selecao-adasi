import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import NavBar from "./components/NavBar";
import RoutesMain from "./routes";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <RoutesMain />
    </QueryClientProvider>
  );
}

export default App;
