import RouterProvider from "./Router"
import "./App.css"
import { Toaster } from "./components/ui/toaster"

export default function App() {
  return (
    <>
      <RouterProvider />
      <Toaster />
    </>
  )
}
