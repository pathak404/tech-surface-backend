
declare global{
    namespace NodeJS{
        interface ProcessEnv{
            FRONTEND_URL: string,
            SECRET_KEYPHRASE: string,
            PORT: number,
            MONGODB_URL: string,
        }
    }
    namespace Express{
        interface Response{
            sendResponse: (data: Record<string, any>, statusCode: number = 200) => void
        }
        interface Request{
            isAdmin: boolean,
            userId: string,
        }
    }
}

// this file has no import/export statements (i.e. is a script)
// converting it into a module by adding an empty export statement
// Ensure this file is treated as a module

export {}
