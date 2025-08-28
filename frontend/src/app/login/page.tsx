import { login } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-family: 'Inter', sans-serif;
  background-image: url('https://sisaps.saude.gov.br/eventos/public/img/fundo_login.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const DivisionInformations = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormWrapper = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem;
  color: #ffffff;
  background: linear-gradient(
    45deg,
    #007bff,
    #00c4ff
  );

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const BoxImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 2rem;

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: left;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  color: #333333;
  transition: box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
  }

  &::placeholder {
    color: #888;
  }
`;

const RememberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  
  a {
    color: #ffffff;
    text-decoration: none;
    transition: text-decoration 0.2s;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #32cd32;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #27ae60;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #229954;
    transform: translateY(0);
  }
`;



export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

const loginUser = async (email: string, password: string, e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  try {
    const response = await login({ email, password });
    console.log("Login bem-sucedido:", response);
    // Aqui você pode adicionar a lógica para armazenar o token, redirecionar o usuário, etc.
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    // Lidar com o erro, como exibir uma mensagem para o usuário
  }
};
  return (
    <PageContainer>
      <DivisionInformations>
        <FormWrapper onSubmit={(e) => loginUser(email, password, e)}>
          <Title>Entrar no sistema</Title>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e:any) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e:any) => setPassword(e.target.value)}
            required
          />
          <RememberContainer>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="checkbox" /> Remember
            </label>
            <a href="#">Forgot Password?</a>
          </RememberContainer>
          <SubmitButton type="submit">SUBMIT</SubmitButton>
        </FormWrapper>
        <BoxImage>
          <img
            src="10782895_19199299.jpg"
            alt="Login Illustration"
          />
        </BoxImage>
      </DivisionInformations>
    </PageContainer>
  );
}
