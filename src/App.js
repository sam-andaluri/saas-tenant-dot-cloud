import './App.css';
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Loading from "./components/loading";
import ProtectedRoute from "./components/protected-route";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
function App() {

    const { isLoading } = useAuth0();
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="App">
            <NavBar/>
            <div className="content">
                <Switch>
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <Route path="/" exact component={Home} />
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
