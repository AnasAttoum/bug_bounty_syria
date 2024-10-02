import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'


export interface company {
    signUpType: 0,
    id?: string,
    image: string,
    name: string,
    phone: string,
    email: string,
    domain: string,
    description: string,
    people: string,
    type: string,
    createAt: string
}
export interface SR {
    name: string,
    employess_count: string,
    type: string,
    email: string,
    password: string,
    domain: string
}

export const registerCompany = createAsyncThunk(
    'user/registerCompany',
    async (data: FormData) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API}/company/register`,
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                }
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return error.response.data.error
        }
    }
)
export const registerSR = createAsyncThunk(
    'user/registerSR',
    async (data: FormData) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API}/researcher/register`,
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                }
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return error.response.data.error
        }
    }
)

export const code = createAsyncThunk(
    'user/code',
    async ({ uuid, data }: { uuid: string, data: FormData }) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API}/researcher/register/${uuid}`,
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                }
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return error.response.data.error
        }
    }
)
export const logIn = createAsyncThunk(
    'user/logIn',
    async (data: FormData) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API}/company/login`,
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                }
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return error.response.data.error
        }
    }
)

const initialState: { isLogged: boolean, token: string, user: company, loadingCompany: string, loadingSR: string, loadingCode: string, loadingLogIn: string } = {
    isLogged: false,
    token: '',
    user: { signUpType: 0, id: '', name: '', email: '', phone: '', image: '', people: '', type: '', description: '', domain: '', createAt: '' },
    loadingCompany: '',
    loadingSR: '',
    loadingCode: '',
    loadingLogIn: '',
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
        builder.addCase(registerCompany.fulfilled, (state) => {
            state.loadingCompany = 'fulfilled'
        })
            .addCase(registerCompany.pending, (state) => {
                state.loadingCompany = 'pending'
            })
            .addCase(registerCompany.rejected, (state) => {
                state.loadingCompany = 'rejected'
            })


            .addCase(registerSR.fulfilled, (state) => {
                state.loadingSR = 'fulfilled'
            })
            .addCase(registerSR.pending, (state) => {
                state.loadingSR = 'pending'
            })
            .addCase(registerSR.rejected, (state) => {
                state.loadingSR = 'rejected'
            })



            .addCase(code.fulfilled, (state) => {
                state.loadingCode = 'fulfilled'
            })
            .addCase(code.pending, (state) => {
                state.loadingCode = 'pending'
            })
            .addCase(code.rejected, (state) => {
                state.loadingCode = 'rejected'
            })



            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(logIn.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingLogIn = 'fulfilled'
                if (typeof action.payload !== 'string') {
                    state.token = action.payload.data.data.token
                    state.user = {
                        signUpType: 0,
                        id: action.payload.data.data.company.uuid,
                        image: action.payload.data.data.company.logo,
                        name: action.payload.data.data.company.name,
                        phone: action.payload.data.data.company.phone,
                        email: action.payload.data.data.company.email,
                        domain: action.payload.data.data.company.domain,
                        description: action.payload.data.data.company.description,
                        people: action.payload.data.data.company.employess_count,
                        type: action.payload.data.data.company.type,
                        createAt: action.payload.data.data.company.created_at
                    }
                }
            })
            .addCase(logIn.pending, (state) => {
                state.loadingLogIn = 'pending'
            })
            .addCase(logIn.rejected, (state) => {
                state.loadingLogIn = 'rejected'
            })
    },
})

export const { login } = userSlice.actions

export default userSlice.reducer