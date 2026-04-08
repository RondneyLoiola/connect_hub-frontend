import {createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({}) //valor inicial = objeto vazio

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({ user: null, loading: true })

    const putUserData = (userInfo) => {
        setUserInfo({ user: userInfo, loading: false })//quando receber informação do usuário

        localStorage.setItem('connecthub:userData', JSON.stringify(userInfo)) //transforma o userInfo em string
    }

    const logout = () => {
        setUserInfo({ user: null, loading: false }) //limpa as informações do usuário
        localStorage.removeItem('connecthub:userData') //remove a chave
        // poderia tbm => localStorage.clear
    }

    useEffect(() => { //quando a aplicação iniciar, vai verificar se há algo no localStorage
        const userInfoLocalStorage = localStorage.getItem('connecthub:userData')

        if(userInfoLocalStorage){// se tiver algo, vai deixar o userInfo atualizado
            setUserInfo({ user: JSON.parse(userInfoLocalStorage), loading: false })//transforma de volta para objeto
        } else {
            setUserInfo({ user: null, loading: false })
        }
    }, [])

    return (
        <UserContext.Provider value={{userInfo, putUserData, logout}}> {/*o que colocar em value vai ser exportado */}
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error('useUser must be a valid context')
    }

    return context
}