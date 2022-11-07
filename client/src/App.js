
import { BrowserRouter } from 'react-router-dom'
import Registration from './components/Registration';
import Authorization from './components/Authorization';
import Header from './components/Header'
import History from './components/History'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <History/>
    </BrowserRouter>
    //<Registration />
    //<Authorization/>
    //<Header/>
  );
}

export default App;
