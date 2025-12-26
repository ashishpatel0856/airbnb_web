
import React, { useState } from 'react'

const useCounter = (init=1,min=1) => {

    const [value,setValue] = useState(init);

    const increment =() => setValue((v) => v+1)
    const decrement = () => setValue((v) =>Math.max(min,v-1))
  return {
    value,
    increment,
    decrement,
    setValue,
  };
}

export default useCounter