import Service from './Service';

class GreenhouseService {

    static endpoint = '/greenhouses';
    static endpointPlant = '/plants';
    static endpointControl = '/controls';

    static get() {
        return new Promise((resolve, reject) => {
            Service.get(`${GreenhouseService.endpoint}/`)
            .then((data) => {
                const da = data;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }

    static getControlsByQs(qs) {
        return new Promise((resolve, reject) => {
            Service.get(`${GreenhouseService.endpointControl}/?${qs}`)
            .then((data) => {
                const da = data;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${GreenhouseService.endpoint}/${id}/`)
            .then((data) => {
                const da = data;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }

    static getPlantById(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${GreenhouseService.endpointPlant}/${id}/`)
            .then((data) => {
                const da = data;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }

    static getByGreenhouseId(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${GreenhouseService.endpointPlant}/?greenhouse=${id}`)
            .then((data) => {
                const da = data;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }

}

export default GreenhouseService;