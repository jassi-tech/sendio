import { GoogleAuthCallbacks } from "@/lib/interface";


export const handleGoogleSignIn = ({
  setConnectedEmail,
  setFromEmail,
  setFromName,
}: GoogleAuthCallbacks): void => {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const authUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/google`;

  window.open(
    authUrl,
    "google-auth",
    `width=${width},height=${height},left=${left},top=${top}`,
  );

  const messageListener = (event: MessageEvent) => {
    if (event.data?.type === "GOOGLE_AUTH_SUCCESS") {
      const { user } = event.data.data;
      setConnectedEmail(user.email);
      setFromEmail?.(user.email);
      if (user.name) {
        setFromName?.(user.name);
      }
      window.removeEventListener("message", messageListener);
    }
  };

  window.addEventListener("message", messageListener);
};

export const handleMicrosoftSignIn = ({
  setConnectedEmail,
  setFromEmail,
  setFromName,
}: GoogleAuthCallbacks): void => {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const authUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/microsoft`;

  window.open(
    authUrl,
    "microsoft-auth",
    `width=${width},height=${height},left=${left},top=${top}`,
  );

  const messageListener = (event: MessageEvent) => {
    if (event.data?.type === "MICROSOFT_AUTH_SUCCESS") {
      const { user } = event.data.data;
      setConnectedEmail(user.email);
      setFromEmail?.(user.email);
      if (user.name) {
        setFromName?.(user.name);
      }
      window.removeEventListener("message", messageListener);
    }
  };

  window.addEventListener("message", messageListener);
};






