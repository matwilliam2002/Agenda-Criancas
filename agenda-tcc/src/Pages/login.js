import React from "react";
import '../style/login.css';

function Login(){
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
                        <button type="button" className="btn-cadastrar">Cadastrar</button>
                    </form>
                </div>
            </div>
            <div className="card-login-right">
                
            </div>
        </div>
    );
}

export default Login;


