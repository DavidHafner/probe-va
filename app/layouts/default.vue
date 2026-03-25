<template>
  <div class="flex h-full flex-col">
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start w-auto">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="-1"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li v-for="route in routes">
              <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl">Probe VA</a>
      </div>
      <div class="navbar-center hidden lg:flex w-auto mx-auto">
        <ul class="menu menu-horizontal px-1">
          <!-- pages -->
          <li v-for="route in routes">
            <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
          </li>
        </ul>
      </div>
      <!-- <div class="navbar-end">
		<a class="btn">Button</a>
	  </div> -->
    </div>
    <div class="grow overflow-scroll">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const routes = useRouter().options.routes;
</script>

<style></style>
