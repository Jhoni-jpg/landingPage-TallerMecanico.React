import './index.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import.meta.glob("/public/styles/**/*.css", { eager: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);