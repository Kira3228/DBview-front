import { defineStore } from "pinia";
interface SearchState {
  fileName: string;
  user: string;
  mni: string;
}
export const useSearchStore = defineStore(`search`, {
  state: (): SearchState => ({
    fileName: ``,
    user: ``,
    mni: ``,
  }),
  actions: {
    updateField(field: keyof SearchState, value: string) {
      this[field] = value;
      
      
    },
  },
});
