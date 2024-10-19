import { useAuth } from "@/contexts/AuthProvider";

export default function HomePage() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <h2 className="p-10 text-white">홈 화면입니다.</h2>
      <div className="flex gap-6 p-10">
        <a className="text-white" href="/signin">
          로그인
        </a>
        <button type="button" className="text-white" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </>
  );
}
