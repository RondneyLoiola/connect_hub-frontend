import { yupResolver } from '@hookform/resolvers/yup';
import { Camera, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Button from '../Components/Button.jsx';
import { useUser } from '../hooks/AuthContext.jsx';
import { api } from '../services/api.js';

function NewPost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { userInfo } = useUser();
  
  const schema = yup.object({
    description: yup.string(),
    file: yup
      .mixed()
      .test('required', 'Escolha uma imagem para continuar', (value) => {
        return value && value.length > 0;
      })
      .test('fileSize', 'Carregue arquivos até 10mb', (value) => {
        return value && value.length > 0 && value[0].size <= 10000000;
      })
      .test('type', 'Carregue arquivos de imagem PNG ou JPEG', (value) => {
        return (
          value &&
          value.length > 0 &&
          (value[0].type === 'image/png' || value[0].type === 'image/jpeg' || value[0].type === 'image/jpg')
        );
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('file', [file]); // Atualiza o valor do formulário
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('file', []); // Limpa o valor do formulário
  };

  useEffect(() => {
    if (!userInfo?.user) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const postFormData = new FormData();
      postFormData.append('description', data.description || '');
      postFormData.append('file', data.file[0]);

      await toast.promise(api.post('/posts', postFormData), {
        pending: 'Publicando postagem...',
        success: 'Postagem publicada com sucesso',
        error: 'Falha ao publicar postagem!',
      });

      setTimeout(() => {
        navigate('/');
      }, 2300);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="height text-white p-12">
      <div className="flex justify-center items-center flex-col gap-4 h-full">
        <form
          className="flex flex-col md:w-[500px] w-full p-12 bg-[#111827] rounded-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center">
            <div
              className="flex items-center justify-center w-full h-full"
            >
              {!imagePreview ? (
                <label className={`flex flex-col items-center justify-center w-full h-64 rounded-xl cursor-pointer transition-all border-3 ${errors.file ? 'border-red-500' : 'border-gray-600'} border-dashed rounded-2xl`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500 text-center">
                      <span className="font-semibold">
                        Clique para adicionar
                      </span>{' '}
                      uma imagem
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG ou JPEG</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register('file')}
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full md:h-96 object-cover rounded-xl border-3 border-dashed border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-red-500 mt-2">{errors?.file?.message}</p>

            <textarea
              placeholder="Descreva seu novo post..."
              {...register('description')}
              className="border border-gray-600 w-full p-6 rounded-2xl mt-6 outline-0 text-white bg-transparent"
              cols="20"
              rows="5"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-red-600 hover:bg-red-900 transition-all duration-200 ease-in-out text-white ml-2 flex items-center gap-2 md:text-sm text-[12px] md:px-3 px-2 py-1 md:py-2 rounded-2xl"
              type="button"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
            <Button className={'md:w-[120px] w-20'} type="submit" disabled={loading}>
              {loading ? 'Publicando' : 'Publicar'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewPost;