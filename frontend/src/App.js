import React,{Suspense} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css' 
import ProtectedRoutes from './components/ProtectedRoutes'
import RedirectedProtectedRoutes from './components/RedirectedProtectedRoutes'
const Top = React.lazy(()=>import('./components/common/Top'))
const Bottom = React.lazy(()=>import('./components/common/Bottom'))
const Login = React.lazy(()=>import('./components/Login'))
const Register = React.lazy(()=>import('./components/Register'))
const Dashboard = React.lazy(()=>import('./components/Dashboard'))
const AddTask = React.lazy(()=>import('./components/AddTask'))
const ManageTask = React.lazy(()=>import('./components/ManageTask'))
const IncomingTask = React.lazy(()=>import('./components/IncomingTask'))
const EditProfile = React.lazy(()=>import('./components/EditProfile'))
const ChatToAdmin = React.lazy(()=>import('./components/ChatToAdmin'))
const SpeechToText = React.lazy(()=>import('./components/SpeechToText'))

const App = () => {
    const isAuthenticated = sessionStorage.getItem('token')!=undefined?true:false 
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<h1>Loading...</h1>}>
                    {
                        (isAuthenticated)?<Top />:''
                    }
                    <Routes>
                        {/* <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} /> */}

                        {/* <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-task/:id?" element={<AddTask />} />
                        <Route path="/manage-task" element={<ManageTask />} />
                        <Route path="/incoming-task" element={<IncomingTask />} />
                        <Route path="/edit-profile" element={<EditProfile />} /> */}

                        <Route element={<RedirectedProtectedRoutes isAuthenticated={isAuthenticated}><Login /></RedirectedProtectedRoutes>} path="/" />
                        <Route element={<RedirectedProtectedRoutes isAuthenticated={isAuthenticated}><Register /></RedirectedProtectedRoutes>} path="/register" />

                        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoutes>} path="/dashboard" />
                        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}><AddTask /></ProtectedRoutes>} path="/add-task/:id?" />
                        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}><ManageTask /></ProtectedRoutes>} path="/manage-task" />
                        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}><IncomingTask /></ProtectedRoutes>} path="/incoming-task" />
                        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}><EditProfile /></ProtectedRoutes>} path="/edit-profile" />
                        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}><ChatToAdmin /></ProtectedRoutes>} path="/chat-to-admin" />
                        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}><SpeechToText /></ProtectedRoutes>} path="/speech-to-text" />

                    </Routes>
                    <Bottom />
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;