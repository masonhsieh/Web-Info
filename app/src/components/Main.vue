<template class="onePage">
  <div class="pg">
    <el-row class="top">
      <el-row class="logo">
        <el-image
            style="width: 150px; height: 75px;"
            :src="'https://i.ibb.co/9hBzZQj/k2kSmall.png'">
        </el-image>
      </el-row >
      <el-col :span=8>
        <i class="el-icon-s-unfold hamburg bigger" @click="openMenu"></i>
      </el-col>
      <el-col :span=8>
        <div @click="searchBar">
          <el-input v-model="Search.query" placeholder="Search Query" size="small" class="searchInput">
         </el-input>
        </div>
      </el-col>
      <el-col :span=8>
        <i class="el-icon-plus addProduct bigger" @click="addProduct"></i>
      </el-col>
    </el-row>
    <div class="searchBar">
      <el-row class="searchRow">
        <el-col :span=4 :offset="6">
          <div class="inputLabel"> category </div>
          <el-select size="mini" v-model="Search.category" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col class="searchCondition" :span=4>
          <div class="inputLabel"> condition </div>
          <el-rate v-model="Search.condition"></el-rate>
        </el-col>
        <el-col class="searchButton" :span=4>
           <el-button @click="search"> Search </el-button>
        </el-col>
      </el-row>
    </div>
    <div @click="updateSelectedMarker">
      <google-map ref="map"/>
    </div>
    <div class="reserveProduct">
      <el-button class="longButton" @click="reserveProduct" :disabled="disabled()"> Reserve Product</el-button>
    </div>
    <div class="addProduct-modal">
      <div class="addProduct-content">
        <i class="el-icon-close closeSubmit bigger" @click="closeAddProduct"></i>
        <h2> Add Product </h2>
        <el-input class="input-field" placeholder="Name" v-model="Product.name">
        </el-input>
        <el-input class="input-field" placeholder="Description" v-model="Product.description">
        </el-input>
        <div class="input-field">
          <gmap-autocomplete
            class="please el-input input-field"
            @place_changed="setPlace">
          </gmap-autocomplete>
        </div>
        <el-select class="category" v-model="Product.category" placeholder="Category">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          class="input-field"
          v-model="Product.expirationDate"
          type="date"
          placeholder="Pick an expiry date">
        </el-date-picker>
        <el-row>
          <div class="conditionLabel"> Condition: </div>
          <el-rate class="conditionLabel" v-model="Product.condition">
          </el-rate>
        </el-row>
        <el-row>
          <el-button class="input-field" @click="submit"> Submit </el-button>
        </el-row>
      </div>
    </div>
    <div class="menu-modal">
      <div class="addProduct-content">
        <i class="el-icon-close closeSubmit bigger" @click="closeMenu"></i>
        <div class="menuItems">
          <el-row>
            <i @click="profile" class="el-icon-user-solid bigger"></i>
            <div> {{ this.$session.get('user').name }} </div>
          </el-row>
          <el-row>
            <i @click="dashboard" class="el-icon-odometer bigger"></i>
            <div> Dashboard </div>
          </el-row>
          <el-button class="input-field" @click="logOut"> Log out </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import router from '../router'
import GoogleMap from '../components/GoogleMap'

