import { useToastMessage } from '../hooks/useToast';
import { UserLogin } from '../models/User';
import api from './api';

interface SignData {
  token: string;
  user: UserLogin | null;
}

const useSignIn = () => {
  const { setToastMessage } = useToastMessage();

  const signIn = async (user: UserLogin): Promise<SignData | undefined> => {
    try {
      const { data } = await api.post('/sessions', user);
      const signData: SignData = {
        token: data.token || '',
        user: data.user || null,
      };
      setToastMessage(`Bem vindo ${data.user.name}`, 'success');
      return signData;
    } catch (error: any) {
      setToastMessage(error.response.data.message, 'error');
      throw error;
    } 
  };

  return { signIn };
};

export default useSignIn;
