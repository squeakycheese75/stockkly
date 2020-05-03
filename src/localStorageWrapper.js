const localStorageMock = function () {
  var store = {};
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
};

const storage = () => {
  if (!typeof window.localStorage === "undefined") return window.localStorage;
  else if (!typeof localStorage === "undefined") return localStorage;
  else return localStorageMock();
};

module.exports = { storage };
