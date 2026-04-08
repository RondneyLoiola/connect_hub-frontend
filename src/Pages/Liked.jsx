import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import formatterData from '../utils/dateFormater.js';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import { useUser } from '../hooks/AuthContext.jsx';
import { useNavigate } from 'react-router';

function Liked() {
    const [likedPosts, setLikedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const getLikedPosts = async () => {
            try {
                const response = await api.get('/me/liked-posts');
                setLikedPosts(response.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getLikedPosts();
    }, []);

    const handleLike = async (postId) => {
        if (!userInfo.user) return;

        try {
            await api.delete(`/posts/${postId}/like`);
            setLikedPosts(prev => prev.filter(post => post.id !== postId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="h-auto py-16 p-4">
            <div className="flex flex-col justify-center gap-12 items-center h-full">
                <h2 className="text-center font-bold mb-8 md:text-4xl cursor-pointer bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Posts Curtidos</h2>
                {loading ? (
                    <p className="text-gray-400">Carregando...</p>
                ) : likedPosts.length === 0 ? (
                    <p className="text-gray-400">Você ainda não curtiu nenhum post.</p>
                ) : (
                    likedPosts.map((item) => (
                        <div key={item.id} className="group">
                            <div 
                            className="md:w-[450px] w-[350px] bg-[#1F2937] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
                                {/* Imagem do Post */}
                                <div className="relative overflow-hidden h-[400px] bg-gray-900/60" onClick={() => navigate(`/buscar/usuario/post/${item.id}`, { state: { post: item } })}>
                                    <img
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                        src={item.url}
                                        alt="post-imagem"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Conteúdo do Post */}
                                <div className="p-5 flex flex-col gap-4">
                                    {/* Header - Autor */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 via-red-500 to-yellow-500 p-0.5">
                                            <div className="w-full h-full rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-bold">
                                                {item.author.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5">
                                                <p className="font-semibold text-white text-sm">
                                                    {item.author.name}
                                                </p>
                                            </div>
                                            <span className="text-gray-400 text-xs">
                                                @{item.author.nickname}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Descrição */}
                                    <p className="text-white mt-4 mb-2 text-sm leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Ações */}
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-500">
                                        <div className="flex gap-4 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => handleLike(item.id)}
                                                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-600 transition-colors"
                                            >
                                                <ThumbsUp className="w-5 h-5" />
                                                <span className="text-sm font-medium relative top-0.5">
                                                    {item.likes_count}
                                                </span>
                                            </button>
                                            <div className="flex items-center gap-1.5 text-gray-500" onClick={() => navigate(`/buscar/usuario/post/${item.id}`, { state: { post: item } })}>
                                                <MessageCircle className="w-5 h-5 hover:text-blue-400" />
                                                <span className="text-sm font-medium relative top-0.5">
                                                    {item.comments?.length || 0}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-gray-400 text-xs">
                                            {formatterData(item.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default Liked;
