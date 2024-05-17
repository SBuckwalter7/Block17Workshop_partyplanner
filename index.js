let partiesTest = [
    {
        id: 1,
        name: "graduation party",
        description: "college gradution woohoo",
        date: "2021-09-30T00:00:00.000Z", // Date ISO string
        location: "123 Street"
      },

      {
        id: 2,
        name: "new job party",
        description: "congrats on the new job!",
        date: "2021-09-30T00:00:00.000Z", // Date ISO string
        location: "San Francisco"
      }

]
//this part is to add in the url content and do API-----------------------------------
let baseUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ghp-et-web-pt/events"

async function getParties(){
    try{
        const response = await fetch(baseUrl)
        console.log(response)
        //by default it is always a string
        //converting string to object
        const parties = await response.json()
        console.log(parties.data) //data is one level deep in console

        parties.data.forEach(party=>createCard(party))

    }catch(error){
        console.error("oh nose?"+error)
    }
}

getParties()

//API Contained above -------------------------------------------------------------------

//so we create a Card via below-----------------
function createCard({id,name,description,date, location}){

    // first create the parent or DIV tag
    let partiesParent = document.createElement("div")
    //this is not needed, but it calls my class="titles" so my same css can be applied to everything new
    partiesParent.className= "card"

    // add children - here we are creating the other <p> elements that will fall in line with the same already in the html
    let idChild = document.createElement("p")
    idChild.className= "id" //only need this for css
    idChild.textContent= id

    let nameChild = document.createElement("p")
    nameChild.className= "name"//only need this for css
    nameChild.textContent= name

    let descriptionChild = document.createElement("p")
    descriptionChild.className= "description"//only need this for css
    descriptionChild.textContent= description

    let dateChild = document.createElement("p")
    dateChild.className= "date"//only need this for css
    dateChild.textContent= date

    let locationChild = document.createElement("p")
    locationChild.className= "location"//only need this for css
    locationChild.textContent= location

    let deleteChild = document.createElement("button")
    deleteChild.innerText= "Delete"
    deleteChild.onclick = ()=> deleteParty(id)

//glue childeren to parents
    partiesParent.append(idChild, nameChild, descriptionChild, dateChild, locationChild, deleteChild)

//glue entire blob back into concole... i think lol

    parties.appendChild(partiesParent)

}
let parties = document.getElementById("parties")

//-------------this is for the button to work??-------------------------------------------
async function deleteParty(id){
    await fetch(baseUrl+ "/" +id,{
        method:"DELETE"
    })
    //how to refresh list of parties through code
        //clear the parent
        parties.innerHTML=""
        //reget (refetch) the parties
        getParties()
}
//-----------------------------------------------------------------------------------------

//this would just be for one
// createCard({ id: "Carol", name: "programmer", description: 70, date: 90, location: "la" });

//this loops over all the parties and adds them all into the website
partiesTest.forEach(party => createCard(party));



// create a function that recieves an object (you can destructe it in the params/input area)
// and in that function create a card and add to your html section parent
// loop through your array and call your function



//make form connect to info and log this into the console---------------------------------

document.getElementById("partyForm").addEventListener("submit", createParty)

async function createParty(event){
    event.preventDefault() //so it does not refresh

    let name = document.getElementById("name").value
    let description = document.getElementById("description").value
    let date = document.getElementById("date").value
    //format date string
    date = new Date(date).toISOString()
    let location = document.getElementById("location").value

    console.log(name, description, date, location)

    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name:name,
            description:description,
            date:date,
            location:location
        })
    })

    const data = await response.json()
    console.log(data)

    //clear the parent
    parties.innerHTML=""
    //reget (refetch) the parties
    getParties()


}

//------------------------------------------------------------------------------------
