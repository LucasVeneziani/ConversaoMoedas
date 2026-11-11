import { StatusBar } from 'expo-status-bar';
import useConversaoViewModel from './viewmodels/viewmodel';
import ConversaoView from './views/view';

export default function App() {
  const viewModel = useConversaoViewModel();

  return (
    <>
      <ConversaoView viewModel={viewModel} />
      <StatusBar style="light" />
    </>
  );
}
