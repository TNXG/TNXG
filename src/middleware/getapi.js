const apiEndpoint = 'http://127.0.0.1:5000/api/v1/';

export function getapi(apiname) {
    const api_list = {
        'getbio': 'get_bio',
        'getimg': 'get_img',
        'getmembers': 'get_members',
    };

    if (api_list[apiname] === undefined) {
        return Promise.reject('error');
    } else {
        apiname = api_list[apiname];
    }

    return fetch(apiEndpoint + apiname)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err);
        });
}
