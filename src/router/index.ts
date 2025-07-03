import { createRouter, createWebHistory } from "vue-router";
import Layout from "../Layout/Layout.vue";
import EventLogPage from "../pages/EventLogPage.vue";
import ActiveFilePage from "../pages/ActiveFilePage.vue";
import ArchiveFilePage from "../pages/ArchiveFilePage.vue";

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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
