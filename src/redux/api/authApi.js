import { SetUserInfo } from "../../service/auth.service";
import { baseApi } from "./baseApi"
import { useRole } from "../../components/Login/RoleCheck"

const AUTH_URL = '/auth'

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                data: loginData,
            }),
            async onQueryStarted(loginData, { queryFulfilled, dispatch }) {
                try {
                    const result = (await queryFulfilled).data;
                    console.log(loginData.userRole);
                    loginData.setRole(result.user.role);
                    // toChange
                    await SetUserInfo({ accessToken: result.accessToken });

                } catch (error) {
                }
            },
        }),
        patientSignUp: build.mutation({
            query: (data) => ({
                url: `/patient`,
                method: 'POST',
                data,
            }),
        }),
        doctorSignUp: build.mutation({
            query: (data) => ({
                url: `/doctor`,
                method: 'POST',
                data,
            }),
        }),
        resetPassword: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password`,
                method: 'POST',
                data,
            }),
        }),
        resetConfirm: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password/confirm`,
                method: 'POST',
                data,
            }),
        }),
    })
})

export const {
    useUserLoginMutation,
    useDoctorSignUpMutation,
    usePatientSignUpMutation,
    useResetPasswordMutation,
    useResetConfirmMutation
} = authApi