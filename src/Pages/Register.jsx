import { yupResolver } from '@hookform/resolvers/yup';
import { Crown, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Button from '../Components/Button.jsx';
import Input from '../Components/Input';
import { api } from '../services/api.js';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const schema = yup
    .object({
      name: yup.string().required('Insira seu nome'),
      email: yup.string().email().required('Insira seu email'),
      password: yup
        .string()
        .min(6, 'A senha deve ter no minimo 6 caracteres')
        .required('Insira sua senha'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
        .required('As senhas devem ser iguais'),
      nickname: yup.string().required('Insira seu nickname'),
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
      const { status } = await api.post(
        '/users',
        {
          name: data.name,
          email: data.email,
          password: data.password,
          nickname: data.nickname,
        },
        {
          validateStatus: () => true,
        },
      );
      if (status === 201 || status === 200) {
        setTimeout(() => {
          navigate('/');
        }, 2300);
        toast.success('Cadastro realizado com sucesso! Bem Vindo!');
      } else if (status === 409) {
        toast.error('Email ja cadastrado! Tente novamente!');
      } else {
        throw new Error();
      }
    } catch (_error) {
      toast.error('Falha ao cadastrar! Tente novamente!');
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
            <h3 className="text-xl font-bold text-white">Criar Conta</h3>
            <p className="text-sm text-gray-400">Junte-se à nossa comunidade</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-4"
          >
            <div>
              <Input
                label="Nome"
                icon={<User className="text-[#6B7280] md:w-5" />}
                placeholder="Insira seu nome"
                {...register('name')}
                error={errors?.name?.message}
                fullWidth={true}
              />
              <p className="text-red-500">{errors?.name?.message}</p>
              <Input
                label="Email"
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
                placeholder="**********"
                {...register('password')}
                error={errors?.password?.message}
                fullWidth={true}
              />
              <p className="text-red-500">{errors?.password?.message}</p>
              <Input
                label="Confirmar Senha"
                type="password"
                icon={<Lock className="text-[#6B7280] md:w-5" />}
                placeholder="**********"
                {...register('confirmPassword')}
                error={errors?.password?.message}
                fullWidth={true}
              />
              <p className="text-red-500">{errors?.confirmPassword?.message}</p>
              <Input
                label="Nickname"
                icon={<Crown className="text-[#6B7280] md:w-5" />}
                placeholder="Insira seu nickname"
                {...register('nickname')}
                error={errors?.nickname?.message}
                fullWidth={true}
              />
              <p className="text-red-500">{errors?.nickname?.message}</p>
            </div>
            <div className="flex items-center justify-center gap-2 flex-col">
              <Button type="submit" disabled={loading} className={'md:w-[400px] w-60'}>
                Criar Conta
              </Button>
              <p className="text-gray-300 mt-4">
                Já tem conta?
                <Link
                  to="/login"
                  className="ml-2 text-violet-500 hover:underline"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
