<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

import type { Product } from '@/types'
import { updateUrl } from '@/utils'

const brands = computed((): string[] => store.getters.brands)
const memory = computed((): string[] => store.getters.memory)
const products = computed((): Product[] => store.getters.products)

let price = ref<number>(0)
let selectedBrand = ref<string>('')
let selectedMemory = ref<string>('')

const MINIMAL_PRICE = ref<number>(0)
const MAX_PRICE = ref<number>(0)

const store = useStore()
let filteredProducts = ref<Product[]>(products.value)

const productsSortedByPrice = [...products.value].sort((a, b) => a.price - b.price)
MINIMAL_PRICE.value = productsSortedByPrice[0].price
MAX_PRICE.value = productsSortedByPrice[productsSortedByPrice.length - 1].price
price.value = MINIMAL_PRICE.value

const filterFunction = (): void => {
  filteredProducts.value = products.value

  filterByBrand()
  filterByMemory()
  filterByPrice()

  updateUrl(selectedBrand.value, selectedMemory.value, price.value, MINIMAL_PRICE.value)
}

const filterByBrand = (): void => {
  if (selectedBrand.value !== 'All' && selectedBrand.value !== '') {
    filteredProducts.value = products.value.filter((p: Product) => p.brand === selectedBrand.value)
  }
}

const filterByMemory = (): void => {
  if (selectedMemory.value !== '' && selectedMemory.value !== 'All') {
    filteredProducts.value = filteredProducts.value.filter((p: Product) => p.memory === selectedMemory.value)
  }
}

const filterByPrice = (): void => {
  filteredProducts.value = filteredProducts.value.filter((p: Product) => p.price >= Math.floor(price.value))
}

onMounted((): void => {
  const windowData = Object.fromEntries(new URL(window.location.href).searchParams.entries())

  if (windowData.brand) {
    selectedBrand.value = windowData.brand
    filterByBrand()
  }

  if (windowData.memory) {
    selectedMemory.value = windowData.memory
    filterByMemory()
  }

  if (windowData.price) {
    price.value = +windowData.price
    filterByPrice()
  }
})
</script>

<template>
  <v-app>
    <v-toolbar dark color='teal' class='py-8'>
      <v-autocomplete
        v-model='selectedBrand'
        :items='brands'
        cache-items
        class='mx-4'
        flat
        hide-no-data
        hide-details
        label='Brand'
        solo-inverted
      ></v-autocomplete>
      <v-autocomplete
        v-model='selectedMemory'
        :items='memory'
        cache-items
        class='mx-4'
        flat
        hide-no-data
        hide-details
        label='Memory'
        solo-inverted
      ></v-autocomplete>
      <div class='d-flex w-25'>
        <p>
          Price
        </p>
        <v-slider
          v-model='price'
          thumb-label='always'
          :min='MINIMAL_PRICE'
          :max='MAX_PRICE'
        ></v-slider>
      </div>
      <v-btn class='bg-cyan-accent-1' color='primary' @click='filterFunction'>
        Filter
      </v-btn>
    </v-toolbar>
    <v-row class='px-4'>
      <v-alert
        v-if='!filteredProducts.length'
        border='top'
        color='red lighten-2'
        dark
        class='h-25 mt-5'
      >
        Nothing matches your filter
      </v-alert>
      <v-col
        v-else
        cols='12'
        sm='4'
        v-for='product in filteredProducts'
        :key='product.id'
      >
        <RouterLink :to='`/${product.id}`'>
          <v-card class='mx-auto my-12' max-width='374'>

            <v-img height='250' :src='`/src/assets/${product.img}.jpeg`'></v-img>

            <v-card-title class='d-flex justify-space-between'>
              {{ product.name }}
              <v-chip color='blue lighten-1' class='mr-2'>{{ product.price }}$</v-chip>
            </v-card-title>

            <v-card-text>
              <div class='mt-1 mb-4 text-subtitle-1'>
                {{ product.brand }}
              </div>

              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti iste maiores perspiciatis quo
                temporibus totam veniam. Cupiditate, earum odio? Blanditiis cupiditate dicta distinctio illo libero
                molestias tempore, voluptatem. Officia, quisquam.
              </div>
            </v-card-text>

            <v-card-text>
              <v-chip color='primary' class='mr-2'>{{ product.memory }}Gb</v-chip>

              <v-chip color='secondary'>{{ product.displaySize }} inch</v-chip>
            </v-card-text>
          </v-card>

        </RouterLink>
      </v-col>
    </v-row>
  </v-app>
</template>
