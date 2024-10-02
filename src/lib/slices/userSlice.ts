import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    // headers: { 'Authorization': `Bearer ${token}` },
});

export interface company {
    signUpType?: 0,
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
    signUpType?: 1,
    code: boolean,
    id: string,
    name: string,
    image: string,
    email: string,
    phone: string,
    createAt: string
    points: string
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
// export const logOutComapny = createAsyncThunk(
//     'user/logOutComapny',
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     async (_, { getState }: any) => {
//         const token = getState().reducers.user.token
//         try {
//             return await api.post(`/company/company/logout`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     },
//                 }
//             )
//         }
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         catch (error: any) {
//             return error.response.data.error
//         }
//     }
// )

export const homeCompany = createAsyncThunk(
    'user/homeCompany',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (_, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.get(`/company/home`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return error.response.data.error
        }
    }
)

export const reports = createAsyncThunk(
    'user/reports',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (_, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.get(`/company/all_report`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return error.response.data.error
        }
    }
)

export const updateCompanyProfile = createAsyncThunk(
    'user/updateCompanyProfile',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: FormData, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.post(`/company/profile`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return error.response.data.error
        }
    }
)

export const updateCompanyPassword = createAsyncThunk(
    'user/updateCompanyPassword',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: FormData, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.post(`/company/changePassword`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return error.response.data.error
        }
    }
)


const initialState: { token: string, user: company, SRs: SR[], reports: [], loadingCompany: string, loadingSR: string, loadingCode: string, loadingLogIn: string, loadingCompanyProfile: string, loadingCompanyPassword: string } = {
    token: '',
    user: { signUpType: 0, id: '', name: '', email: '', phone: '', image: '', people: '', type: '', description: '', domain: '', createAt: '' },
    SRs: [],
    reports: [],
    loadingCompany: '',
    loadingSR: '',
    loadingCode: '',
    loadingLogIn: '',
    loadingCompanyProfile: '',
    loadingCompanyPassword: '',
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            return {
                ...state,
                token: '',
                user: { signUpType: 0, id: '', name: '', email: '', phone: '', image: '', people: '', type: '', description: '', domain: '', createAt: '' },
                SRs: [],
                loadingCompany: '',
                loadingSR: '',
                loadingCode: '',
                loadingLogIn: '',
                loadingCompanyProfile: '',
                loadingCompanyPassword: '',
            }
        }
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

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(homeCompany.fulfilled, (state, action: PayloadAction<any>) => {
                state.SRs = action.payload.data.data.researcher.map((SR: {
                    uuid: string, name: string, email: string, phone: string, code: string, image: string, points: string, created_at: string
                }) => {
                    return {
                        code: SR.code,
                        id: SR.uuid,
                        name: SR.name,
                        image: SR.image,
                        email: SR.email,
                        phone: SR.phone,
                        createAt: SR.created_at,
                        points: SR.points
                    }
                })
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(reports.fulfilled, (_state, action: PayloadAction<any>) => {
                console.log(action.payload.data.data)
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(updateCompanyProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingCompanyProfile = 'fulfilled'
                if (typeof action.payload !== 'string')
                    state.user = {
                        ...state.user,
                        name: action.payload.data.data.name,
                        email: action.payload.data.data.email,
                        type: action.payload.data.data.type,
                        description: action.payload.data.data.description,
                        image: action.payload.data.data.logo,
                        domain: action.payload.data.data.domain,
                        people: action.payload.data.data.employess_count,
                    }
            })
            .addCase(updateCompanyProfile.pending, (state) => {
                state.loadingCompanyProfile = 'pending'
            })
            .addCase(updateCompanyProfile.rejected, (state) => {
                state.loadingCompanyProfile = 'rejected'
            })

            .addCase(updateCompanyPassword.fulfilled, (state) => {
                state.loadingCompanyPassword = 'fulfilled'
            })
            .addCase(updateCompanyPassword.pending, (state) => {
                state.loadingCompanyPassword = 'pending'
            })
            .addCase(updateCompanyPassword.rejected, (state) => {
                state.loadingCompanyPassword = 'rejected'
            })

    },
})


export const { logOut } = userSlice.actions

export default userSlice.reducer