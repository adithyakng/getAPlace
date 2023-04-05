const extractBase64fromFiles = async (files) => {
  const resp = [];
  for (let i = 0; i < files.length; i++) {
    resp.push(await toBase64(files[i]));
  }

  return resp;
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const exportObj = { extractBase64fromFiles, toBase64 };

export default exportObj;
