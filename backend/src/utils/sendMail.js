import resend from '../config/resend.js'; // Ensure the path is correct


export const sendMail = async ({ to, subject, text, html }) => {
    try {
        return await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "delivery@resend.dev",
            subject,
            text,
            html
        });
    } catch (error) {
        console.error("Email sending failed:", error);
        return { error: error.message };
    }
}