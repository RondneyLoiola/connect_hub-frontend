import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { api } from '../services/api.js';

function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      if (user?.id) {
        try {
          const response = await api.get(`/users/${user.id}/posts`);
          setPosts(response.data.posts);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        }
      }
    };

    getPosts();
  }, [user?.id]);

  if (!user) {
    return (
      <section className="height-auto p-12 text-white text-center">
        <h2 className="text-2xl">Usuário não encontrado</h2>
      </section>
    );
  }

  return (
    <section className="height-auto p-12 text-white">
      <div className="flex flex-col items-center gap-2">
        {/* User Info */}
        <div className="w-full rounded-2xl justify-center md:p-12 p-6 bg-[#111827]">
          <div className="flex gap-2 flex-col items-center">
            <div className="md:w-15 w-12 md:h-15 h-12 rounded-full bg-violet-500 flex justify-center items-center">
              <p className="text-white text-2xl">
                {user.name?.charAt(0) || ''}
              </p>
            </div>
            <div className="flex items-center flex-col">
              <h2 className="md:text-[24px] text-[20px] text-white">
                {user.name}
              </h2>
              <p className='md:text-[14px] text-[12px] text-gray-300'>@{user.nickname}</p>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="flex flex-col text-center justify-center gap-12 items-center w-full">
          <h2 className="md:text-4xl text-[30px] font-bold bg-linear-to-r cursor-pointer from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Publicações de {user.name}
          </h2>
          <div className="grid md:grid-cols-3 md:gap-1 gap-2">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  className="relative aspect-square group cursor-pointer overflow-hidden"
                  key={post.id}
                  onClick={() => navigate(`/buscar/usuario/post/${post.id}`, { state: { post: post } })}
                >
                  <img
                    src={post.url}
                    alt={post.id}
                    className="border-2 rounded-sm border-gray-600 md:w-[300px] w-[250px] h-full object-contain"
                  />
                </div>
              ))
            ) : (
              <div className="h-full text-center flex justify-center flex-col items-center absolute top-0 left-1/2 -translate-x-1/2">
                <h3 className="text-xl text-gray-300">
                  Nenhuma publicação encontrada
                </h3>
                <p className="my-4 text-gray-300">
                  Este usuário ainda não fez publicações
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDetails;
