import { createRouter, createWebHistory } from "vue-router";
import Layout from "../Layout/Layout.vue";
import EventLogPage from "../pages/EventLogPage.vue";
import ActiveFilePage from "../pages/ActiveFilePage.vue";
import ArchiveFilePage from "../pages/ArchiveFilePage.vue";
import RoportPage from "../pages/ReportPage.vue";
import FileDetailsPage from "../pages/FileDetailsPage.vue";


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
        component: FileDetailsPage,
        meta: {
          menuKey: "details",
        },
      },
      {
        path: "/report-list",
        name: "report-list",
        component: RoportPage,
        meta: {
          menuKey: "report-list",
        }
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
