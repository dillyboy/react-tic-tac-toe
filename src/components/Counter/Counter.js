import React, { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(prevState => prevState - 1)}>-</button>
      <label>&nbsp; {count}&nbsp; </label>
      <button onClick={() => setCount(prevState => prevState + 1)}>+</button>
    </div>
  );
}

export default Counter;
