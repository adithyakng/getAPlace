const extractResponseFromJson = (keyData, data) => {
  for (let i = 0; i < data.length; i++) {
    let isValid = true;
    for (const [name, value] of Object.entries(keyData)) {
      if (data[i][key][name] !== value) {
        isValid = false;
      }
    }

    if (isValid) {
      return data[i][key]["responseMessage"];
    }
  }

  return "Sorry! we couldn't find the requested information right now. Please try again later!";
};

module.exports = {
  extractResponseFromJson,
};
