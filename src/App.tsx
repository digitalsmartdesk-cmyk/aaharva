import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Product } from './pages/Product';
import { Subscription } from './pages/Subscription';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/subscription" element={<Subscription />} />
    </Routes>
  );
}

export default App;
