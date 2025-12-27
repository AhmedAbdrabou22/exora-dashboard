import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
// import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
import { Spinner } from "./components/atoms/Loading";

// import { SettingProvider } from "./context/settings/SettingProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* <SettingProvider> */}
        {/* <AuthProvider> */}
          {/* <HelmetProvider> */}
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center">
                <Spinner size="large" />
              </div>
            }
          >
            <App />
          </Suspense>
          {/* </HelmetProvider> */}
        {/* </AuthProvider> */}
      {/* </SettingProvider> */}
    </BrowserRouter>
  </QueryClientProvider>
)