import app from "./app";
import { prisma } from "./lib/prisma";
import "dotenv/config";

const PORT=process.env.PORT || 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log("Database Connected Successfully")
        app.listen(PORT,()=>{
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
        })
    } catch (error) {
        console.error("Error Starting The Server :",error);
        await prisma.$disconnect();
        process.exit(1);
        
    }
}
main()