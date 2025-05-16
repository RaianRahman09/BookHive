import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Create context with default values
export const AuthContext = createContext({
    user: null,
    setUser: () => { },
    logout: () => { }
});

export function AuthProvider({ children }) {
    const history = useHistory();

    // Use lazy initializer to hydrate user synchronously from localStorage
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch {
            localStorage.removeItem('user');
            return null;
        }
    });

    // Whenever user state changes, persist to localStorage
    const saveUser = (userData) => {
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            // assume a token was returned during login
            if (userData.token) localStorage.setItem('token', userData.token);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        setUser(userData);
    };

    const logout = () => {
        saveUser(null);
        history.push('/signin');
    };

    return (
        <AuthContext.Provider value={{ user, setUser: saveUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}