import Home from "./Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Dashboard from "./Dashboard"
import UserDetails from "./UserDetails"
import RegisteredEvents from "./RegisteredEvents"
import AllEvents from "./AllEvents"
import Calender from "./Calender"
import Rules from "./Rules";
import RuleBook from "./RuleBook";
import Terms from "./Terms";
import Refund from "./Refund";
import Privacy from "./Privacy";
import Cart from "./Cart";
import {auth, signOut} from "./firebase"
import {useNavigate} from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate(); 
  signOut(auth).then(() => {
    navigate('/');
  }).catch((error) => {
    
  });
}
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/sign-in" exact element={<SignIn />}></Route>
        <Route path="/sign-up" exact element={<SignUp />}></Route>
        <Route path="/dashboard" exact element={<Dashboard />}></Route>
        <Route path="/user-details" exact element={<UserDetails />}></Route>
        <Route path="/registered-events" exact element={<RegisteredEvents />}></Route>
        <Route path="/all-events" exact element={<AllEvents />}></Route>
        <Route path="/calender" exact element={<Calender />}></Route>
        <Route path="/sign-out" exact element={<SignOut />}></Route>
        <Route path="/rules" exact element={<Rules />}></Route>
        <Route path="/rule-book" exact element={<RuleBook />}></Route>
        <Route path="/terms" exact element={<Terms />}></Route>
        <Route path="/refunds" exact element={<Refund />}></Route>
        <Route path="/privacy" exact element={<Privacy />}></Route>
        <Route path="/cart" exact element={<Cart />}></Route>
      </Routes>
    </Router>
  )
}