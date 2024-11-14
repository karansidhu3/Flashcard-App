import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route index element={<Signup />} />
          <Route index element={<HomePage />} />
          <Route index element={<DeckPage />} />
          <Route index element={<PlayPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}