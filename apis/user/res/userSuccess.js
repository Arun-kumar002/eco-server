let Success=({data})=>{
    console.log(data);
    return { message: "successfull", data, status: "success",code:200 };
}
let UpdateSuccess=({data})=>{
    console.log(data,'im');
    return { message: "updated successfully", data, status: "success",code:202 };
}


module.exports={Success,UpdateSuccess}