'use client'
import { useState } from 'react';
import HomeContent from './HomeContent'
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomeContainer() {
  // You can add container logic here, such as:
  // - Data fetching
  // - State management
  // - Layout control
  // - Error boundaries
  const { data: session, status } = useSession();
  const handleLogin = () => signIn();
  const handleLogout = () => signOut();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="w-100">
      <HomeContent
       handleLogin={handleLogin}
       handleLogout={handleLogout}
       session={session}
       searchQuery={searchQuery}
       setSearchQuery={setSearchQuery}
      />
    </div>
  )
} 