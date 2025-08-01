'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from './login/page';

export default function HomePage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
      setCheckingAuth(false); // show login
      return;
    }

    const role = user?.role?.name;

    // Auto redirect based on role
    switch (role) {
      case "Admin":
        router.push("/admin");
        break;
      case "Librarian":
        router.push("/librarian");
        break;
      case "Acquisition Manager":
        router.push("/acquisition");
        break;
      case "Inventory Manager":
        router.push("/inventory");
        break;
      case "Circulation Staff":
        router.push("/circulation");
        break;
      case "Finance Officer":
        router.push("/finance");
        break;
      case "Student":
        router.push("/student");
        break;
      default:
        localStorage.clear();
        setCheckingAuth(false); // show login if unknown role
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <LoginPage />;
}