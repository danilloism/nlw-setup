import './styles/global.css';

import { Habit } from './components/Habit';

function App() {
  return (
    <>
      <Habit completed={3} />
      <Habit completed={5} />
      <Habit completed={10} />
      <Habit completed={12} />
      <Habit completed={17} />
      <Habit completed={30} />
    </>
  );
}

export default App;
