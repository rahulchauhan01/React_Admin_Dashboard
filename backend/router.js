//  import cors from "cors"
import express from "express"// Body ko JSON format mein parse karta hai
import userRoute from "./routes/AuthRoute.js"
import studentRoute from "./routes/studentRoute.js"


const router = (app) => {
    app.get('/', (req, res) => { res.status(200).send({ message: "welcome to app" }) });
    // app.use(express.json());
    // app.use(cors({ origin: 'http://localhost:3000', methods: ["GET", "POST"] }));

    app.use(express.json());// Body ko JSON format mein parse karta hai
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/v1/auth', userRoute);
    app.use('/api/v1', studentRoute);

    app.use((req, res, next) => {
        res.status(404).send({ message: "Route not found" });
        console.log("Request Body Middleware:", req.body);
        next();
    });

}
export default router;