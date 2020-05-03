// export const storage = () => {
//   if (!typeof window.localStorage === "undefined") return window.localStorage;
//   else if (!typeof localStorage === "undefined") return localStorage;
//   else return false;
// };

const storage = () => {
  // if (!typeof window.localStorage === "undefined") return window.localStorage;
  // else if (!typeof localStorage === "undefined") return localStorage;
  // else return false;
  return localStorage;
};

// const store = function (_store) {
//   return function () {
//     return localStorage;
//   };
// };

module.exports = { storage };
