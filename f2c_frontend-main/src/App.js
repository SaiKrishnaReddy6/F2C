import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Availproduct from "./Availproduct";
import Dashboard_g from "./Dashboard_g";
import Profile from "./Profile";
import ItemManager from "./ItemManager";
import Findgrower from "./Findgrower";


function App() {
  return (
    <>
    <Routes>
      <Route path="/Signup" element={<Signup/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/AvailProduct" element={<Availproduct/>}></Route>
      <Route path="/Profile" element={<Profile></Profile>}></Route>
      <Route path="/ManageProduct" element={<ItemManager/>}></Route>
      <Route path="/Dashboard_g" element={<Dashboard_g></Dashboard_g>}></Route>
      <Route path="/Findgrower" element={<Findgrower></Findgrower>}></Route>
      <Route path="*" element={<Signup/>}></Route>
    </Routes>
    </>
  );
}

export default App;