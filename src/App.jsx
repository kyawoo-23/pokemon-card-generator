import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MenuBar from "./components/MenuBar"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

function App() {
    const [id, setId] = useState(Math.floor(Math.random() * 905) + 1)

    return (
        <div className="h-full w-full px-[10%]">
            <MenuBar id={id} setId={setId} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home id={id} />}></Route>
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
