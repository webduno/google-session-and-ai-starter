interface GoogleLoginButtonProps {
  handleLogin: () => void;
  session: any;
  handleLogout: () => void;
}
export default function GoogleLoginButton({ handleLogin, session, handleLogout }: GoogleLoginButtonProps) {
const handleProfile = () => {
  console.log("handleProfile");
  // logout
  handleLogout();
}
if (session) {
  return (
    <button 
      className='bg-trans tx-white noborder pa-2 opaci-chov--50 flex-col' 
      onClick={handleProfile}
    >
      <img className="w-50px h-50px bord-r-100" src={session?.user?.image || "https://i.pravatar.cc/150?img=14"} alt="Profile" />
    </button>
  );
}
  return (
    <button 
      className='bg-trans tx-white noborder pa-2 opaci-chov--50 flex-col' 
      onClick={handleLogin}
    >
      <div className='underline'>
        <div className='tx-lg'>Login</div>
        <div>With Google</div>
      </div>
    </button>
  );
} 