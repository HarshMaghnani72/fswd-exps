import { useState } from "react";
import "./App.css";

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="counter-container">
      <h2 className="counter-title">Counter</h2>
      <p className="counter-display">{count}</p>
      <div className="button-group">
        <button onClick={decrement} className="btn btn-decrement">-</button>
        <button onClick={increment} className="btn btn-increment">+</button>
      </div>
    </div>
  );
}

function App() {
  const [initialValue, setInitialValue] = useState(0);

  return (
    <div className="app-container">
      <Counter initialCount={initialValue} />
    </div>
  );
}

export default App;