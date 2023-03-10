export async function registrationGenerator() {

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let registration = '';

    registration += letters.charAt(Math.floor(Math.random() * letters.length));
    for (let i = 0; i < 3; i++) {
      registration += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return registration
}