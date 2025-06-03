import React from "react";
import '../style/login.css';
import ImgLogin from "../assets/Img-Login.png"
import { useState } from "react";



function Login(){
    const [animation, setAnimation] = useState(false);

    const handleAnimation = () => {
        setAnimation(!animation);
    }

    return(
        <div className="card-login">  
            <div className="card-login-left"> 
                <div className="card-login-left-center">
                    <form className="form-login">
                        <h1 className="titulo"> Login </h1>
                        <label>Usuário</label>
                        <input type="text" className="input-usuario" placeholder="Digite seu usuário"/>
                        <label>Senha</label>
                        <input type="password" className="input-senha" placeholder="Digite sua senha"/>
                        <button type="submit" className="btn-login">Entrar</button>
                        <button type="button" className="btn-cadastrar" onClickCapture={handleAnimation}>Cadastrar</button>
                    </form>
                </div>
            </div>
            <div className="card-login-right">
                <div className="card-login-right-center">
                    <h1>Cadastro</h1>
                    <form className="form-cadastro">
                        <label>Email</label>
                        <input type="email" placeholder="Digite seu email"/>
                        <label>Usuário</label>
                        <input type="text" placeholder="Digite seu usuário" />
                        <label>Senha</label>
                        <input type="password" placeholder="Digite sua senha" />
                        <button type="submit" className="btn-login" onClick={handleAnimation}>Cadastrar</button>
                        <button type="button" className="btn-cadastrar" onClick={handleAnimation}>Login</button>
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