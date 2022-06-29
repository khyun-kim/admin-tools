import React from "react";
import "./App.css";
import { Button } from "@khyun-kim/admin-tools";

function App() {
  return (
    <div className="App">
      <Button label="fuck you" onClick={() => alert("test")}></Button>
    </div>
  );
}

export default App;
