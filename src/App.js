import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import UserDetails from "./UserDetails";
import { auth, signOut } from "./firebase";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";
import Sponsors from "./Sponsors";
import DashboardEvents from "./DashboardEvents";
import Etalk from "./Etalk";
import Events from "./eventshome";
import Team from "./my-team/components/teamLayout";
import Terms from "./Terms";
import Refund from "./Refund";
import Privacy from "./Privacy";
import About from "./AboutUs";
import Contact from "./ContactUs";
function SignOut() {
  const navigate = useNavigate();
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {});
}
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/e-talk" exact element={<Etalk />}></Route>
        <Route path="/sign-in" exact element={<SignIn />}></Route>
        <Route path="/sign-up" exact element={<SignUp />}></Route>
        <Route path="/dashboard" exact element={<Dashboard />}></Route>
        <Route path="/team" exact element={<Team />}></Route>
        <Route path="/events" exact element={<Events />}></Route>
        <Route
          path="/dashboard/events"
          exact
          element={<DashboardEvents />}
        ></Route>
        <Route path="/user-details" exact element={<UserDetails />}></Route>
        <Route path="/sign-out" exact element={<SignOut />}></Route>
        <Route path="/gallery" exact element={<Gallery />}></Route>
        <Route path="/sponsors" exact element={<Sponsors />}></Route>
        <Route path="/terms" exact element={<Terms />}></Route>
        <Route path="/refunds" exact element={<Refund />}></Route>
        <Route path="/privacy" exact element={<Privacy />}></Route>
        <Route path="/about-us" exact element={<About />}></Route>
        <Route path="/contact-us" exact element={<Contact />}></Route>
      </Routes>
    </Router>
  );
}
