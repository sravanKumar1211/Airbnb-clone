
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },       
    description:String,          
    image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://media2.thrillophilia.com/images/photos/000/358/386/original/1602336667_76.jpg?width=975&height=600",
      set: (v) =>
        v === ""
          ? "https://media2.thrillophilia.com/images/photos/000/358/386/original/1602336667_76.jpg?width=975&height=600"
          : v,
    },
  }, 
    price:Number,           
    location:String,                   
    country:String
});


const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing