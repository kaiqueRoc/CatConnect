export const host = "http://localhost:4000";

export const routes = {
    getAdocoes: `${host}/adocoes`,
    getStatus: `${host}/status`,
    getAdotantes: `${host}/adotantes`,
    getGatos: `${host}/gatos`,
    createAdocoes: `${host}/adocoes`,
    deleteAdocao: (id) => `${host}/adocoes/${id}`,
};
