// import { useState, useEffect, useRef } from "react";

// export default function useComponentVisible(initialIsFocus) {
//   const [isComponentFocused, setIsComponentFocused] =
//     useState(initialIsFocus);
//   const ref = useRef(null);

//   const handleAnotherNode = (event) => {
//     if (ref.current && !ref.current.contains(event.target)) {
//         setIsComponentFocused(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleAnotherNode, true);
//     return () => {
//       document.removeEventListener("click", handleAnotherNode, true);
//     };
//   }, []);

//   return { ref, isComponentVisible, setIsComponentVisible };
// }
