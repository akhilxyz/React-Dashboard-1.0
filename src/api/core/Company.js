import companyProvider from '../provider/Company';

export class Company {
    constructor(options) {
        if (options.getCompany) {
            this.getAll = () => {
                return companyProvider.getCompany(options.url);
            };
        }

        if (options.updateCompany) {
            this.getSingle = (id) => {
                return companyProvider.updateCompany(options.url, id);
            };
        }
        if (options.addCompany) {
            this.getSingle = (id) => {
                return companyProvider.addCompany(options.url, id);
            };
        }

        if (options.deletCompany) {
            this.remove = (id) => {
                return companyProvider.deletCompany(options.url, id);
            };
        }
    }
}