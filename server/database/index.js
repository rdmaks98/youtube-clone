import mongoose from 'mongoose'
const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("dbconnected");
    }).catch((err) => {
        throw err;
    })
}
export default connect;