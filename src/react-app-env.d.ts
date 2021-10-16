/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PUBLIC_URL: string
      React_App_BOOKS_API_URL: string
    }
  }