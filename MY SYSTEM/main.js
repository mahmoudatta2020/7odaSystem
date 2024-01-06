let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'Create';
let temp ;

// get total
function getTotal()
{
    if(price.value != null && taxes.value != null && ads.value != null )
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else
    {
        total.innerHTML = null ;
        total.style.background = 'rgb(207, 3, 3)';
    }
}

// get create product
let dataPro , newPro ;
if(localStorage.product != null )  // when to make reload the data does not delete
{
    dataPro = JSON.parse(localStorage.product) 
}else{
    dataPro = [];
}

submit.onclick = function()
{
     newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != ''&& price.value != ''&& category.value != ''&& newPro.count < 100){
        if(mood === 'create')
    {
        if(newPro.count > 1)
        {
            for (let i = 0; i < newPro.count; i++) {
            
                dataPro.push(newPro);
                }
        }else{
            dataPro.push(newPro);
            }


    }else{
        dataPro[temp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';

    }
    createData()
    }
    
    
    

    localStorage.setItem('product' , JSON.stringify(dataPro)); // when to make reload the data does not delete

    
    showData()
}




// get createData fun

function createData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read fun

function showData()
{
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {

        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i]?.title}</td>
            <td>${dataPro[i]?.price}</td>
            <td>${dataPro[i]?.taxes}</td>
            <td>${dataPro[i]?.ads}</td>
            <td>${dataPro[i]?.discount}</td>
            <td>${dataPro[i]?.total}</td>
            <td>${dataPro[i]?.category}</td>
            <td><button onclick="updateData(${i})" id="update"> update </button></td>
            <td><button onclick="getDeleteItem(${i})" id="delate"> delete </button></td>
      </tr>
      `   
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0)
    {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> delete All(${dataPro.length}) </button>
        `
    }else{

        btnDelete.innerHTML = '';

    }

}
showData()

// delete fun
function getDeleteItem(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()

}

// delete all fun
function deleteAll(){

    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// count fun

// update fun
function updateData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

// search 
let searchMoood = 'title';
function getSearchMood(id)
{
    let search2 = document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchMoood = 'title';
        search2.placeholder = 'Search By Title';
        
    }else{
        searchMoood = 'category';
        search2.placeholder = 'Search By Category';
        
    }
    search.focus()
    search2.value = '';
    showData()
    
    
    
    
}

function searchData(value)
{
    let table = '';
    if(searchMoood == 'title')
    {
        for(let i = 0 ; i < dataPro.length ; i++)
        { 
            if(dataPro[i].title.includes(value.toLowerCase())){

                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i]?.title}</td>
                        <td>${dataPro[i]?.price}</td>
                        <td>${dataPro[i]?.taxes}</td>
                        <td>${dataPro[i]?.ads}</td>
                        <td>${dataPro[i]?.discount}</td>
                        <td>${dataPro[i]?.total}</td>
                        <td>${dataPro[i]?.category}</td>
                        <td><button onclick="updateData(${i})" id="update"> update </button></td>
                        <td><button onclick="getDeleteItem(${i})" id="delate"> delete </button></td>
                    </tr>
                        ` ;
                
            }



        }





    }
    
    
    
    
    
    else{

        for(let i = 0 ; i < dataPro.length ; i++)
        { 
            if(dataPro[i].category.includes(value.toLowerCase())){

                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i]?.title}</td>
                        <td>${dataPro[i]?.price}</td>
                        <td>${dataPro[i]?.taxes}</td>
                        <td>${dataPro[i]?.ads}</td>
                        <td>${dataPro[i]?.discount}</td>
                        <td>${dataPro[i]?.total}</td>
                        <td>${dataPro[i]?.category}</td>
                        <td><button onclick="updateData(${i})" id="update"> update </button></td>
                        <td><button onclick="getDeleteItem(${i})" id="delate"> delete </button></td>
                    </tr>
                        ` ;
                
            }



        }

    }
    document.getElementById('tbody').innerHTML = table;
}


// clean data 
