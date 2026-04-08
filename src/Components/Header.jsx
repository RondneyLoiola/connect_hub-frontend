import { useNavigate } from 'react-router';
import { useUser } from '../hooks/AuthContext';

function Header() {
  const { userInfo } = useUser();
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 onClick={() => navigate('/')} className="md:text-2xl font-bold bg-linear-to-r cursor-pointer from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          ConnectHub
        </h1>

        <div className="flex items-center gap-2 text-white">
          <div className="flex flex-col items-left p-6 w-full bg-green rounded-2xl">
            <div className="flex gap-2 items-center relative">
              <div className="md:w-8 w-8 md:h-8 h-8 rounded-full bg-violet-500 flex justify-center items-center">
                <p>{userInfo.user.user.name?.charAt(0) || ''}</p>
              </div>
              <div className="flex flex-col">
                <h2 className="md:text-[16px] font-bold text-[14px] bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  {userInfo.user.user.name}
                </h2>
                <span className="text-gray-400 md:text-[12px] text-[10px]">
                  {`@${userInfo.user.user.nickname}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
