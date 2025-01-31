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
    <div className="w-100 noverflow-x pos-rel flex-col flex-justify-start">
        <img src="/wireframegrid_roof3.jpg" alt="" className='h-100 left-0 top-0 pos-fix opaci-50' />
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