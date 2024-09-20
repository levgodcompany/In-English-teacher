import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import TokenFirebaseService from "./TokenFirebase.service"; // Servicio para obtener el token personalizado

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8pg-ftaBw_L0VwjTFXuDuuEJPrWvA2G0",
  authDomain: "in-house-c77a1.firebaseapp.com",
  projectId: "in-house-c77a1",
  storageBucket: "in-house-c77a1.appspot.com",
  messagingSenderId: "989230196485",
  appId: "1:989230196485:web:504e22edbd65acfbedf96c",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta las instancias de Auth y Storage
export const auth = getAuth(app);
export const storage = getStorage(app);

class FireBaseStore {
  private file: File;
  private typeFile: string;
  private routeDestination: string = "uploads/";
  private progressUp: number = 0;

  constructor(file: File) {
    this.file = file;
    this.typeFile = file.type;
  }

  // Función para subir el archivo a Firebase Storage 
  private async uploadFile() {
    if (!this.file) {
      console.error("No hay archivo para subir");
      return null;
    }

    try {
      const rutaDestino = `${this.routeDestination}${this.file.name}`; // Ruta en Firebase Storage
      const archivoRef = ref(storage, rutaDestino);

      // Inicia la subida del archivo
      const uploadTask = uploadBytesResumable(archivoRef, this.file);

      // Escucha el estado de la subida
      return new Promise<{ url: string; typeFile: string } | null>(
        (resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Calcula el progreso de la subida
              const progresoSubida =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.progressUp = progresoSubida;
              console.log(`Progreso de la subida: ${this.progressUp}%`);
            },
            (error) => {
              console.error("Error al subir archivo:", error);
              reject(null);
            },
            async () => {
              // Subida completada exitosamente, obtenemos la URL de descarga
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Archivo subido exitosamente, URL:", downloadURL);
              resolve({
                url: downloadURL,
                typeFile: this.typeFile,
              });
            }
          );
        }
      );
    } catch (error) {
      console.error("Error al subir archivo:", error);
      return null;
    }
  }

  // Función para autenticar al usuario en Firebase usando el token personalizado
  private async autenticarEnFirebase(tokenPersonalizado: string) {
    try {
      await signInWithCustomToken(auth, tokenPersonalizado);
      console.log("Autenticación exitosa en Firebase");
    } catch (error) {
      console.error("Error al autenticar en Firebase:", error);
    }
  }

  // Método público para manejar la subida del archivo y retornar la URL
  public async handleUploadFile(id: number) {
    try {
      // Obtener el token personalizado desde el backend
      const tokenPersonalizado = await TokenFirebaseService.getToken(id);

      // Autentica al usuario si aún no está autenticado
      await this.autenticarEnFirebase(tokenPersonalizado);

      // Sube el archivo a Firebase Storage y retorna la URL
      return await this.uploadFile();
    } catch (error) {
      console.error("Error en el manejo de la subida del archivo:", error);
      return null;
    }
  }
}

export default FireBaseStore;
