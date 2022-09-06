<template>
  <div class="container">
    <h2>select rooms and upload images there </h2>
    <div class="upload_section">
      <p>select pating <strong>style</strong> then upload it</p>
      <v-select :options="style" v-model="picked" ></v-select>
      <br/>
      <!--
      <p>select <strong>room</strong></p>
      <v-select :options="rooms" v-model="pickedroom" ></v-select>
      <br/>
      !-->
      <p><strong>description</strong></p>
      <textarea class="text"></textarea>
    </div>

    <div class="room4container mt-12" >
      <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
    </div>
    <div class="room1">
    <h3>room 1

      <div class="images row">
        <div class="img " v-for="img in room1" :key="img.id" >
          <img :src="downloadimage(img.path)"  class="image_size" alt="">
        </div>
      </div>
    </h3>
    </div>

    <h3>room 2 </h3>
    <div class="room2 row">
         <div class="img " v-for="img in room2" :key="img.id" >
          <img :src="downloadimage(img.path)"  class="image_size" alt="">
        </div>
     
    </div>
    <h3>room 3
    </h3>
    <div class="room3 row">
    <div class="img " v-for="img in room3" :key="img.id" >
          <img :src="downloadimage(img.path)"  class="image_size" alt="">
        </div>

    </div>

    <div class="room4">
    <h3>room 4

    </h3>
    <div class="img row" v-for="img in room4" :key="img.id" >
        <div class="">
            <img :src="downloadimage(img.path)"  class="image_size" alt="">
          </div>
        </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  //import compareintrest from './compareinterstandrooms'
  import findinterest from './findinterest'
  import { mapMutations } from 'vuex'
  ///import kmeans from './junk2.js'
export default {
  data(){
    return{

      baseurl:"http://127.0.0.1:8000/storage/",
        style:[
        {label:'Surrealism',code:"RE"},
        {label:'Realism',code:"RE"},

        {label:'Expressionism',code:"EX"},
        {label:'Abstract Expressionism',code:"EX"},

        {label:'impressionnisme',code:"IM"},
        {label:'Post impressionnisme',code:"IM"},
        {label:'Neo impressionnisme',code:"IM"},

        {label:'Cubism',code:"FU"},
        {label:'Futurism',code:"FU"},

        {label:'Vorticism',code:"RO"},
        {label:'Romantisme',code:"RO"},
        ],
      picked: '',
      images:[],
      room1:[],
      room2:[],
      room3:[],
      room4:[],
      UploadedImageNumber:0,
      rooms:['room1','room2','room3','room4'],
      pickedroom:null
    }
  },


  methods: {
    ...mapMutations(['setintrest']),




    
    computeintrest(){
      
      let room1tmp=[]
      console.log(this.room1)
      this.room1.forEach(ele=>{
        room1tmp.push(ele.style)
      })
      console.log(room1tmp)
      let room1styles=findinterest(room1tmp)
      console.log(room1styles)
      //compareintrest(this.$store.state.userintrestarry,room1styles)

    },
    downloadimage(path){
      let newpath=this.baseurl+path.replace("public/","")
      return newpath
      
    },
    selectroom(){
      //let sss=kmeans(this.picked,this.room1,this.room2,this.room3,this.room4)
      //console.log(sss)
      //this.UploadedImageNumber++
      if(this.pickedroom ===null){
        alert('select a room first!')
      }else{
        return this.pickedroom
      }
    },
    getUploadedImages(){
      axios.get("http://127.0.0.1:8000/api/getimages").then(response => {
        console.log(response)
        console.log(response.data)
          this.images=response
        })
    },
    uploadImage(event) {
      const URL = 'http://127.0.0.1:8000/api/uploading-file-api'; 
      let data = new FormData();
      data.append('file',event.target.files[0]); 
      data.append('room',this.selectroom()); 
      data.append('style',this.picked.label); 

      axios.post(
        URL, 
        data
      ).then(
        response => {
          alert('successfully uploaded!')
          console.log(response)
        }
      )
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
        this.computeintrest()
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3,p{
  text-align: left;
}
.container{
  margin-inline:10% ;
}
button{
  
}
.image_size{
  width: 300px;
  margin: 10px;
}
input[type="file"]{
  padding: 30px;
  background-color: #d8f7d8;
  border-radius: 10px;
}
textarea{
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: none;
  border-radius: 8px;
  min-height: 100px;
}
</style>
