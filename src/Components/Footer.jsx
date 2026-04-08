import { Heart, HomeIcon, Plus, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-center">
        <div className="flex items-center justify-around md:gap-24 gap-10">
          <button
            type="button"
            className="p-2 hover:bg-gray-800 hover:text-violet-500 text-white rounded-full transition-all duration-200 ease-in-out"
            onClick={() => navigate('/')}
          >
            <HomeIcon className="md:w-6 md:h-6 w-5 h-5" />
          </button>

          <button
            type="button"
            className="p-2 hover:bg-gray-800 hover:text-violet-500 text-white rounded-full transition-all duration-200 ease-in-out"
            onClick={() => navigate('/buscar')}
          >
            <Search className="md:w-6 md:h-6 w-5 h-5" />
          </button>

          <button 
          type="button" 
          onClick={() => navigate('/criar-post')} 
          className="md:w-12 md:h-12 w-10 h-10 hover:bg-violet-400 bg-violet-500 text-white rounded-full flex items-center justify-center transition-all duration-200 ease-in-out">
            <Plus className="md:w-6 md:h-6 w-5 h-5" />
          </button>

          <button
            type="button"
            className="p-2 hover:bg-gray-800 hover:text-violet-500 text-white rounded-full transition-all duration-200 ease-in-out"
            onClick={() => navigate('/meu-perfil/curtidos')}
          >
            <Heart className="md:w-6 md:h-6 w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-800 hover:text-violet-500 text-white rounded-full transition-all duration-200 ease-in-out"
            onClick={() => navigate('/meu-perfil')}
          >
            <User size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
