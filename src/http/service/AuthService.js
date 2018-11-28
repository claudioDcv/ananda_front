import Service from './Service';
import { saveTokenAndReturn } from '../../common/utils';


class AuthService {

    static endpoint = '';

    static login(d) {
        return new Promise((resolve, reject) => {
            Service.post(`${AuthService.endpoint}/api-token-auth/`, d, false)
            .then((data) => {
                const da = saveTokenAndReturn(data.token);
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }

    static register(d) {
        return new Promise((resolve, reject) => {
            Service.post(`${AuthService.endpoint}/register`, d)
            .then((data) => {
                const da = data;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }
}

export default AuthService;