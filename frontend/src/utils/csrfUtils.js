// need to ask our server for CSRF token. at same time, looking ahead, we can ask server for info about current user
// but need an end point for those things --> we made an #show endpoint for session in the sessions_controller, that gives us
// information about the current user. But not only that, it's giving us the CSRF token (since every single response from our server
// is attaching the csrf token as a header). Since it's a get request, it doesn't require we already have a csrf token. 

// we want to run this function every single time the app loads
export const restoreSession = async () => {
    let res = await fetch('/api/session'); // get request to our session#show
    let token = res.headers.get('X-Csrf-Token'); // read from header of response for the csrf token in the response. this worked regardless of whether it was 'X-Csrf' or 'X-CSRF'
    sessionStorage.setItem('X-CSRF-Token', token); // we will utilize sessionStorage to store the token
    
    // need to do something with the data too from response - can store under a key of currentUser
    // this will ensure that if you close the browser (but hadn't logged out yet), when you open page again, currentUser is still the logged in user (based on the backend database)
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
};

// version of fetch that will wrap around actual fetch
export const csrfFetch = async (url, options) => {
    // customizing for specific behaviors
    options.method ||= 'GET';
    options.headers ||= {};

    // all non-GET requests need CSRF token
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
        if (options.method.toUpperCase() === 'POST' && !(options.body instanceof FormData)) {
            options.headers['Content-Type'] = 'application/json';
        }
    }

    // await for regular fetch
    const res = await fetch(url, options);
    return res;
};