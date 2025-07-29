// import { onUnmounted, ref } from "vue";

// export const useDebounce = (initialValue: string = "", delay: number = 300) => {
//   const debouncedValue = ref(initialValue);
//   let timeoutId: ReturnType<typeof setTimeout> | null = null;

//   const setDebouncedValue = (newValue: string) => {
//     clearTimeout(timeoutId as number);
//     timeoutId = setTimeout(() => {
//       debouncedValue.value = newValue;
//     }, delay);
//   };

//   onUnmounted(() => {
//     clearTimeout(timeoutId as number);
//   });

//   return { debouncedValue, setDebouncedValue };
// };
