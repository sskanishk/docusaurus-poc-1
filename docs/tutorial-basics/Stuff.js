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



// const Stuff = () => {

//   const[input, setInput] = useState("")
//   return(
//     <>
//     <div>
//       <form>
//         <label>
//           <input type="text" name="name" value={input} onChange={(e) => setInput(e.target.value)}/>
//         </label>
//         <button 
//           onClick={(e)=>{
//             e.preventDefault()
//             console.log(input)
//           }}
//         >BUTTON</button>
//         <p>{input}</p>
//       </form>
//     </div>
//     <div>
//     <label htmlFor="cars">Choose a car:</label>
//     <select name="cars" id="cars">
//       <option value="volvo">Volvo</option>
//       <option value="saab">Saab</option>
//       <option value="mercedes">Mercedes</option>
//       <option value="audi">Audi</option>
//     </select>
//     </div>
//     </>
//   )
// }

export default Stuff;