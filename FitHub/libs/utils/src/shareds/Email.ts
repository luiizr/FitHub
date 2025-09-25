export class Email {
    static standardizeEmail(email: string): string {
        const trimmed = email.trim().toLowerCase();

    // Special handling for Gmail addresses
    const gmailRegex = /^([^@]+)@gmail\.com$/;
    const match = trimmed.match(gmailRegex);
    if (match) {
        // Remove dots from the local part
        const local = match[1].replace(/\./g, '');
        return `${local}@gmail.com`;
    }

    return trimmed;
}

static isValidEmail(email: string): boolean {
    // Simple RFC 5322 compliant regex for demonstration
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email.trim());
}
}