// import { createContext } from 'react';

// // Create Context
// export const ServiceContext = createContext();

// // Create a provider component
// export const ServiceProvider = ({ children }) => {
//   const services = [
//     {
//       id: 1,
//       title: 'Cleaning Service',
//       description: 'Professional cleaning service for your home.',
//       image: 'path/to/cleaning.jpg',
//     },
//     {
//       id: 2,
//       title: 'Cooking Service',
//       description: 'Expert chefs to cook delicious meals.',
//       image: 'path/to/cooking.jpg',
//     },
//     {
//       id: 3,
//       title: 'Plumbing Service',
//       description: 'Reliable plumbing solutions for your needs.',
//       image: 'path/to/plumbing.jpg',
//     },
//     {
//       id: 4,
//       title: 'Electrician Service',
//       description: 'Certified electricians for safe installations.',
//       image: 'path/to/electrician.jpg',
//     },
//   ];

//   return (
//     <ServiceContext.Provider value={services}>
//       {children}
//     </ServiceContext.Provider>
//   );
// };

// // Custom hook to use the ServiceContext
// // export const useServices = () => {
// //   return useContext(ServiceContext);
// // };
