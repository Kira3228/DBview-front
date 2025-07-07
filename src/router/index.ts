import { createRouter, createWebHistory } from "vue-router";
import Layout from "../Layout/Layout.vue";
import EventLogPage from "../pages/EventLogPage.vue";
import ActiveFilePage from "../pages/ActiveFilePage.vue";
import ArchiveFilePage from "../pages/ArchiveFilePage.vue";
import FileDetails from "../pages/Graph/FileDetails.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/events",
    children: [
      {
        path: "/events",
        name: "events",
        component: EventLogPage,
        meta: {
          title: "Журнал событий",
          menuKey: "home",
        },
      },
      {
        path: "/active-files",
        name: "active-files",
        component: ActiveFilePage,
        meta: {
          menuKey: "active-files",
        },
      },
      {
        path: "/archive",
        name: "archive",
        component: ArchiveFilePage,
        meta: {
          menuKey: "archive",
        },
      },
      {
        path: "/details",
        name: "details",
        component: FileDetails,
        meta: {
          menuKey: "details",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
