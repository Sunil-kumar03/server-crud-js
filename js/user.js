let fName = document.getElementById('name') ;
let fEmail = document.querySelector('#email');
let fMobile = document.getElementById('mobile');
const URL = 'http://localhost:5000'

let users = [];

const submitHandler = async (event) =>{
    event.preventDefault(); // to avoid page refresh
    const data ={
        name: fName.value ,
        email: fEmail.value ,
        mobile : fMobile.value
    }
    console.log(`new user =`,data)

    let extEmail = users.find((item) => item.email === data.email)
    let extMobile = users.find((item) => item.mobile === data.mobile)

    if (extEmail) {
        alert(`${data.email} already exists`);
    } else if(extMobile) {
        alert(`${data.mobile}already exists`)
    }else{
        await fetch(`${URL}/users`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then(out => out.json())
        .then(res =>{
            alert('User data created successfully');
            window.location.href = "http://127.0.0.1:5500/CRUD/index.html";
        }).catch(err => console.log(err.message));
    }
}

// to print the data
let userDom = document.querySelector('#users')

function printData(users){
    users.forEach((item)=>{
        userDom.innerHTML +=`<div class="col-md-4 mt-2 mb-2">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title text-center text-success">${item.name}</h3>
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                                <strong>Email</strong>
                                                <span class="float-end text-success">${item.email}</span>
                                            </li>
                                            <li class="list-group-item">
                                                <strong>Mobile</strong>
                                                <span class="float-end text-success">${item.mobile}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-footer">
                                        <a href ="update.html?id=${item.id}" class="btn btn-success">Edit</a>
                                        <button class="btn btn-danger float-end" onclick="deleteUser('${item.id}')">Delete</button>
                                    </div>
                                </div>
                            </div>`
    })
}

//to delete the user data
const deleteUser= async (id) =>{
    console.log(`id =`,id);
    if(window.confirm(`Are you sure to delete user id = ${id}?`)){
        await fetch(`http://localhost:5000/users/${id}`,{
            method:"DELETE",
            headers:{"COntent-Type":"application/json"}
        }).then(out => out.json())
        .then(res =>{
            alert(`User deleted successfully`);
            window.location.reload();
        }).catch(err => console.log(err.message))
    }
}

//read the users data from api
(function(){
    fetch(`${URL}/users`,{
        method:"GET",
        headers:{"Content-Type":"application/json"}
    }).then(out => out.json())
    .then(res =>{
        console.log(`users =`, res);
        users = res;
        printData(res)
    }).catch(err => console.log(err.message));
})()