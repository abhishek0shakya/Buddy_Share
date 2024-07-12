import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Download from "@/pages/Download";
import Upload from "@/pages/Upload";
import { HeroBullets } from "./components/Hero";
import { UserInfoIcons } from "./components/Iam";

export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Outfit, sans-serif", // Set your desired font family
        colorScheme: "light", // Set the default color scheme to light
      }}
    >
      <HeroBullets />
      <BrowserRouter>
        <Routes>
          <Route index element={<Upload />} />
          <Route path=":id" element={<Download />} />
        </Routes>
      </BrowserRouter>
      <UserInfoIcons />
    </MantineProvider>
  );
}
