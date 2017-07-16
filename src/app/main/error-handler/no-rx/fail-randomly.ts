export function failRandomly() {
    const num = Math.ceil(Math.random() * 10);
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            if (num % 2 === 0) {
                resolve(num);
            } else {
                reject(new Error(`error ${num}`))
            }
        }, 100)
    })
}
