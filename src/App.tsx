import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import './App.css';
import Facts from './components/Facts/Facts';
import FormComponent from './components/Form/FormComponent';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Facts />
        <FormComponent/>
      </QueryClientProvider>
    </>
  );
}

export default App;
