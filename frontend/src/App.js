import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App