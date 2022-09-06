

export default function compareinterests(userinterest,room1,room2,room3,room4){

    let room1styles=[]
    let room2styles=[]
    let room3styles=[]
    let room4styles=[]
    room1.forEach(ele=>{
        room1styles.push(ele.parameters.style)
    })
    room2.forEach(ele=>{
        room2styles.push(ele.parameters.style)
    })
    room3.forEach(ele=>{
        room3styles.push(ele.parameters.style)
    })
    room4.forEach(ele=>{
        room4styles.push(ele.parameters.style)
    })



    console.log(userinterest,room1styles,room2styles,room3styles,room4styles)



}
     
    
  