export function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

export function isExpired(startTime) {
    var currentTime = Date.now();
    var elapsedTime = currentTime - startTime;
    return elapsedTime >= 120000; // 2 minutes = 120,000 milliseconds
}