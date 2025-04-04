import { useAuth } from "../auth/AuthProvider"
import DefaultHeader from "../layout/HeaderDefault";
import PortalLayout from "../layout/PortalLayout";

export default function Dashboard(){
    const auth = useAuth();
    return (
        <DefaultHeader>
            <h1>
                Dashboard de {auth.getUser()?.name || ""}
            </h1>
        </DefaultHeader>
    );
}