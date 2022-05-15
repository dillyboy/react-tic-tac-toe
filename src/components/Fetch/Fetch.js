import React, { useEffect } from "react";
import axios from "axios";

function Fetch() {

  useEffect(() => {

    // GET
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    //   .then(res => {
    //     console.log(res);
    //   }).catch(err => {
    //     console.error(err);
    // })

    // POST
    // axios.post('https://jsonplaceholder.typicode.com/posts', { firstName: 'Fred', lastName: 'Flintstone' })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });


    // Concurrent GET
    const getUserOne = () => axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const getUserTwo = () => axios.get('https://jsonplaceholder.typicode.com/posts/2');

    Promise.all([getUserOne(), getUserTwo()])
      .then(function (results) {
        const [userOne, userTwo] = results;
        console.log(userOne);
        console.log(userTwo);
      });
  })



  return (
    <div>
      <p>Check console</p>
    </div>
  );
}

export default Fetch;
