import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/hotspots">Hotspots</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/hotspots">
            <Hotspots />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Map() {
  return <h2>Map</h2>;
}

function Hotspots() {
  return <h2>Hotspots</h2>;
}
