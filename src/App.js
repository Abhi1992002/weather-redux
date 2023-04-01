import { Provider } from 'react-redux';
import './App.css';
import Weather from './components/Weather';
import configStore from './store/configureStore';

function App() {

  const store = configStore()

  return (
    <Provider  store ={store} >
    <div className="App">
         <Weather/>
    </div>
    </Provider>
  );
}

export default App;
