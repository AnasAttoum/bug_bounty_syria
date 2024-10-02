import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'

export interface user {
    signUpType: 0,
    id?: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    code: string,
}

export const registerCompany = createAsyncThunk(
    'user/addCompany',
    async (data: FormData) => {
        console.log('RUN', data)
        try {
            return await axios.post(`${import.meta.env.VITE_API}/company/login`,
                {
                    data
                },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                }
            )
        }
        catch (error) {
            console.log('Error in post company', error)
        }
    }
)

const initialState: { isLogged: boolean, user: user } = {
    isLogged: false,
    user: { id: 0, name: 'أنس عتوم', email: 'Anas@gmail.com', phone: '0951931846', password: '0123456789', code: 'C5E4RR7', signUpType: 0, },

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            return { ...state, isLogged: true }
        },
    },
    extraReducers(builder) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.addCase(registerCompany.fulfilled, (state, action: PayloadAction<any>) => {
            console.log(state)
            console.log(action)
        })
    },
})

export const { login } = userSlice.actions

export default userSlice.reducer