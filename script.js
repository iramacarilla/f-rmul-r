const form = document.querySelector('#form')
const firstName = document.querySelector('#firstName')
const secondName = document.querySelector('#secondName')
const email = document.querySelector('#email')
const checkbox = document.querySelector('#checkbox')
const content = document.querySelector('.productList');
const button = document.querySelector('.form-button')
const editCard = document.querySelector('#editCard')
let users = [];

const validate = (input) => {
if (input.value === '') {
    setError(input, 'Field can not be empty')
    return false
}
else if (input.value.trim().length < 3) {
    setError(input, 'Too short')
    return false
}
else {
    setSuccess(input)
    return true
}
}
const validateEmail = (input) => {
    const found = users.some(user => user.email === input.value);
    const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    if (input.value === '') {
        setError(input, 'Email can not be empty')
        return false
    }
    else if (found) {
        setError(input, 'Email already exist')
        console.log('Email already exist');
        return false
    }
    else if  (!mailFormat.test(input.value)) {
        setError(input, 'Invalid email')
        return false
    }
    else {
        setSuccess(input)
        return true
    }
    }

const validateCheckbox = input => {
    if (input.checked) {
        setSuccess(input)
        return true
    }
    else {
        setError(input, 'Confirm registration')
        return false
    }
}
let inValid = false;

const setError = (input, message) => {
const inputGroup = input.parentElement;
inputGroup.classList.add('invalid');
inputGroup.classList.remove('valid')

const error = inputGroup.querySelector('p');
error.innerText = message;
return false
//inValid = false;

}

const setSuccess = (input) => {
    const inputGroup = input.parentElement;
    inputGroup.classList.remove('invalid')
    inputGroup.classList.add('valid')
    return true
    //inValid = true;
}


const createUser = (firstName, secondName, email) => {
    const user =  {
         id: uuidv4(),
         firstName,
         secondName,
         email
     }
     users.push(user)
     //users = [...users, user]
 }

 const createUserForm = id => {
    editCard.innerHTML = '';
    let user = users.find(user => user.id === id)
   // memberCard.classList.toggle('collapse')
   // editCard.classList.toggle('collapse')
  
    console.log(id)
    let template =
    `
    <div id="editCard">
      <h1>Edit user</h1>
    <div class="row">
        <div class="form-goup ">
          <input type="text" id="firstName-edit" class="form-control" value="${user.firstName}" placeholder="First Name">
          <div class="invalid-feedback">
            Please enter your firstname atleast 2 characters long.
          </div>
        </div>
        <div class="form-goup ">
          <input type="text" id="lastName-edit" class="form-control" value="${user.secondName}" placeholder="Last Name">
          <
        </div>
        <div class="form-goup ">
          <input type="email" id="email-edit" class="form-control" value="${user.email}" placeholder="Please enter your email">
        </div>
       
      
      </div>
      <button type ='submit' id="editUserInput"  >Save</button>
      </div>
      `
  
      editCard.innerHTML = template;
      const firstNameEdit = document.querySelector('#firstName-edit')
      const lastNameEdit = document.querySelector('#lastName-edit')
      const emailEdit = document.querySelector('#email-edit')

      const saveBtn = document.querySelector('#editUserInput')
      saveBtn.addEventListener('click', (e) => {
         // e.preventDefault();
         // const user = users.find(user => user.id === id)
      
        user.firstName = firstNameEdit.value
        user.secondName = lastNameEdit.value
        user.email = emailEdit.value
        console.log("user", user)
        console.log("working")

        content.innerHTML =  createMarkup();
        editCard.classList.add('hide')
      })
  }

const options = e => {
    // console.log(e.target);
    if (e.target.dataset) {
      if (e.target.dataset.btn === 'edit') {
        const id = e.target.closest('[data-id]').dataset.id;
        console.log('edit');
        createUserForm(id);
      } else if (e.target.dataset.btn === 'delete') {
        console.log('delete');
        const id = e.target.closest('[data-id]').dataset.id;
        deleteUser(users, id);
      } else return;
    } else return;
  };

content.addEventListener('click', options)



const createMarkup = () => {

//const template = () => {
    return users.reduce((acc, user) => {
       acc+= `
       <li data-id="${user.id}">
        <p>${user.firstName}</p>
        <p>${user.secondName}</p>
        <p>${user.email}</p>
        <button type="button" data-btn="edit"> Edit </button>
        <button type="button" data-btn="delete"> Delete </button>
        </li>
        `
    return acc
    }, '' )//}
    
    
        //content.innerHTML = template(users);
        
}





form.addEventListener('submit', event => {
   event.preventDefault();
    validate(firstName);
    //validate(secondName);
    //validateEmail(email);
    //validateCheckbox(checkbox);
    if (validate(firstName) && validateEmail(email) && validate(secondName) && validateCheckbox(checkbox) )
    {createUser(firstName.value, secondName.value, email.value)
        content.innerHTML =  createMarkup();
    form.reset();
       
}
})

