import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarComponent } from "./components/SidebarComponent";

export default function App() {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <div className="dark flex p-4 w-[100vw] h-[100vh] overflow-y-scroll">
                    <SidebarComponent />
                    <SidebarTrigger />
                    <main className="p-8 w-full">
                        <Routes>
                            <Route
                                path="/"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/team"
                                element={<Team />}
                            />
                        </Routes>
                    </main>
                </div>
            </SidebarProvider>
        </BrowserRouter>
    );
}
