export async function RefreshToken() {
    return new Promise((resolve, reject) => {
        fetch("/api/auth/refresh-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                const data = await res.json();

                if (res.status == 401) {
                    return reject("401 Unauthorized");
                }

                if (data.access_token) {
                    localStorage.setItem("access_token", data.access_token);
                    return resolve(data.access_token);
                }

                reject();
            })
            .catch((error) => {
                console.error((error as Error).message);

                reject("500");
            });
    });
}