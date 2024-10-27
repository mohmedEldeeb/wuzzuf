import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import LoadingBar from "./layouts/LoadingBar/LoadingBar";

const NavBar = React.lazy(() => import("./layouts/NavBar"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Search = React.lazy(() => import("./pages/Search/Search"));
const Jobs = React.lazy(() => import("./pages/Jobs/Jobs"));
const Job = React.lazy(() => import("./pages/Job/Job"));
const Skill = React.lazy(() => import("./pages/Skill/Skill"));

function App() {
  return (
    <div className="container">
      <NavBar />
      <div className="App">
        <Suspense fallback={<LoadingBar />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="jobs/search" element={<Search />} />
            <Route path="Jobs" element={<Jobs />} />
            <Route path="job/:uuid" element={<Job />} />
            <Route path="Skill/:uuid" element={<Skill />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
