import { Crown, LogOut, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from '../Components/Button.jsx';
import Input from '../Components/Input.jsx';
import { useUser } from '../hooks/AuthContext.jsx';

function Profile() {
  const { userInfo, logout } = useUser();
  const navigate = useNavigate();

  if (!userInfo.user?.user) {
    return (
      <section className="height flex items-center justify-center p-12 mt-4">
        <div className="w-2xl rounded-2xl justify-center md:p-12 p-6 bg-[#111827] text-white text-center">
          <p>Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="height flex items-center justify-center p-12 mt-4">
      <div className="w-2xl rounded-2xl justify-center md:p-12 p-6 bg-[#111827]">
        <div className="flex gap-2 flex-col items-center">
          <div className="md:w-15 w-12 md:h-15 h-12 rounded-full bg-violet-500 flex justify-center items-center">
            <p className="text-white text-2xl">
              {userInfo.user.user.name?.charAt(0) || ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="md:text-[24px] text-[20px] text-white">
              Olá,
              <span className="text-violet-500">
                {' '}
                {userInfo.user.user.name}
              </span>
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <Input
            label="Nome"
            icon={<User className="md:w-5 w-5 text-[#6B7280]" />}
            value={userInfo.user.user.name || ''}
            readOnly
            fullWidth={true}
          />

          <Input
            label="Email"
            icon={<Mail className="md:w-5 w-5 text-[#6B7280]" />}
            value={userInfo.user.user.email || ''}
            readOnly
            fullWidth={true}
          />

          <Input
            label="Nickname"
            icon={<Crown className="md:w-5 w-5 text-[#6B7280]" />}
            value={userInfo.user.user.nickname || ''}
            readOnly
            fullWidth={true}
          />
        </div>
        <div className="flex justify-end gap-4 relative md:top-4">
          <button
            type="button"
            className="bg-red-600 hover:bg-red-900 font-bold text-white ml-2 flex items-center gap-2 md:text-sm text-[12px] md:px-3 px-2 py-1 md:py-2 rounded-2xl"
            onClick={logout}
            title="Sair"
          >
            <LogOut className="md:w-5 w-4  " />
            Sair
          </button>
          <Button
            className={'md:w-[120px] w-25 md:text-base text-[12px]'}
            onClick={() => navigate('/meu-perfil/posts')}
          >
            Ver Publicações
          </Button>

        </div>
      </div>
    </section>
  );
}

export default Profile;

