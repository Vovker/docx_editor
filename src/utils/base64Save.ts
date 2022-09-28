import * as fs from "fs";

export const base64Save = (base64: string) => {
  const base64Data = base64.replace(/^data:application\/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,/, "");
  const fileName = `${Date.now()}.docx`;
  const filePath = `templates/${fileName}`;
  fs.writeFileSync(filePath, base64Data, 'base64');
  return fileName;
}
