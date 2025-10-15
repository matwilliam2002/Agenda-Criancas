import './login.css';
import ImgLogin from "../assets/Img-Login.png"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const [animation, setAnimation] = useState(false);

    const handleAnimation = () => {
        setAnimation(!animation);
    }

    //Login
    const [usuario, setUsuario] = useState(``);
    const [senha, setSenha] = useState('');

    // Cadastrar
    const [email, setEmail] = useState('');
    const [usuarioCad, setUsuarioCad] = useState('');
    const [senhaCadastro, setSenhaCadastro] = useState('');

    const navigate = useNavigate();


    // Login 
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: usuario, senha })
            });

            if (!response.ok) {
                const erro = await response.json();
                alert(erro.message || "Usuário náo encontrado ou desativado");
                return;
            } else {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                const payload = jwtDecode(token);

                if (payload.idPai === null) {
                    navigate('/calendarioPai');
                } else{
                    navigate('/calendarioFilho');
                } 

            }
        }

        catch (error) {
            alert(error.message);
        }
    }

    // Cadastro
    async function handleCad(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/users/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    usuario: usuarioCad,
                    senha: senhaCadastro
                }),
                pai: true
            });

            if (!response.ok) {
                const erro = await response.json();
                alert(erro.message || "Erro desconhecido");
                return;
            }
            else {
                const data = await response.json();
                console.log("Usuário cadastrado com sucesso:", data);
                setEmail("");
                setUsuarioCad("");
                setSenhaCadastro("");
                handleAnimation();

            }
        }
        catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="card-login">
            <div className="card-login-left">
                <div className="card-login-left-center">
                    <form className="form-login" onSubmit={handleLogin}>
                        <h1 className="titulo"> Login </h1>
                        <label>Usuário</label>
                        <input type="text" className="input-usuario" placeholder="Digite seu usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
                        <label>Senha</label>
                        <input type="password" className="input-senha" placeholder="Digite sua senha" value={senha} onChange={e => setSenha(e.target.value)} />
                        <button type="submit" className="btn-login">Entrar</button>
                        <button type="button" className="btn-cadastrar" onClick={handleAnimation}>Cadastrar</button>
                    </form>
                </div>
            </div>
            <div className="card-login-right">
                <div className="card-login-right-center">
                    <h1>Cadastro</h1>
                    <form className="form-cadastro" onSubmit={handleCad}>
                        <label>Email</label>
                        <input type="email" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                        <label>Nome</label>
                        <input type="text" placeholder="Digite seu usuário" value={usuarioCad} onChange={e => setUsuarioCad(e.target.value)} />
                        <label>Senha</label>
                        <input type="password" placeholder="Digite sua senha" value={senhaCadastro} onChange={e => setSenhaCadastro(e.target.value)} />
                        <button type="submit" className="btn-cadastrar">Cadastrar</button>
                        <button type="button" className="btn-login" onClick={handleAnimation}>Login</button>
                    </form>
                </div>
            </div>
            <div className={`card-Img ${animation ? "animar-img" : ""}`}>
                <img src={ImgLogin} alt="Imagem de Login" className="img-login" />
            </div>
        </div>
    );
}

export default Login;