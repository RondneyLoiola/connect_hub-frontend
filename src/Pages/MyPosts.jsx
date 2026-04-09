import { useEffect, useState } from 'react';
import Button from '../Components/Button.jsx';
import { useUser } from '../hooks/AuthContext.jsx';
import { api } from '../services/api.js';
import { useNavigate } from 'react-router';

function MyPosts() {
  const navigate= useNavigate();
  const [posts, setPosts] = useState([]);
  const { userInfo } = useUser();

  const userId = userInfo.user?.user?.id;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get(`/users/${userId}/posts`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    getPosts();
  }, [userId]);

  return (
    <section className="height-auto p-24 text-white">
      <div className="flex flex-col text-center justify-center gap-12 items-center">
        <h2 className="md:text-4xl text-[30px] font-bold bg-linear-to-r cursor-pointer from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          Minhas Publicações
        </h2>
        <div className="grid md:grid-cols-3 md:gap-1 gap-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                className=" relative aspect-square group cursor-pointer overflow-hidden"
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
              <h3 className='text-xl text-gray-300'>Nenhuma publicação encontrada</h3>
              <p className='my-4 text-gray-300'>Crie sua primeira publicação</p>
              <Button onClick={() => navigate('/criar-post')} className='p-2 mt-4'>Criar publicação</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyPosts;
