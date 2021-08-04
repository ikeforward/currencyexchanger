import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import DefaultReducer from './Reducer'

const middleware = [...getDefaultMiddleware()]
const store = configureStore({
  reducer: {
    default: DefaultReducer
  },
  middleware
})

export default store