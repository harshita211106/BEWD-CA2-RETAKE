const express=require('express');
const app=express();
app.use(express.json());

const users=[
    {email:"alice@example.com",password:"alice123"},
    {email:"bob@example.com",password:"bob123"},
    {email:"charlie@example.com",password:"charlie123"},
]

// put endpoint
app.put('/user/update',(req,res)=>{
    try{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(404).json({message:"all fields are necessary"});
    }
    
    const user=users.find(u=>u.email===email);
    if(!user){
        return res.json({message:"Email not found"});
    }
    user.password=password;
    return res.status(200).json({message:"password changed successfully"});}
    catch{
        res.json(err)
    }
    
    
})

// delete endpoint
app.delete('/user/delete',(req,res)=>{
    try{
    const {email}=req.body;
    // console.log(email);
    if(!email){
        return res.status(404).json({message:"Email is necessary"});
    }

    const user=users.find(u=>u.email===email)
    // console.log(user)

    if(user){
        const index=users.findIndex(u=>u.email==email)
        // console.log(index);
        if(index!=-1){
            users.splice(index,1);
            // console.log("deleted")
            return res.status(200).json({message:'User deleted successfully'})
        }
    return res.status(400).json({message:"Email not found"});

    }}
    catch{console.error()};
  
    

})


const port=2200;
app.listen(port,()=>console.log(`Your app is running on ${port}`));
