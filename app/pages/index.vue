<template>
  <div class="max-w-245 m-auto text-justify mt-20">
    <h1 class="font-bold text-2xl mb-4 text-accent">Probe VA</h1>
    <p class="mb-2">
      Dies ist eine Webseite für meine Probe Vertiefungsarbeit. Ich habe eine
      Umfrage zum Thema «Verliebt, Verlobt, Verheiratet, Geschieden» gemacht und
      mich dazu entschieden, dass ich die Diagramme in einer Webseite auswerte,
      da ich auch bei der Arbeit viel mit Webseiten arbeite. Deshalb kenne ich
      mich da viel besser als bei Excel aus.
    </p>
    <p>
      Die Umfrage selbst habe ich mit Microsoft Forms gemacht. Dort kann man die
      Daten nur als xlsx Datei herunterladen. Die Datei habe ich als CSV
      exportiert und zu JSON umgewandelt. In JavaScript habe ich die Daten
      aufbereitet. Das war vor allem nötig, da Forms bei Feldern, bei denen man
      mehrere Antworten auswählen kann, die einzelnen Werte mit «;» trennt. Auch
      sonst habe ich die Daten einfacher auslesbar gemacht.
    </p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "Home",
});

useHead({
  title: "",
});
</script>

<style></style>
