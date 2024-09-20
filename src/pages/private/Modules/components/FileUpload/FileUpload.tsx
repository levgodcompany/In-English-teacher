import React, { useState } from "react";
import FireBaseStore from "../../../../../services/firebaseConfig";

interface FileUploadProps {
    filePdf: (filePdf: string)=> void
}
const FileUpload: React.FC<FileUploadProps> = ({filePdf}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<{
    url: string;
    typeFile: string;
  } | null>(null);

  // Manejar el cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Verifica si el archivo es PDF
      if (selectedFile.type !== "application/pdf") {
        alert("Solo se permiten archivos PDF.");
        setFile(null); // Resetea el archivo si no es PDF
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor selecciona un archivo PDF");
      return;
    }

    const idUsuario = 2; // Ejemplo, tu lógica para obtener el ID de usuario
    const firebaseStore = new FireBaseStore(file);

    // Sube el archivo y obtiene la URL
    const url = await firebaseStore.handleUploadFile(idUsuario);
    filePdf(url?.url || "")
    setUploadUrl(url);
  };

  return (
    <div>
      {/* Limitar el input solo a archivos PDF */}
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Archivo</button>

      {uploadUrl && (
        <p>
          Archivo subido exitosamente:{" "}
          <a href={uploadUrl.url}>
            {uploadUrl.url} : {uploadUrl.typeFile}
          </a>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
