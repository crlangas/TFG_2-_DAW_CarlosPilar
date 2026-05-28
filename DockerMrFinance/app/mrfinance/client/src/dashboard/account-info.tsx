import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./menu";
import Cabecera from "./cabecera";
import { SwitchChoiceCard } from "@/components/ui/choiceCard";
import {
  FieldGroup,
  FieldLabel,
  Field,
  FieldContent,
  FieldTitle,
  FieldDescription,
} from "@/components/ui/field";

type Props = {
  user: any;
  onLogout: () => void;
  setCurrentView: (view: "main" | "add-funds" | "account-info") => void;
};

export default function AccountInfo({ user, onLogout, setCurrentView }: Props) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState<Date | string>(new Date());
  const [estado2fa, setEstado2fa] = useState(false);

  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  const handleToggle2fa = async (newValue: boolean) => {
    try {
      const res = await axios.post("/api/toggle-2fa", {
        userId: user.id,
        pass: user.pass,
        is_2fa: newValue,
      });

      if (res.data.success) {
        setEstado2fa(newValue);
      } else {
        console.error("Error al actualizar 2FA");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear un nuevo FormData para controlar el orden
    const formData = new FormData();
    formData.append("userId", user.id.toString());
    formData.append("pass", user.pass);

    // Añadir el archivo después de los datos de texto
    const form = e.currentTarget;
    const fileInput = form.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append("foto", fileInput.files[0]);
    }

    try {
      const res = await axios.post("/api/upload-profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        // Añadir un retraso para asegurar que el sistema de archivos (Docker/Windows)
        // haya guardado la imagen completamente antes de recargarla en la vista.
        setTimeout(() => {
          setImageTimestamp(Date.now());
          if (fileInput) fileInput.value = "";
        }, 1000);
      } else {
        console.error("Error al subir imagen");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function obtenerDatos() {
      try {
        const res = await axios.post("/api/userInfo", {
          userId: user.id,
          pass: user.pass,
        });

        if (res.data.success) {
          const datos = res.data;
          setNombreUsuario(datos.user.nombre);
          setEmail(datos.user.email);
          setFechaRegistro(datos.user.fecha_registro);
          setEstado2fa(datos.user.is_2fa);
          //console.log(datos);
        }
      } catch (e) {
        console.log(e);
      }
    }

    obtenerDatos();
  }, [user.id, user.pass]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-stone-950">
      <Menu onSelect={setCurrentView} />

      {/* Contenido Principal */}
      <div className="flex-1 p-4 md:p-8 overflow-x-hidden w-full transition-all duration-300 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-2">
          {/* encabezado de la pagina hecho con un componente llamado cabecera */}
          <Cabecera onLogout={onLogout} setCurrentView={setCurrentView} />

          {/* Aquí muestra los datos del usuario */}
          <Card>
            <CardHeader>
              <CardTitle>
                <p className="text-2xl">
                  Hola {nombreUsuario} estas list@ para hacer crecer tu
                  patrimonio?
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <fieldset className="w-full">
                <FieldGroup className="w-full max-w-sm mb-7">
                  <FieldLabel>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Nombre de usuario</FieldTitle>
                        <FieldDescription>{nombreUsuario}</FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldLabel>

                  <FieldLabel>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Email</FieldTitle>
                        <FieldDescription>{email}</FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldLabel>

                  <FieldLabel>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Fecha de registro</FieldTitle>
                        <FieldDescription>
                          {fechaRegistro instanceof Date
                            ? fechaRegistro.toLocaleDateString()
                            : String(fechaRegistro)}
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                </FieldGroup>
                <div>
                  {/* componente boton */}
                  <SwitchChoiceCard
                    titulo="Autentificacion en dos pasos"
                    descripcion="Activa la autentificacion en dos pasos con tu correo electronico"
                    checked={estado2fa}
                    onChange={handleToggle2fa}
                  />
                </div>
              </fieldset>
              <fieldset className="w-full flex justify-center items-center flex-col gap-4">
                <img
                  key={imageTimestamp}
                  src={`/api/profile-picture/${user.id}?t=${imageTimestamp}`}
                  alt="foto de perfil"
                  className="object-cover border-2 border-gray-200 dark:border-gray-800 rounded-lg shadow-lg max-w-full h-auto max-h-64"
                />
                <div>
                  <form
                    onSubmit={handleFileUpload}
                    className="flex flex-col gap-3 mt-4 align-center items-center"
                  >
                    <input
                      type="file"
                      name="foto"
                      id="foto"
                      accept="image/png"
                      required
                      className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full block mb-2"
                    />
                    <input
                      type="submit"
                      value="cambiar foto de perfil"
                      className="bg-black text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                    />
                  </form>
                </div>
              </fieldset>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
