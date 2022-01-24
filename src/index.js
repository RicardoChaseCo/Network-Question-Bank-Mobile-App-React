import ReactDOM from 'react-dom'
import 'reset-css';
import 'lib-flexible'
import BaseRouter from './router'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <BaseRouter />
  </Provider>
  ,
  document.getElementById('root')
)