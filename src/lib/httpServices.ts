import { baseBackendURL } from "@/lib/config";
import axios from "axios";

const httpServices = axios.create({
    baseURL: baseBackendURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default httpServices;
