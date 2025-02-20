import { RouterProvider } from 'react-router-dom';
import './App.css';
import { routers } from './router';

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
