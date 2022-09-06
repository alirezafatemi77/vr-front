<template>
  <div class="hello ">
    <h2> select <span class="color">{{maximumSelectedNumber}}</span> images you like, then click on done </h2>
    <div class="image_container">
    <div class=" row ">
        <div v-for="image in images" v-bind:key="image.id" class="image_box" @click="selectimage(image)">
          <img :src="image.src" alt="" class="image_size"   ref="img">
        </div>
      </div>
    </div>
    <button class="button "  @click="analyze()">done!</button>
  </div>
</template>

<script>
import fullystar from "../assets/sampleimages/fullystar.jpeg"
import Cubisme from "../assets/sampleimages/Cubisme.jpeg"
import Expressionism from "../assets/sampleimages/Expressionism.jpeg"
import Impressionnisme from "../assets/sampleimages/Impressionnisme.jpeg"
import Postimpressionnisme from "../assets/sampleimages/Postimpressionnisme.jpeg"
import realism from "../assets/sampleimages/realism.jpeg"
import Romantisme from "../assets/sampleimages/Romantisme.jpeg"
import Surrealism from "../assets/sampleimages/Surrealism.jpeg"
import Vertisism from "../assets/sampleimages/Vertisism.jpeg"
import interest from "./findinterest"
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data(){
    return {
     maximumSelectedNumber:4,
     fullystar:fullystar,
     Cubisme:Cubisme,
     Expressionism:Expressionism,
     Impressionnisme:Impressionnisme,
     realism:realism,
     Romantisme:Romantisme,
     Surrealism:Surrealism,
     Vertisism:Vertisism,
     Postimpressionnisme:Postimpressionnisme,
      images:[
        {id:0,src:fullystar,size:{width:650,height:519},parameters:{color:-1,size:1,style:'Realism',},painter:'vanghook',description:''},
        {id:1,src:Cubisme,size:{width:650,height:519},parameters:{color:1,size:-1,style:'Cubism'},painter:'vanghook',description:''},
        {id:2,src:Expressionism,size:{width:650,height:519},parameters:{color:1,size:1,style:'Expressionism'},painter:'vanghook',description:''},
        {id:3,src:Impressionnisme,size:{width:650,height:519},parameters:{color:1,size:1,style:'impressionnisme'},painter:'vanghook',description:''},
        {id:4,src:realism,size:{width:650,height:519},parameters:{color:0,size:1,style:'Futurism'},painter:'vanghook',description:''},
        {id:5,src:Romantisme,size:{width:650,height:519},parameters:{color:0,size:1,style:'Romantisme'},painter:'vanghook',description:''},
        {id:6,src:Surrealism,size:{width:650,height:519},parameters:{color:0,size:1,style:'Surrealism'},painter:'vanghook',description:''},
        {id:7,src:Vertisism,size:{width:650,height:519},parameters:{color:0,size:1,style:'Vorticism'},painter:'vanghook',description:''},
        {id:8,src:Postimpressionnisme,size:{width:650,height:519},parameters:{color:0,size:1,style:'Post impressionnisme'},painter:'vanghook',description:''},
      ],
      userinterest:{
        RE:0,
        EX:0,
        IM:0,
        FU:0,
        RO:0
      },
      room1:[],
      room2:[],
      room3:[],
      room4:[],
      scores:{
        room1:[],
        room2:[],
        room3:[],
        room4:[]
      },

      selected:[]
    }
  },
  name: 'HelloWorld',
  
  props: {

  },
  methods:{ 
    ...mapMutations(['setintrest','setuserintrestarray','setro']),
    selectimage(image){
      if(this.selected.length < this.maximumSelectedNumber){
        this.selected.push(image)
        this.$refs.img[image.id].style.filter= "blur(4px)"
      }
      else{
        alert('maximum number riched')
      }
    },
    analyze(){
      let selectedStyleArray=[]
      this.selected.forEach(ele=>{
        selectedStyleArray.push(ele.parameters.style)
      })
      let userintrestscores=interest(selectedStyleArray)




      
      this.scores.room1=this.roomanalyze(this.room1)
      this.scores.room2=this.roomanalyze(this.room2)
      this.scores.room3=this.roomanalyze(this.room3)
      this.scores.room4=this.roomanalyze(this.room4)

      
      let final=[]
      final.push(this.calculateavg(this.findmostsimilar(userintrestscores,this.scores.room1)))
      final.push(this.calculateavg(this.findmostsimilar(userintrestscores,this.scores.room2)))
      final.push(this.calculateavg(this.findmostsimilar(userintrestscores,this.scores.room3)))
      final.push(this.calculateavg(this.findmostsimilar(userintrestscores,this.scores.room4)))
      console.log(final.sort());
      
    },
    
    findmostsimilar(userintrestscores,scores){
      let diffrentiate={      
        room1:{RE:0,EX:0,IM:0,FU:0,RO:0},
        room2:{RE:0,EX:0,IM:0,FU:0,RO:0},
        room3:{RE:0,EX:0,IM:0,FU:0,RO:0},
        room4:{RE:0,EX:0,IM:0,FU:0,RO:0},
        room5:{RE:0,EX:0,IM:0,FU:0,RO:0},
      }
      diffrentiate.EX=Math.abs(userintrestscores.EX-scores.EX)
      diffrentiate.RE=Math.abs(userintrestscores.RE-scores.RE)
      diffrentiate.IM=Math.abs(userintrestscores.IM-scores.IM)
      diffrentiate.FU=Math.abs(userintrestscores.FU-scores.FU)
      diffrentiate.RO=Math.abs(userintrestscores.RO-scores.RO)
      return diffrentiate
    },
    calculateavg(array){
      return array.EX+array.RE+array.IM+array.FU+array.RO
    },
    roomanalyze(room){
      let temproom=[]
      room.forEach(ele=>{
        temproom.push(ele.style)
      })
      let roomscores=interest(temproom)
      alert('room3 -> room2 ->room4 ->room1')
      return roomscores
    }
  },
  created(){
    axios.get("http://127.0.0.1:8000/api/getimages").then(response => {
            //let r = response.data.forEach(ele=>{return ele.name})
            let aa=response.data
            aa.forEach(element => {

              if(element.roomNumber=="room1")
              this.room1.push(element)
              else if(element.roomNumber=="room2"){
              this.room2.push(element)
              }
              else if(element.roomNumber=="room3"){
                this.room3.push(element)
              }
              else if(element.roomNumber=="room4"){
                this.room4.push(element)
              }
            })
            
            })
            
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image_box{
  width: 50%;
  padding: 10px;
  box-sizing: border-box;



}
.hello{
  padding-bottom: 50px;
}
.image_size{
  max-width: 100%;

}
.image_container{
  margin-inline: 10%;

}
.div_centerx{

}
.color{
  color: green;
}
button{
  padding-inline: 64px;
  padding-top: 16px;
  border-radius: 4rem;
  padding-bottom: 16px;
  border: none;
  background-color: #baf7ba;
  transition: .3s;
  font-size: 14pt;
  border:1px solid #49c349;
}
button:hover{
  border:2px solid #49c349;
  box-sizing: border-box;
}

</style>