const deleteUser = (users, id) => { 
    users.splice(users.findIndex(a => a.id === id) , 1)
   // users = [...users.filter(user => user.id !== id)];
    console.log(id);
    console.log(users);
    /*const ind = users.indexOf(users.id)
    console.log(ind);*/
        content.innerHTML =    users.reduce((acc, user) => {
            acc+= `
            <li data-id="${user.id}">
             <p>${user.firstName}</p>
             <p>${user.secondName}</p>
             <p>${user.email}</p>
             <button type="button" data-btn="edit"> Edit </button>
             <button type="button" data-btn="delete"> Delete </button>
             </li>
             `
         return acc
         }, '' )
        //li.closest("li").remove();*/
        return users
        
} 
/*const createUserForm = id => {
   
    const editableUser = users.find(user => user.id === id);
    console.log(editableUser);
    //createMarkup()
    const editUser = {
        id: editableUser.id,
         firstName: editableUser.firstName ,
         secondName: editableUser.secondName,
         email: editableUser.email
    }
    form.firstName.value = editableUser.firstName;
    form.secondName.value = editableUser.secondName;
    form.email.value = editableUser.email

    button.addEventListener('submit', event => {
        editUser.firstName.value = form.firstName.value
        console.log(editUser.firstName.value);
             content.innerHTML =  createMarkup();
         form.reset();
            
     
     console.log(editUser.firstName);
     })
     content.innerHTML =  createMarkup();
  };*/
  /*const updateUser = (id) => {
    const firstNameEdit = document.querySelector('#firstName-edit')
    const lastNameEdit = document.querySelector('#lastName-edit')
    const emailEdit = document.querySelector('#email-edit')
      const user = users.find(user => user.id === id)
  
    user.firstName = firstNameEdit.value
    user.lastName = lastNameEdit.value
    user.email = emailEdit.value
  
    renderUsers()
    console.log("user", user)
  }*/

 
    
  
    //removeFromCart(event);
    //deleteUser();
    


/*button.addEventListener('submit', event => {
    event.preventDefault();
  

    
    createUser(firstName.value, secondName.value, email.value)
    createMarkup()
    form.reset();})*/
/*button.addEventListener('submit', event => {
    event.preventDefault();
    createMarkup(users)
    form.reset();
}

)*/


/*const form = document.querySelector('#form')
const firstName = document.querySelector('#firstName')
const secondName = document.querySelector('#secondName')
const email = document.querySelector('#email')
const checkbox = document.querySelector('#checkbox')
const content = document.querySelector('.productList');
const button = document.querySelector('.form-button')
const users=[];

const validate = (input) => {
if (input.value === '') {
    setError(input, 'Field can not be empty')
}
else if (input.value.trim().length < 3) {
    setError(input, 'Too short')
}
else {
    setSuccess(input)
}
}
const validateEmail = (input) => {
    const mailFormat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (input.value === '') {
        setError(input, 'Email can not be empty')
    }
    else if  (!mailFormat.test(input.value)) {
        setError(input, 'Invalid email')
    }
    else {
        setSuccess(input)
    }
    }

const validateCheckbox = input => {
    if (input.checked) {
        setSuccess(input)
    }
    else {
        setError(input, 'Confirm registration')
    }
}

const setError = (input, message) => {
const inputGroup = input.parentElement;
inputGroup.classList.add('invalid');
inputGroup.classList.remove('valid')

const error = inputGroup.querySelector('p');
error.innerText = message;
}

const setSuccess = (input) => {
    const inputGroup = input.parentElement;
    inputGroup.classList.remove('invalid')
    inputGroup.classList.add('valid')
}


const createUser = (firstName, secondName, email) => {
    const user =  {
         id: uuidv4(),
         firstName,
         secondName,
         email
     }
     users.push(user)
 }

const createMarkup = (users) => {

const template = (users) => {
    return users.reduce((acc, user) => {
       acc+= `
       <li data-id=${user.id} >
        <p>${user.firstName}</p>
        <p>${user.secondName}</p>
        <p>${user.email}</p>
        <button id='edit'> Edit </button>
        <button  id='delete' > Delete </button>
        </li>
        `
    return acc
    }, '' )}
    
    
        content.innerHTML = template(users);

  
        
        const del=  document.querySelector('#delete')
        del.addEventListener('click', e =>{

//const deleteUser = (e) => {
    
        const id = e.target.dataset.id;
        const usersDel = users.filter(user => user.id === id)
        console.log(id);
        console.log(usersDel);})
}




form.addEventListener('input', event => {
    //event.preventDefault();
    validate(firstName);
    validate(secondName);
    validateEmail(email);
    validateCheckbox(checkbox);

    createUser(firstName.value, secondName.value, email.value)
    
    //form.reset();
    //createMarkup(users)
    //deleteUser();
    
})
button.addEventListener('submit', event => {
    event.preventDefault();
    createMarkup(users)
    form.reset();
}

)*/