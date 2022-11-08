import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import AppRoute from './components/AppRoute'


function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </Provider>
  );
}

export default App;
