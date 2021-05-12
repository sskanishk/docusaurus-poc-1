import React from 'react';
import { useState, useEffect } from 'react';
const axios = require('axios');

// const Stuff = () => {
//   const [state, setState] = useState("");
//   return (
//     <>
//     <input value={state || ""} onChange={(e) => setState(e.currentTarget.value)} />
//     <p>{state}</p>
//     </>
//   )
// }
// export default Stuff;


const Stuff = () =>{
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    let unmount = false;

    axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => {
        if(!unmount){
          setItems(response.data);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        if (!unmount) {
          toast.error(error);
          setError(error)
          setIsLoaded(true);
        }
      });
      return () => { unmount = true };
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.title} {item.completed}
          </li>
        ))}
      </ul>
    );
  }
}

export default Stuff;