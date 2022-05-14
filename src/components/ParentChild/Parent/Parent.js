import React from "react";
import Child from "../Child/Child";

function Parent() {

  const pull_data = (data) => {
    alert(`Displaying data from parent which was passed by child: ${data}`)
  }

  return (
      <Child getName={pull_data} />
  );
}

export default Parent;
