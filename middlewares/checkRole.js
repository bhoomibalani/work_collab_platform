const checkRole = (roles)=>{
    return(req,res,next)=>{
        console.log("abc",req.user.role);
        if(!req.user||!roles.includes(req.user.role)){
            return res.status(403).send({
                success:false,
                message:"Access denied :insufficient permissions",
            });
        }
         next();
    }
}

module.exports =checkRole;