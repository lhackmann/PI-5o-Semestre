import React, { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import api from "../Services/api";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUserLogin {
    username: string; // Alterado para string
    email: string;
    password: string;
}

interface IAuthContext {
    user: IUserLogin;
    setUser: (user: IUserLogin) => void;
    handleLogin: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<IUserLogin>({ username: '', email: '', password: '' });

    const handleLogin = async (email: string, password: string) => {
        try {
            console.log("Tentando login com:", { email, password });
    
            const existingToken = await AsyncStorage.getItem('token');
            if (existingToken) {
                return; 
            }
    
            const response = await api.login(email, password);
    
            console.log("Resposta do servidor após login:", response);
    
            if (!response || !response.token) {
                await AsyncStorage.removeItem('token');
                throw new Error('Invalid login credentials');
            }
    
            const { token, username } = response; 
            
            await AsyncStorage.setItem('token', token); 
            setUser({ username, email, password });
            
            router.push('/home'); 
        } catch (error) {
            console.error("Erro durante login:", error);
            if (error instanceof Error && error.message.includes('Invalid')) {
                alert('Credenciais inválidas');
            } else {
                alert('Ocorreu um erro ao fazer login');
            }
            throw error;
        }
    };
    
    return (
        <AuthContext.Provider value={{ user, setUser, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
