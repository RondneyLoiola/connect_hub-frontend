import { UserProvider } from './hooks/AuthContext';
import AppRoutes from './routes';

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
