import HomePage from "@/features/home/components/HomePage";
import getCurrentUser from "@/features/authorized/apis/get-current-user";

export default async function Home() {
  const { data: currentUser } = await getCurrentUser();

  return <HomePage userRole={currentUser?.role}/>;
}
