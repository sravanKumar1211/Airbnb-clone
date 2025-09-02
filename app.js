const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing")
const path=require('path');


main().then(()=>{
    console.log('connected to DB')
}).catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{
    res.send('hii, iam root');
});

app.get('/listings',async(req,res)=>{
   let allListings= await Listing.find({})
   res.render('listings/index.ejs',{allListings})
});

// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"new villa",
//         description:"near to beach",
//         price:4000,
//         location:'hyderabad',
//         country:'india'
//     });
//     await sampleListing.save()
//     console.log('sample saved');
//     res.send('sample saved successfully')
// })
app.listen(8000,()=>{
    console.log('server listening to 8000')
})