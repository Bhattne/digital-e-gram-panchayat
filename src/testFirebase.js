import { getAuth } from "firebase/auth";
import { app } from "./firebase/config";

const auth = getAuth(app);
console.log("✅ Firebase initialized successfully:", app.name);
