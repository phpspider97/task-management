import React,{Suspense} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
const Top = React.lazy(()=>import('./components/common/Top'))
const Bottom = React.lazy(()=>import('./components/common/Bottom'))
const Login = React.lazy(()=>import('./components/Login'))
const Register = React.lazy(()=>import('./components/Register'))
const Dashboard = React.lazy(()=>import('./components/Dashboard'))
const AddTask = React.lazy(()=>import('./components/AddTask'))
const ManageTask = React.lazy(()=>import('./components/ManageTask'))
const IncomingTask = React.lazy(()=>import('./components/IncomingTask'))
const EditProfile = React.lazy(()=>import('./components/EditProfile'))
const App = () => {
  return (
    <>
        <BrowserRouter>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Top />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-task/:id?" element={<AddTask />} />
                        <Route path="/manage-task" element={<ManageTask />} />
                        <Route path="/incoming-task" element={<IncomingTask />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                    </Routes>
                <Bottom />
            </Suspense>
        </BrowserRouter>
    </>
  );
}

export default App;