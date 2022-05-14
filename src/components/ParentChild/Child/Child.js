import React, { useState } from "react";

function Child(props) {

  const [name, setName] = useState('');

  const submit = () => {
    props.getName(name);
  }
  return (
    <div style={{'margin': '10px'}}>
      <input placeholder="Name" type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
      &nbsp;<button onClick={submit}>Submit</button>
    </div>
  );
}

export default Child;
