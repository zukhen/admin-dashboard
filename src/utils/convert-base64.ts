export const convertBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        const result = fileReader.result as string;
        resolve(result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };