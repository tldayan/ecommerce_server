
const allowedOrigins = ["https://ecomxpress.vercel.app"]

const corsOptions = {

  origin : (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1 /* || !origin */) {
      callback(null, true)
    } else {
      callback(new Error("not allowed by cors"))
    }
  },
  credentials : true,
  optionSuccessStatus : 200
}

module.exports = corsOptions