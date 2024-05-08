"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import * as crypto from "crypto";

interface Admin {
  // Define the properties of the Admin object
  id: string;
  username: string;
  // Add other properties as needed
}

// Define interface for the return value of the hook
interface CheckAdminAuthReturn {
  Admin: Admin | null;
  Loader: boolean;
}

const useCheckAdminAuth = (): CheckAdminAuthReturn => {
  const cookies = useMemo(() => new Cookies(), []);
  const [Admin, setAdmin] = useState<Admin | null>(null); // Specify the type of Admin
  const [Loader, setLoader] = useState(true); // Specify the type of Loader
  const router = useRouter();

  const decryptData = (encryptedData: string, secretKey: string): any => {
    const iv = Buffer.from(encryptedData.slice(0, 32), "hex"); // Extract IV from encrypted data
    const encryptedText = encryptedData.slice(32); // Extract encrypted text from encrypted data
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(secretKey),
      iv
    );
    let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");
    return JSON.parse(decryptedData);
  };

  useEffect(() => {
    try {
      const token = cookies.get("token");
      if (token) {
        const secretKey = "a359d098338a01f66b8af20b18e6fhts";
        const decryptedUserData = decryptData(token, secretKey);
        setAdmin(decryptedUserData);
        setLoader(false);
      } else {
        router.push("/emmy/login");
      }
    } catch (error) {
      console.log(error);
      cookies.remove("token", { path: "/" });
      router.push("/emmy/login");
    }
  }, []);
  return { Admin, Loader };
};

export default useCheckAdminAuth;
