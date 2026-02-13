import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import AppRoutes from './routes';
import Toast from './components/Toast';

function AppContent() {
  const { toast, hideToast } = useApp();

  return (
    <>
      <AppRoutes />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
