import getCurrentUser from "@/features/authorized/apis/get-current-user";
import AuthorizedLayoutComponent from "@/features/authorized/components/AuthorizedLayout";

const AuthorizedLayout = async ({ children }: { children: React.ReactNode }) => {
    const {
        status,
        data,
        error,
    } = await getCurrentUser();

    return <AuthorizedLayoutComponent children={children} currentUser={data!}/>
}

export default AuthorizedLayout;
