import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./e2e',timeout:60000,fullyParallel:false,workers:1,reporter:[['list'],['json',{outputFile:'../05 Rapports/browser-results.json'}]],use:{baseURL:process.env.TEST_BASE_URL||'http://127.0.0.1:4173',browserName:'chromium',headless:true,viewport:{width:1440,height:1000},screenshot:'only-on-failure'}});
