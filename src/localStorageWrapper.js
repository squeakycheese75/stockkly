// const localStorageMock = function () {
//   var store = {};
//   return {
//     getItem: function (key) {
//       return store[key];
//     },
//     setItem: function (key, value) {
//       store[key] = value.toString();
//     },
//     clear: function () {
//       store = {};
//     },
//     removeItem: function (key) {
//       delete store[key];
//     },
//   };
// };

// const storage = () => {
//   if (!typeof window.localStorage === "undefined") return window.localStorage;
//   else if (!typeof localStorage === "undefined") return localStorage;
//   // else return localStorageMock();
//   return undefined;
// };

function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return undefined;
  }
}

function setItem(key, value) {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {
    return undefined;
  }
}

function removeItem(key) {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return undefined;
  }
}

module.exports = { getItem, setItem, removeItem };
