// types.d.ts
export { }; // This makes the file a module.

declare global {
    namespace Express {
        interface User {
            id: string; // Replace with your actual user fields
            email: string;
            role?: string;
        }

        interface Request {
            user?: User; // Use your custom User type here
        }
    }
}
