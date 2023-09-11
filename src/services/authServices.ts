import { User } from './../models/User';
import { UserLogin } from '@/models/User';
import { useRouter } from 'next/navigation';
import { useToastMessage } from '@/hooks/useToast';
import api from '@/services/api';
import Cookie from 'js-cookie';
import { useUserContext } from '@/contexts/UserContext';

// Constantes para chaves de cookie
const TOKEN_COOKIE_KEY = 'token';
const USER_COOKIE_KEY = 'user';


const useSignIn = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const { setToastMessage } = useToastMessage();


  const signIn = async (user: UserLogin) => {
    try {
      const { data } = await api.post('/sessions', user);
      const newUser: User = data.user;

      api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

      Cookie.set(TOKEN_COOKIE_KEY, data.token);
      Cookie.set(USER_COOKIE_KEY, JSON.stringify(newUser));

      setUser(data.user);

      router.push('/alderman');
      setToastMessage(`Bem-vindo ${newUser.name}`, 'success');
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };


  const signOut = () => {

    Cookie.remove(TOKEN_COOKIE_KEY);
    Cookie.remove(USER_COOKIE_KEY);

    setUser(null);

    router.push('/login');
    setToastMessage('Logout realizado com sucesso', 'success');
  };

  const handleApiError = (error: any) => {
    setToastMessage(error.response.data.message, 'error');
  };

  return { signIn, signOut };
};

export default useSignIn;
