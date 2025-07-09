import { onUnmounted, ref } from "vue";

export const useDebounce = () => {
  let debounceTimer = ref();

  const debounce = (callback: () => void, delay = 750) => {
    clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(callback, delay);
  };
  const cancelDebounce = () => {
    clearTimeout(debounceTimer.value);
  };
  onUnmounted(() => {
    cancelDebounce();
  });
  return { debounce, cancelDebounce };
};
