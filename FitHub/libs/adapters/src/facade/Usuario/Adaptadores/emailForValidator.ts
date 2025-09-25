import emailValidator from '../../../../../core/src/usuarios/provider/ProvedoremailValidator';

export default class emailForValidator implements emailValidator {
    validar(email: string): string {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email.trim()) ? email.trim() : '';
    }
}