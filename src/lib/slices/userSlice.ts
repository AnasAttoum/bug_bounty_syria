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
    phone?: string,
    email?: string,
    domain: string,
    description: string,
    people: string,
    type: string,
    createdAt?: string
}
export interface SR {
    signUpType?: 1,
    code: string,
    id: string,
    name: string,
    image: string,
    email: string,
    phone: string,
    points: string,
    createdAt: string,
    description?: string
}
export interface program {
    uuid: string,
    title: string,
    description: string,
    url: string,
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
        // eslint-disable-next-line@typescript-eslint/no-explicit-any
        catch {
            try {
                return await axios.post(`${import.meta.env.VITE_API}/researcher/login`,
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
export const homeSR = createAsyncThunk(
    'user/homeSR',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (_, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.get(`/researcher/home`,
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
export const showCompany = createAsyncThunk(
    'user/showCompany',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (_data, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.get(`/company/show`,
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
export const updateSRProfile = createAsyncThunk(
    'user/updateSRProfile',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: FormData, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.post(`/researcher/profile`,
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

export const getPrograms = createAsyncThunk(
    'user/programs',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (_data, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.get(`/company/all_product`,
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

export const addProgram = createAsyncThunk(
    'user/addProgram',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: FormData, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.post(`/company/add_product`,
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

export const deleteProgram = createAsyncThunk(
    'user/deleteProgram',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: FormData, { getState }: { getState: () => any }) => {
        const token = getState().reducers.user.token
        try {
            return await api.post(`/company/delete_product?=`,
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


const initialState: { token: string, signUpType: 0 | 1, user: company, userSR: SR, SRs: SR[], companies: company[], reports: [], programs: program[], loadingCompany: string, loadingSR: string, loadingCode: string, loadingLogIn: string, loadingCompanyProfile: string, loadingSRProfile: string, loadingCompanyPassword: string } = {
    token: '',
    signUpType: 0,
    user: { signUpType: 0, id: '', name: '', email: '', phone: '', image: '', people: '', type: '', description: '', domain: '', createdAt: '' },
    userSR: { signUpType: 1, code: '', id: '', name: '', image: '', email: '', phone: '', points: '', createdAt: '' },
    SRs: [],
    companies: [],
    reports: [],
    programs: [],
    loadingCompany: '',
    loadingSR: '',
    loadingCode: '',
    loadingLogIn: '',
    loadingCompanyProfile: '',
    loadingSRProfile: '',
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
                signUpType: 0,
                user: { signUpType: 0, id: '', name: '', email: '', phone: '', image: '', people: '', type: '', description: '', domain: '', createdAt: '' },
                userSR: { signUpType: 1, code: '', id: '', name: '', image: '', email: '', phone: '', points: '', createdAt: '' },
                SRs: [],
                companies: [],
                reports: [],
                programs: [],
                loadingCompany: '',
                loadingSR: '',
                loadingCode: '',
                loadingLogIn: '',
                loadingCompanyProfile: '',
                loadingSRProfile: '',
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
                    if (action.payload.data.data.company !== undefined) {
                        state.token = action.payload.data.data.token
                        state.signUpType = 0
                        state.user = {
                            signUpType: 0,
                            id: action.payload.data.data.company.uuid,
                            image: action.payload.data.data.company.logo,
                            name: action.payload.data.data.company.name,
                            phone: action.payload.data.data.company.phone,
                            email: action.payload.data.data.company.email,
                            domain: action.payload.data.data.company.domain,
                            description: action.payload.data.data.company.description || '',
                            people: action.payload.data.data.company.employess_count,
                            type: action.payload.data.data.company.type,
                            createdAt: action.payload.data.data.company.created_at
                        }
                    }
                    else {
                        state.token = action.payload.data.data.token
                        state.signUpType = 1
                        state.userSR = {
                            signUpType: 1,
                            code: action.payload.data.data.researcher.code,
                            id: action.payload.data.data.researcher.uuid,
                            name: action.payload.data.data.researcher.name,
                            image: '',
                            email: action.payload.data.data.researcher.email,
                            phone: action.payload.data.data.researcher.phone,
                            createdAt: action.payload.data.data.researcher.created_at,
                            points: action.payload.data.data.researcher.points
                        }
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
                if (action.payload.data !== undefined)
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
                            createdAt: SR.created_at,
                            points: SR.points
                        }
                    })
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(homeSR.fulfilled, (state, action: PayloadAction<any>) => {
                state.companies = action.payload.data.data.companies.map((company: {
                    uuid: string, description: string, name: string, email: string, type: string, domain: string, logo: string, employess_count: number
                }) => {
                    return {
                        id: company.uuid,
                        image: company.logo,
                        name: company.name,
                        email: company.email,
                        domain: company.domain,
                        description: company.description,
                        people: company.employess_count,
                        type: company.type,
                        createdAt: ''
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
                // if (typeof action.payload !== 'string') {
                //     state.user = {
                //         signUpType: 0,
                //         id: state.user.id,
                //         phone: state.user.phone,
                //         createdAt: state.user.createdAt,
                //         name: action.payload.data.data.name,
                //         email: action.payload.data.data.email,
                //         type: action.payload.data.data.type,
                //         description: action.payload.data.data.description,
                //         image: action.payload.data.data.logo,
                //         domain: action.payload.data.data.domain,
                //         people: action.payload.data.data.employess_count,
                //     }
                // }

            })
            .addCase(updateCompanyProfile.pending, (state) => {
                state.loadingCompanyProfile = 'pending'
            })
            .addCase(updateCompanyProfile.rejected, (state) => {
                state.loadingCompanyProfile = 'rejected'
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(showCompany.fulfilled, (state, action: PayloadAction<any>) => {
                console.log('done',action.payload.data.data)
                if (typeof action.payload !== 'string') {
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
                }

            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(updateSRProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingSRProfile = 'fulfilled'
                if (typeof action.payload !== 'string' && action.payload !== undefined) {
                    console.log(action)
                    state.userSR = {
                        ...state.userSR,
                        email: action.payload.data.data.researcher.email,
                        name: action.payload.data.data.researcher.name,
                        phone: action.payload.data.data.researcher.phone,
                    }
                }

            })
            .addCase(updateSRProfile.pending, (state) => {
                state.loadingSRProfile = 'pending'
            })
            .addCase(updateSRProfile.rejected, (state) => {
                state.loadingSRProfile = 'rejected'
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

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(getPrograms.fulfilled, (state, action: PayloadAction<any>) => {
                state.programs = [...action.payload.data.data.products]
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(addProgram.fulfilled, (state, action: PayloadAction<any>) => {
                state.programs.push(action.payload.data.data.product)
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(deleteProgram.fulfilled, (state, action: PayloadAction<any>) => {
                state.programs = state.programs.filter((program) => {
                    return program.uuid !== action.meta.arg.get('uuid')
                })
            })
    },
})


export const { logOut } = userSlice.actions

export default userSlice.reducer