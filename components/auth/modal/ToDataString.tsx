export function ToDataString(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
      reader.onload = () => resolve(reader.result as string);
    }
  });
}