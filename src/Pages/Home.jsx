import { MessageCircle, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import formatterData from '../utils/dateFormater.js';
import { useUser } from '../hooks/AuthContext.jsx';
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts ] = useState(new Set());
  const { userInfo } = useUser();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getLikedPosts = async () => {
      if (userInfo.user) {
        try {
          const response = await api.get('/me/liked-posts');
          const likedIds = new Set((response.data || []).map(post => post._id));
          setLikedPosts(likedIds);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getPosts();
    getLikedPosts();
  }, [userInfo.user]);

  const handleLike = async (postId) => {
    if (!userInfo.user) return;

    try {
      const isLiked = likedPosts.has(postId);
      if (isLiked) {
        await api.delete(`/posts/${postId}/like`);
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        setPosts(prev => prev.map(post =>
          post._id === postId ? { ...post, likes_count: post.likes_count - 1 } : post
        ));
      } else {
        await api.post(`/posts/${postId}/like`);
        setLikedPosts(prev => new Set([...prev, postId]));
        setPosts(prev => prev.map(post =>
          post._id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
        ));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="height-auto py-16 p-4">
      <div className="flex flex-col justify-center gap-12 items-center h-full">
        {posts.map((item) => (
          <div key={item._id}>
            <div 
            className="md:w-[450px] w-[350px] bg-[#1F2937] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1"

            >
              {/* Imagem do Post */}
              <div className="relative overflow-hidden h-[400px] bg-gray-900/60" onClick={() => navigate(`/buscar/usuario/post/${item._id}`, { state: { post: item } })} >
                <img
                  className="w-full h-full  object-contain transition-transform duration-500 group-hover:scale-105"
                  src={item.path}
                  alt="post-imagem"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Conteúdo do Post */}
              <div className="p-5 flex flex-col gap- ">
                {/* Header - Autor */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 via-red-500 to-yellow-500 p-0.5">
                    <div className={`w-full h-full rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-bold`}>
                      {item.author?.name?.charAt(0) || ''}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-white text-sm">
                        {item.author?.name || 'Unknown'}
                      </p>
                    </div>
                    <span className="text-gray-400 text-xs">
                      @{item.author?.nickname || ''}
                    </span>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-white mt-4 mb-2 text-sm leading-relaxed">
                  {item.description || ''}
                </p>

                {/* Ações */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-500">
                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => handleLike(item._id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        likedPosts.has(item._id)
                          ? 'text-blue-400 hover:text-blue-600'
                          : 'text-gray-500 hover:text-blue-400'
                      }`}
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span className="text-sm font-medium relative top-0.5">
                        {item.likes_count || 0}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => navigate(`/buscar/usuario/post/${item._id}`, { state: { post: item } })}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium relative top-0.5">
                        {item.comments_count || 0}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-green-500 transition-colors"
                    ></button>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {formatterData(item.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;

