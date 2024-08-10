// navigationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Page {
  title: string;
  completTitle: string;
  description: string;
  url: string;
  index: number;
}

export interface NavigationState {
  pages: Page[];
}

// Intenta cargar el estado inicial desde localStorage
const initialState: NavigationState = {
  pages: JSON.parse(localStorage.getItem("navigation") || "[]"),
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    addPage: (
      state,
      action: PayloadAction<{ title: string; description: string; url: string }>
    ) => {
      let index = 1;
      state.pages.forEach((page) => {
        if (page.index >= index) {
          index++;
        }
      });
      const newPage: Page= {
        ...action.payload,
        index: index,
        completTitle: ""
      };
      state.pages.push(newPage);
      // Guarda el estado actualizado en localStorage
      localStorage.setItem("navigation", JSON.stringify(state.pages));
    },
    removePages: (state, action: PayloadAction<{ index: number }>) => {
      // Filtra las páginas para eliminar la página con el índice proporcionado
      state.pages = state.pages.filter(
        (page) => page.index <= action.payload.index
      );
      // Guarda el estado actualizado en localStorage
      localStorage.setItem("navigation", JSON.stringify(state.pages));
    },
    updatePage: (
      state,
      action: PayloadAction<{
        prevTitle: string;
        newTitle: string
      }>
    ) => {
      // Filtra las páginas para eliminar la página con el índice proporcionado
      state.pages = state.pages.map((page) => {
        if (page.title == action.payload.prevTitle) {
          page.completTitle = action.payload.newTitle;
        }
        return page;
      });
      // Guarda el estado actualizado en localStorage
      localStorage.setItem("navigation", JSON.stringify(state.pages));
    },
    updatePageAll: (
      state,
      action: PayloadAction<{
        page: Partial<Page>,
        title: string,
        completTitle: string
      }>
    ) => {
      console.log("prev map", state.pages)
      // Filtra las páginas para eliminar la página con el índice proporcionado
      state.pages = state.pages.map((page) => {
        
        if(page.title == action.payload.title){
          // page.title = action.payload.page.title ? action.payload.page.title : page.title;
          page.description = action.payload.page.description ? action.payload.page.description : page.description;
          page.index = action.payload.page.index ? action.payload.page.index : page.index;
          page.url = action.payload.page.url ? action.payload.page.url : page.url;
          page.completTitle = action.payload.completTitle;  

        }

        return page;
      });

      console.log("post map", state.pages)
      // Guarda el estado actualizado en localStorage
      localStorage.setItem("navigation", JSON.stringify(state.pages));
    },
    clearNavigation: (state) => {
      state.pages = [];
      // Limpia el localStorage cuando se limpia la navegación
      localStorage.removeItem("navigation");
    },
  },
});

export const { addPage, clearNavigation, removePages, updatePage, updatePageAll } =
  navigationSlice.actions;

export default navigationSlice.reducer;
