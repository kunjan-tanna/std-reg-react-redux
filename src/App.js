import React, { useEffect, useState } from "react";
import "alertifyjs/build/css/alertify.css";
import "./App.css";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import StudentReg from "./pages/studentReg";
import ViewStudent from "./pages/viewStudent";

function App() {
   return (
      <>
         <Router>
            <NavBar />
            <Routes>
               <Route
                  exact
                  path="/student-registration"
                  element={<StudentReg />}
               />
               <Route exact path="/view-students" element={<ViewStudent />} />
               <Route
                  path="*"
                  element={<Navigate to="/student-registration" />}
               />
            </Routes>
         </Router>
      </>
   );
}

export default App;
