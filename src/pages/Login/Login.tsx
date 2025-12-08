import { Mail, XIcon, Facebook, Lock } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { Button } from '../../shared/ui/button';
import isnatance from '../../shared/lib/axios/axios';
import { useUser } from '../../shared/hooks/userContext';

interface LoginResponse {
  status: number;
  data: {
    token_key?: string;
    token?: string;
    [key: string]: any;
  };
}

interface User {
  email: string;
  [key: string]: any;
}

interface UserContextType {
  saveUser: (user: User) => void;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { saveUser } = useUser();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: LoginResponse = await isnatance.post('/auth/login', { email, password });
      if (response.status === 200) {
        const token = response.data.token_key || response.data.token;
        if (token) localStorage.setItem('token', token);
        const returnedUser: User = {
          email: response.data.email || email,
          ...response.data.user,
          ...response.data,
        };
        saveUser(returnedUser);
        console.log('Login successful:', response.data);
        window.location.href = '/';
        return;
      }
    } catch (err) {
      try {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        params.append('grant_type', 'password');
        const res = await isnatance.post('/token', params.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        if (res.status === 200) {
          const token = res.data.access_token || res.data.token;
          if (token) localStorage.setItem('token', token);
          const returnedUser: User = { email };
          saveUser(returnedUser);
          window.location.href = '/';
          return;
        }
      } catch (e) {
        console.error('Login error:', e);
        alert('Invalid email or password');
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center m-auto ">
      <div className="w-[471px] h-[600px] bg-white border border-gray-300 rounded shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1
            className="text-[30px] font-bold pt-6"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            LOGIN
          </h1>
          <div className='relative bottom-5'>
            <XIcon onClick={() => { window.location.href = '/'; }} className="cursor-pointer" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
          <div className="flex items-center border-b border-gray-300">
            <Mail className="w-5 h-5 mr-2 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1 mt-10">
            <div className="flex items-center border-b border-gray-300">
              <Lock className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 outline-none"
                required
              />
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Функция восстановления пароля не реализована'); }} className="text-sm text-orange-500 self-end hover:underline">Forgot password?</a>
          </div>

          <Button type='submit' className="m-auto flex items-center bg-[linear-gradient(90deg,#f97316,#ea580c)] justify-center w-[143px] h-[48px] ">
            Login
          </Button>

          <div className="text-center text-gray-900 text-sm mt-8">Or login with</div>

          <div className="flex items-center justify-center gap-2">
            <Button
              className="flex items-center justify-center w-[168px] h-[45px] font-bold font-Inter"
              type="button"
              onClick={() => alert('Вход через Facebook пока не реализован')}
            >
              <Facebook className="w-5 h-5 mr-2 text-[#3B5998]" />
              Facebook
            </Button>
            <Button
              className="flex text-center justify-center items-center w-[168px] h-[45px] font-bold font-Inter"
              type="button"
              onClick={() => alert('Вход через Google пока не реализован')}
            >
              <img src="/google.svg" alt="Google logo" className="w-5 h-5 mr-2" />
              Google
            </Button>
          </div>

          <div className="text-center text-[16px] mt-10">
            Don’t have an account?{' '}
            <a href="/register" className="text-orange-500 font-semibold hover:underline">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}
