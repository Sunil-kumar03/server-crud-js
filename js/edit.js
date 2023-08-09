let fName = document.getElementById('name') ;
let fEmail = document.querySelector('#email');
let fMobile = document.getElementById('mobile');


// reading params from url
let params = window.location.search
let id = new URLSearchParams(params).get('id');

console.log(`id =`,id);

(function (){
    fetch(`http://localhost:5000/users/${id}`,{
        method:"GET",
        headers:{"Content-Type":"application/json"}
    }).then(out => out.json())
    .then(res =>{
        console.log(`data =`,res)
        fName.value = res.name;
        fEmail.value = res.email;
        fMobile.value = res.mobile;
    }).catch(err => console.log(err.message))
})()

// to update the data
function updateUser(event){
    event.preventDefault();
    const data = {
        name:fName.value,
        email:fEmail.value,
        mobile:fMobile.value,
    };
    console.log(`update user =`,data);

    fetch(`http://localhost:5000/users/${id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    }).then(out => out.json())
    .then(res =>{
        alert(`User Updated Successfully`);
    }).catch(err => alert(err.message))
}
