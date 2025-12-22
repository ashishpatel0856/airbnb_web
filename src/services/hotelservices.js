import api from "../api/axiosConfig"


export const searchHotels = (params) =>{
    return api.get("/hotels/search", {
        params,
    });
};