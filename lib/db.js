import mongoose from "mongoose";

const connectDB = async () => {
    if(mongoose.connections[0].readyState) return; //bagliysa tekrar baglanma

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB baglantisi basarili");
    }catch(error){
        console.error("MongoDB baglantisi basarisiz", error);
        throw error;
    }
};

export default connectDB;