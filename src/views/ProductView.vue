<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import type { Product } from '@/types'

const route = useRoute()
const store = useStore()
const product = computed((): Product => store.getters.products[+route.params.product - 1])
</script>

<template>
  <div class='d-flex justify-center'>
    <v-card class='w-100'>
      <v-img height='350' :src='`/src/assets/${product.img}.jpeg`'></v-img>

      <v-card-title class='d-flex justify-center align-center'>
        <h3>{{ product.brand }} {{ product.name }}</h3>
        <v-chip
          class='ma-2'
          color='green'
          text-color='white'
        >
          {{ product.price }}$
        </v-chip>
        <v-chip
          class='ma-2'
          color='blue'
          text-color='white'
        >
          {{ product.displaySize }}$
        </v-chip>
        <v-chip
          class='ma-2'
          color='orange'
          text-color='white'
        >
          {{ product.memory }}Gb
        </v-chip>
      </v-card-title>
      <p class='px-4'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut, deserunt dicta doloribus eius enim eum
        exercitationem impedit incidunt inventore minus, natus necessitatibus nihil non nostrum perferendis placeat
        quidem rerum suscipit, voluptatibus. Commodi deleniti dicta explicabo modi mollitia, perferendis repellat. Fugit
        ipsa nisi qui. Aliquid assumenda at atque corporis ea, eius, eligendi eos est et ex excepturi fugit harum
        impedit incidunt, ipsum magnam molestiae optio placeat provident reiciendis sunt suscipit tempora tenetur totam
        veritatis voluptate voluptatum? Ab alias animi architecto assumenda atque corporis culpa cum dolor dolores earum
        eius esse facilis fuga fugiat fugit molestiae mollitia, neque nesciunt non nulla obcaecati omnis pariatur
        provident quaerat quo quos ratione recusandae reiciendis repudiandae saepe sed veritatis vitae voluptatibus!
        Accusantium adipisci aliquam aspernatur atque culpa eaque earum, eligendi eum magni maiores modi mollitia
        obcaecati qui rem rerum, sapiente tenetur vero! Aut corporis, deleniti deserunt dicta, doloremque dolorum
        excepturi hic id iste minima nihil pariatur reiciendis repudiandae suscipit tempore totam, voluptates!
        Accusantium adipisci aspernatur consequuntur cumque cupiditate delectus dolorum eius error in ipsa ipsam magnam
        odio, perspiciatis, possimus quae quasi repellat, sapiente sint unde velit? Amet corporis cumque cupiditate
        ipsum laborum minus necessitatibus nesciunt officia, quasi quia quo, repudiandae veritatis! Consequuntur
        delectus incidunt unde.
      </p>
    </v-card>
  </div>
</template>