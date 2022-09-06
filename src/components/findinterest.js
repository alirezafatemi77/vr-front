
export default function interest(   style){
    /*
    ['realism','expersionism']
    */
    let userinterest={
        RE:0,
        EX:0,
        IM:0,
        FU:0,
        RO:0
    }


    style.forEach(ele=>{
        switch(ele){
            case "Surrealism":{
                userinterest.RE+=0.5
                break;
            }
            case "Realism":{
                userinterest.RE+=1
                userinterest.FU+=0.5
                break;
            }
            case "Expressionism":{
                userinterest.EX+=1
                break;
            }
            case "Abstract Expressionism":{
                userinterest.EX+=0.5
                break;
            }
            case "impressionnisme":{
                userinterest.IM+=1
                userinterest.RO+=0.5
                break;
            }
            case "Post impressionnisme":{
                userinterest.IM+=0.5
                userinterest.RO+=0.5
                break;
            }
            case "Neo impressionnisme":{
                userinterest.IM+=0.5
                userinterest.RO+=0.5
                break;
            }
            case "Cubism":{
                userinterest.FU+=0.5
                break;
            }
            case "Futurism":{
                userinterest.FU+=1
                userinterest.RO+=0.5
                break;
            }
            case "Vorticism":{
                userinterest.RO+=0.5
                userinterest.FU+=0.5
                userinterest.RE+=1
                break;
            }
            case "Romantisme":{
                userinterest.RO+=1
                userinterest.IM+=0.5
                break;
            }
        }
    })
    

 
    return userinterest;
}
     
    
  