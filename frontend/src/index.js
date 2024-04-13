import React, { Profiler } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './redux/Store.js'
import { Provider } from 'react-redux'
import 'react-error-overlay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Profiler id="YourComponent" onRender={(id, phase, actualDuration) => {
                console.log(`${id} took ${actualDuration} ms to render.`);
            }}>
                <App />
            </Profiler>
        </Provider>
    </React.StrictMode>
)