export default {
  name: 'Main',
  components: {
    GoogleMap
  },
  data () {
    return {
      url: 'https://i.ibb.co/9hBzZQj/k2kSmall.png',
      imageUrl: '',
      errors: [],
      options: [{
        value: 'Fruit',
        label: 'Fruit'
      }, {
        value: 'Vegtable',
        label: 'Vegtable'
      }, {
        value: 'Baking',
        label: 'Baking'
      }, {
        value: 'Meat',
        label: 'Meat'
      }, {
        value: 'Dairy',
        label: 'Dairy'
      }, {
        value: 'All',
        label: 'All'
      }],
      Search: {
        category: '',
        condition: 0,
        query: ''
      },
      Product: {
        userId: this.$session.get('user')._id,
        phoneNumber: this.$session.get('user').phoneNumber,
        receiverName: '',
        description: '',
        name: '',
        expirationDate: '',
        address: '',
        marker: '',
        category: '',
        condition: 0,
        delivered: false,
        _id: ''
      },
      selectedMarker: null
    }
  },
  methods: {
    disabled () {
      let markerUserId = (this.selectedMarker ? this.selectedMarker.position.userId : '')
      let userId = this.$session.get('user')._id

      if (!this.selectedMarker || markerUserId === userId || !this.$refs.map.infoWinOpen) {
        return true
      } else {
        return false
      }
    },
    updateSelectedMarker () {
      this.selectedMarker = this.$refs.map.selectedMarker
    },
    addProduct () {
      document.querySelector('.addProduct-modal').style.display = 'flex'
      document.querySelector('.searchBar').style.display = 'none'
    },
    openMenu () {
      document.querySelector('.menu-modal').style.display = 'flex'
    },
    searchBar () {
      document.querySelector('.searchBar').style.display = 'flex'
    },
    closeAddProduct () {
      document.querySelector('.addProduct-modal').style.display = 'none'
    },
    closeMenu () {
      document.querySelector('.menu-modal').style.display = 'none'
    },
    submit () {
      var url = process.env.ROOT_API + 'products'
      axios.post(url, { Product: this.Product })
        .catch(error => {
          alert('Please fill all the information')
          console.log('Add product failed: ' + error)
        })
      document.querySelector('.addProduct-modal').style.display = 'none'
      this.$refs.map.addThisMarker(this.Product)
      this.reload()
    },
    dashboard () {
      router.push({ name: 'dashboard' })
    },
    logOut () {
      this.$store.state.name = ''
      this.$store.state.id = ''
      this.$session.destroy()
      router.push({ name: 'home' })
    },
    profile () {
      router.push({ name: 'profile' })
    },
    setPlace (place) {
      const marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.Product.address = place.formatted_address
      this.Product.marker = marker
    },
    search () {
      // Search Query code in here, leave the line below at the bottom :)
      document.querySelector('.searchBar').style.display = 'none'
      this.$refs.map.searchProduct(this.Search)
    },
    reserveProduct () {
      var url = process.env.ROOT_API + 'products/id/' + this.selectedMarker.position.id
      axios.put(url, { receiverName: this.$session.get('user')._id })
        .catch(error => {
          console.log('Reserving product failed: ' + error)
        })
      this.$notify({
        title: 'Success',
        message: 'The product has been reserved',
        type: 'success'
      })
    }
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 46px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .text {
    padding: 80px;
  }
  .intro-text {
    margin-right: 10px;
    min-height: 200px;
    background-color: #d3dce6;
  }
  .home-button {
    float: bottom;
  }
  .addProduct-modal {
    width: 20%;
    height: 80%;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
  }
  .menu-modal {
    width: 20%;
    height: 80%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
  }
  .addProduct-content {
    padding: 40px 40px 40px 40px;
    width: 800px;
    height: 100%;
    background-color: white;
    border-radius: 18px;
    background-color: rgba(255,255,255,0.8);
  }
  .close {
    postition: absolute;
    top: 0;
    right: 14px;
    font-size: 42px;
    transform: rotate(45deg);
  }
  .closeSubmit {
    float: right;
  }
  .input-field {
    padding: 10px 10px 10px 10px;
  }
  .header {
    position: absolute;
    background-color: #F2F2F2;
    top: 0;
    left: 0;
    height: 75px;
    width: 100%;
  }
  .logo {
    top: 0;
    height: 75px;
  }
  .headerRow {
    margin: -20px -10px -10px -10px;
  }
  .searchInput {
    width: 320px;
  }
  .pg {
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }
  .top {
    min-height: 100px;
    max-width: 100%;
    height: 12%;
    margin-bottom: 16px;
  }
  .middle {
    height: 80%;
  }
  .hamburg {
    float: left;
     padding-left: 10px;
  }
  .addProduct {
    margin-right: 10px;
    float: right;
  }
  .addressInput {
    border-radius: 4px;
    margin: 0px 8px;
    width: 100%;
    height: 5%;
  }
  .searchBar {
    width: 100%;
    height: 12%;
    display: none;
  }
  .searchRow {
    min-height: 30px;
    width: 100%;
  }
  .searchButton {
    padding-top: 0.7%;
  }
  .menuItems {
    padding-top: 30%;
  }
  .please {
    width: 100%;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: #DCDFE6;
  }
  .category {
    float: left;
    padding-left: 10px
  }
  .conditionLabel {
    float: left;
    padding-left: 10px;
  }
  .submit {
    padding-top: 30px;
  }
  .reserveProduct {
    padding-top: 4vh;
    width: 100%;
    max-width: 100%;
    max-height: 10vh;
  }
  .onePage {
    max-height: 100vh;
  }
  .longButton {
    width: 15%;
  }
  .bigger {
    transform: scale(2, 2);
  }
</style>
