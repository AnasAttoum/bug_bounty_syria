import { createSlice } from "@reduxjs/toolkit";

export interface securityResearcher {
    signUpType: 0,
    id?: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    code: string,
}

const initialState: { isLogged: boolean, securityResearcher: securityResearcher[] } = {
    isLogged: false,
    securityResearcher: [
        { id: 0, name: 'أنس عتوم', email: 'Anas@gmail.com', phone: '0951931846', password: '0123456789', code: 'C5E4RR7',signUpType: 0, },
    ]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            return { ...state, isLogged: true }
        },
    }
})

export const { login } = userSlice.actions

export default userSlice.reducer