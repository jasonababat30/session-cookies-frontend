export type LoginErrorObj = {
    username?: string;
    password?: string;
    others?: string;
}

type ValidateLoginFormResult = {
    success: boolean;
    errors: LoginErrorObj | null;
}

export const validateLoginForm = (username: string, password: string): ValidateLoginFormResult => {
    const credentials = {
        username,
        password
    };

    const errors = Object.entries(credentials).reduce(
        (acc, [key, value]) => {
            if (!value) {
                return {
                    ...acc,
                    [key]: `${key === "username" ? "Username" : "Password"} is required`
                }
            }

            return acc;
        },
        {} as LoginErrorObj
    );

    const hasErrors = !!Object.keys(errors).length;

    if (hasErrors) {
        return {
            success: false,
            errors
        }
    }

    return { success: true, errors: null }
}
