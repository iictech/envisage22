import Home from "./Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Dashboard from "./Dashboard"
import UserDetails from "./UserDetails"
import {auth, signOut} from "./firebase"
import {useNavigate} from 'react-router-dom';
import Gallery from './Gallery'
import Sponsors from './Sponsors'
import DashboardEvents from './DashboardEvents'
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
        <Route path="/dashboard/events" exact element={<DashboardEvents />}></Route>
        <Route path="/user-details" exact element={<UserDetails />}></Route>
        <Route path="/sign-out" exact element={<SignOut />}></Route>
        <Route path="/gallery" exact element={<Gallery />}></Route>
        <Route path="/sponsors" exact element={<Sponsors />}></Route>
      </Routes>
    </Router>
  )
}