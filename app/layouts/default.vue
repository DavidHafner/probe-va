<template>
  <div class="flex h-full flex-col">
    <div class="navbar bg-base-100 shadow-sm sticky top-0 z-100 brightness-105">
      <div class="navbar-start w-auto">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost xl:hidden">
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
            class="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2"
          >
            <li v-for="route in router.options.routes">
              <NuxtLink
                :to="route.path"
                :class="{
                  'text-accent font-bold': currentRoute.path === route.path,
                }"
                >{{ route.name }}</NuxtLink
              >
            </li>
          </ul>
        </div>
        <NuxtLink to="/" class="btn btn-ghost text-xl xl:absolute"
          >Probe VA</NuxtLink
        >
      </div>
      <div class="navbar-center hidden xl:flex w-auto mx-auto">
        <ul class="menu menu-horizontal px-1">
          <!-- pages -->
          <li v-for="route in router.options.routes">
            <NuxtLink
              :to="route.path"
              :class="{
                'text-accent font-bold': currentRoute.path === route.path,
              }"
              >{{ route.name }}</NuxtLink
            >
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
    <footer
      class="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-8 gap-4"
    >
      <nav>
        <div class="grid grid-flow-col">
          <NuxtLink to="https://www.github.com/DavidHafner">
            <svg
              viewBox="0 0 98 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="dark:hidden w-8"
            >
              <g clip-path="url(#clip0_730_27126)">
                <path
                  d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_730_27126">
                  <rect width="98" height="96" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg
              viewBox="0 0 98 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="hidden dark:block w-8"
            >
              <g clip-path="url(#clip0_730_27136)">
                <path
                  d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_730_27136">
                  <rect width="98" height="96" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </NuxtLink>
        </div>
      </nav>
      <aside>
        <p>Copyright © {{ new Date().getFullYear() }} - David Hafner</p>
      </aside>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const currentRoute = useRoute();
</script>

<style></style>
