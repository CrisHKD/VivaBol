import { useAuth } from "../auth/AuthProvider"
import DefaultHeader from "../layout/HeaderDefault";

export default function Index(){
    const auth = useAuth();
    return (
        <DefaultHeader>
            <h1>
                Index de {auth.getUser()?.name || ""}
            </h1>
        </DefaultHeader>
    );
}