export async function RefreshToken() {
    return fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async res => {
        const data = await res.json();

        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }

        return true;
    }).catch(error => {
        console.error((error as Error).message);

        return false; 
    });
}