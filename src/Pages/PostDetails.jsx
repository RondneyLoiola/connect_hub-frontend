import { useLocation } from "react-router";
import { api } from '../services/api'
import { useEffect, useState } from "react";
import { useUser } from '../hooks/AuthContext.jsx';
import formatterData from '../utils/dateFormater.js';
import Button from '../Components/Button.jsx';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useForm } from "react-hook-form";

function PostDetails(){
    const location = useLocation();
    const [loading, setLoading] = useState(false)
    const post = location.state?.post;
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const { userInfo } = useUser();

    const schema = yup.object({
        content: yup.string().required('Comente algo!'),
    })

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const getComments = async () => {
        try {
            const {data} = await api.get(`/posts/${post.id}/comments`)
            setComments(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getComments()
    }, [])

    const handleComment = async (e) => {
        setLoading(true)
        if (!newComment.trim()) return;

        try {
            await api.post(`/posts/${post.id}/comments`, { content: newComment });
            setNewComment('');
            getComments(); 
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="height-auto p-12 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Post Details */}
                    <div className="flex-1">
                        <div className="bg-[#1F2937] rounded-3xl overflow-hidden shadow-xl">
                            {/* Post Image */}
                            <div className="relative overflow-hidden h-[400px] bg-gray-900/60">
                                <img
                                    className="w-full h-full object-contain"
                                    src={post.url}
                                    alt="post-imagem"
                                />
                            </div>

                            {/* Post Content */}
                            <div className="p-5">
                                {/* Author */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 via-red-500 to-yellow-500 p-0.5">
                                        <div className="w-full h-full rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-bold">
                                            {post.author.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-white text-sm">
                                            {post.author.name}
                                        </p>
                                        <span className="text-gray-400 text-xs">
                                            @{post.author.nickname}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-white mb-4 text-sm leading-relaxed">
                                    {post.description}
                                </p>

                                {/* Likes, Comments and Date */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 border-t border-gray-500 gap-2 sm:gap-0">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <span className="text-gray-400 text-sm">
                                            {post.likes_count} Curtidas
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {post.comments_count || 0} Comentários
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-xs">
                                        {formatterData(post.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Comments */}
                    <div className="flex-1">
                        <div className="bg-[#1F2937] rounded-3xl p-5 shadow-xl">
                            <h3 className="text-lg font-semibold mb-4">Comentários</h3>

                            {/* Comments List */}
                            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment._id} className="border-b border-gray-600 pb-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-500 via-red-500 to-yellow-500 p-0.5">
                                                    <div className="w-full h-full rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-bold">
                                                        {comment.author.name.charAt(0)}
                                                    </div>
                                                </div>
                                                <p className="font-semibold text-white text-sm">
                                                    {comment.author.name}
                                                </p>
                                            </div>
                                            <p className="text-gray-300 text-sm">{comment.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-sm">Nenhum comentário ainda.</p>
                                )}
                            </div>

                            {/* Add Comment Form */}
                            {userInfo.user && (
                                <form onSubmit={handleSubmit(handleComment)}>
                                    <textarea
                                        value={newComment}
                                        {...register('content')}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Adicione um comentário..."
                                        className="w-full p-3 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                    <p className="text-red-500">{errors.content?.message}</p>
                                    <Button type='submit' disabled={loading} className='px-2 mt-2'>{loading ? 'Carregando...' : 'Comentar'}</Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PostDetails
