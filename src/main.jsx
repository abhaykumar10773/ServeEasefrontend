//import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Layout from './Layout/Layout.jsx';
import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import About from './Pages/About'
import Service from './Pages/Service.jsx';
import Contact from './Pages/Contact'
import Home from './Pages/Home.jsx'
import {SignUpOne}  from './Components/Login.jsx';
import Sprovider from './Components/sprovider.jsx';
import EServiceinfo from "./Components/SinfoElectrician.jsx"
import CServiceinfo from "./Components/Sinfocarpenter.jsx";
import PServiceinfo from "./Components/SinfoPlumbing.jsx";
import PaintServiceinfo from './Components/SinfoPainting.jsx';
import ClServiceinfo from './Components/SinfoCleanings.jsx';
import CkServiceinfo from "./Components/SinfoCooking.jsx";

import Dashboard from './Pages/Dashboard.jsx';
import UserProfile from './Components/dashbordcomponent/UDashboard.jsx';
import Ubookings from './Components/dashbordcomponent/Ubookings.jsx';
import Unotification from './Components/dashbordcomponent/Upnotification.jsx';
import Upsupport from "./Components/dashbordcomponent/Upsupport.jsx";
import Uplogout from "./Components/dashbordcomponent/Uplogout.jsx";
import Upsettings from "./Components/dashbordcomponent/Upsettings.jsx";
import PbookingManagement from './Components/dashbordcomponent/PbookingManagement.jsx';
import Pservicemanagement from './Components/dashbordcomponent/Pservicemanagement.jsx';
import Earnings from './Components/dashbordcomponent/Pincome.jsx';
import Pdashboard from './Components/dashbordcomponent/Pdashboard.jsx';
import Booking from './Components/Bookings/main.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../src/app/store.js';
//import Userprofile from './Components/Userprofile.jsx';



const router = createBrowserRouter([
  {
    
    path: "/",
    element:<Layout/>,
    children:[
      {    path: "/home",
           element:<Home/>,
      },
      { path: '/rprovider',
        element: <Sprovider/>,
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/service',
        element:<Service/>,
        children:[
          { path: 'Electrician',
            element: <EServiceinfo/>,
          },
          { path: 'Cooking',
            element: <CkServiceinfo/>
          },
          { path: 'Plumbing',
            element:<PServiceinfo/>
          },
          { path: 'cleaning',
            element:<ClServiceinfo/>
          },
          { path: 'carpanter',
            element:<CServiceinfo/>
          },
          { path: 'assembly',
            element:<div>carpanenrer</div>
          },
          { path: 'painting',
            element:<PaintServiceinfo/>
          },
          
         ],
      },
      {
       path: '/userlogin',
        element: <SignUpOne/>,
      },
      {
        path:"",
        element:<Home/>
      },
      { path: "/Booking", element: <Booking/>},
      
      
    ]
  },
  {
    path: "/user",
    element: <Dashboard role="user" />,
    children: [
      { path: "users", element: <UserProfile /> },  
      { path: "bookings", element: <Ubookings /> },
      { path: "notifications", element: <Unotification/> },
      { path: "Support", element:<Upsupport/> },
      { path: "logout", element: <Uplogout/> },
      { path: "settings" , element:<Upsettings/> }
    ]  
},
  {
    path: "/provider",
    element: <Dashboard role="serviceProvider" />,
    children: [
      { path: "profile", element: <Pdashboard /> },  
      { path: "bookings", element: <PbookingManagement/> },
      { path: "servicemanage", element: <Pservicemanagement/> },
      { path: "notifications" , element: <Unotification/>},
      { path: "earnings", element:<Earnings/> },
      { path: "Support", element:<Upsupport/> },
      { path: "logout", element: <Uplogout/> },
      { path: "settings" , element:<Upsettings/> }
      
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
 <>
{/* <ServiceProvider>   // context api use 
   <RouterProvider router={router} />
</ServiceProvider>
    */} 
    
  <Provider store={store}>
    
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
  </Provider>
 
   </> 

)
