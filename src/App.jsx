import React from 'react'
import { KeyProvider } from './context/KeyContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from './pages/Main';
import Login from './components/Login';
import MainLayout from './layout/MainLayout';
import CreateEvent from './components/CreateEvent';
import WelcomeScreen from './pages/WelcomeScreen';
import Intro from './pages/Intro';
import Journey from './pages/Journey';
import ProfileView from './pages/ProfileView';
import ProfileInfo from './pages/ProfileInfo';
import Stats from './pages/Stats';
import UpcomingEvents from './pages/UpcomingEvents'
import Reflection from './pages/Reflection';


const App = () => {
    const router = createBrowserRouter([{ 
        path: "",
        element: <MainLayout />, 
        children: [{path: "/", element: <Login />}, 
            {path: "/profile", element: <Profile />},
            {path: "/profileview", element: <ProfileView />},
            {path: "/event", element: <CreateEvent />},
            {path: "/welcome", element: <WelcomeScreen />},
            {path: "/firstprofile", element: <Intro />},
            {path: "/startjourney", element: <Journey />},
            {path: "/profileinfo", element: <ProfileInfo />},
            {path: "/upcoming", element: <UpcomingEvents />},
            {path: "/stats", element: <Stats />},
            {path: "/reflection", element: <Reflection />},

        ]}]);

  return (
    <KeyProvider>
    <RouterProvider router={router} />
    </KeyProvider>
);
}

export default App
