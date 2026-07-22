import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "./components/auth/AuthInitializer";

import App from "./App";
import "./index.css";

import "@fontsource/inter";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthInitializer>
                    <App />
                </AuthInitializer>
                
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: "#111827",
                                color: "#fff",
                                border: "1px solid #06b6d4"
                            }
                        }}
                    />
                
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);