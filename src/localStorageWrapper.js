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
