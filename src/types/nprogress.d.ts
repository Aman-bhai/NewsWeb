declare module 'nprogress' {
    interface NProgress {
      configure(options: NProgressOptions): void;
      start(): void;
      done(): void;
      set(value: number): void;
      inc(amount?: number): void;
      remove(): void;
    }
  
    interface NProgressOptions {
      minimum?: number;
      easing?: string;
      speed?: number;
      showSpinner?: boolean;
    }
  
    const NProgress: NProgress;
    export default NProgress;
  }
  