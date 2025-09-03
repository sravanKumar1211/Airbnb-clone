const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing")
const path=require('path');
const methodOverride=require('method-override')



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
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.get('/',(req,res)=>{
    res.send('hii, iam root');
});

app.get('/listings',async(req,res)=>{
   let allListings= await Listing.find({})
   res.render('listings/index.ejs',{allListings})
});

//new Rute

app.get('/listings/new',async(req,res)=>{
  res.render('listings/new.ejs')
});

// Show route

app.get('/listings/:id',async(req,res)=>{
   let {id}=req.params;
   const listing=await Listing.findById(id);
   res.render("listings/show.ejs",{listing})
});

//Create Route
app.post('/listings',async(req,res)=>{
   // let{title,Description,image,Price,Location}=req.body;   
   const newListing=new Listing(req.body.listing)
   await newListing.save();
   res.redirect('/listings')  
});

//Edit Route

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
//Delete Route

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
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