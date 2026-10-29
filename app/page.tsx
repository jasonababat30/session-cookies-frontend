import HomePage from "@/features/home/components/HomePage";
import getCurrentUser, { CurrentUser } from "@/features/authorized/apis/get-current-user";
import { cookies } from 'next/headers';

export default async function Home() {
  const cookiesStore = await cookies();
  const session = cookiesStore.get('connect.sid');

  let currentUser: CurrentUser | null = null;

  if (session) {
    const { data } = await getCurrentUser();

    currentUser = data;
  }

  return <HomePage userRole={currentUser?.role}/>;
}
