import { yupResolver } from '@hookform/resolvers/yup';
import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Button from '../Components/Button.jsx';
import Input from '../Components/Input';
import { useUser } from '../hooks/AuthContext.jsx';
import { api } from '../services/api.js';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { putUserData } = useUser();
  const schema = yup
    .object({
      email: yup
        .string()
        .email('Insira um email valido')
        .required('Insira seu email'),
      password: yup
        .string()
        .min(6, 'A senha deve ter no minimo 6 caracteres')
        .required('Insira sua senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: userData } = await toast.promise(
        api.post('/sessions', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: 'Verificando seus dados',
          success: {
            render() {
              setTimeout(() => {
                navigate('/');
              }, 2300);
              return 'Seja Bem-Vindo(a)';
            },
          },
          error: 'Email ou Senha Incorretos',
        },
      );
      putUserData(userData);
    } catch (error) {
      console.error('Falha na solicitação', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-full bg-[#030712] p-16">
      <div className="flex h-full items-center justify-center gap-4 flex-col">
        <h2 className="md:text-4xl text-2xl font-bold bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          ConnectHub
        </h2>
        <div className="md:w-[450px] w-[320px] flex flex-col bg-[#111827] border border-gray-800 p-6 rounded-2xl">
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-xl font-bold text-white">
              Bem vindo de volta!
            </h3>
            <p className="text-sm text-gray-400">
              Entre na sua conta para continuar
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-4"
          >
            <div>
              <Input
                label="Email"
                type="email"
                icon={<Mail className="text-[#6B7280] md:w-5" />}
                placeholder="Insira seu email"
                {...register('email')}
                error={errors?.email?.message}
                fullWidth={true}
              />
              <p className="text-red-500">{errors?.email?.message}</p>
              <Input
                label="Senha"
                type="password"
                icon={<Lock className="text-[#6B7280] md:w-5" />}
                placeholder="Insira sua senha"
                {...register('password')}
                error={errors?.password?.message}
                fullWidth={true}
              />
              <p className="text-red-500">{errors?.password?.message}</p>
            </div>
            <div className="flex items-center justify-center gap-2 flex-col">
              <Button
                type="submit"
                disabled={loading}
                className={'md:w-[400px] w-60'}
              >
                Entrar
              </Button>
              <p className="text-gray-300 mt-4">
                Não tem conta?
                <Link
                  to="/cadastro"
                  className="ml-2 text-violet-500 hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
