import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Facts from './components/Facts/Facts';
import FormComponent from './components/Form/FormComponent';
import { AppRoot } from '@vkontakte/vkui';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoot mode="partial">
          <Facts />
          <FormComponent />
        </AppRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
