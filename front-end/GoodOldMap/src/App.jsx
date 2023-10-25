import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Account from './pages/Account/Account';
import AccountEdit from './pages/AccountEdit/AccountEdit';
import MainMap from './pages/MainMap/MainMap';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import Error from './pages/Error/Error';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMap />} />
          <Route path="/account" >
            <Route path="" element={<Account />}/>
            <Route path="edit" element={<AccountEdit />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
