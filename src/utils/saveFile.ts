import fs from "fs";

export const saveFile = (file:File):Promise<string> => {
  return new Promise<string> ((resolve,reject)=> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result?.toString() || '';
      const base64Data = base64.replace(/^data:application\/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,/, "");
      const fileName = `${Date.now()}.docx`;
      const filePath = `templates/${file.name}`;
      fs.writeFileSync(filePath, base64Data, 'base64');
      resolve(fileName);
    }
    reader.onerror = error => reject(error);
  })
}
