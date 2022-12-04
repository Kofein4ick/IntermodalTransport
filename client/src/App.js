import AppRoute from './pages/AppRoute'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <AppRoute />
        </BrowserRouter>
      </Provider>
  );
}

export default App;
