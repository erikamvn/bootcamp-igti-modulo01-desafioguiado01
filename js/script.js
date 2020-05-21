window.addEventListener('load',start);

var golbalNames = ['Um', 'Dois', 'Três', 'Quatro']
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start(){

    inputName = document.querySelector('#inputName');

    preventFormSubmit();    
    activateInput();
    render();
}

function preventFormSubmit(){

    function handleFormSubmit(event){
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput(){
    function insertName(newName){
        golbalNames.push(newName);
        render();
    }

    function updateName(newName){
        golbalNames[currentIndex] = newName;
        render();
    }

    function handleTyping(event){
        if (event.key === 'Enter' && event.target.value.trim() !== ''){
            if(isEditing){
                updateName(event.target.value);
            }else{
                insertName(event.target.value);
            }

            isEditing = false;
            clearInput();
        }
    }

    inputName.focus();
    inputName.addEventListener('keyup', handleTyping);
}

function render(){
    function createButtonDelete(index){
        function deleteName(){
            golbalNames.splice(index,1);
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';
        
        button.addEventListener('click', deleteName)

        return button;
    }

    function createSpan(name, index){
        function editItem(){
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }

        var span = document.createElement('sapn');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span;

    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for(var i = 0; i < golbalNames.length; i++){
        
        var currentName = golbalNames[i];

        var li = document.createElement('li');
        
        var button = createButtonDelete(i);

        var span = createSpan(currentName, i);
        
        
        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }
    divNames.appendChild(ul);

    clearInput();
}

function clearInput(){
    inputName.value = '';
    inputName.focus();
}