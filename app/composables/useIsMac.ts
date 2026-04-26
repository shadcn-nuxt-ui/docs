import { onMounted, ref } from "vue";

export function useIsMac() {
  const isMac = ref<boolean | null>(null);

  onMounted(() => {
    isMac.value = navigator.platform.toUpperCase().includes("MAC");
  });

  return isMac;
}
