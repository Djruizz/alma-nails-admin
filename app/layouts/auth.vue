<template>
  <UContainer>
    <UHeader :toggle="false">
      <template #title>
        <h1>Portal de Clientes</h1>
      </template>
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain class="flex flex-col flex-1">
      <slot></slot>
    </UMain>
  </UContainer>
</template>
