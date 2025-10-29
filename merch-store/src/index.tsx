import { App } from '@app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element with id "root" not found');
}

const root = createRoot(container);

const render = () => {
  root.render(
    <StrictMode>
      <main>
        <App />
      </main>
    </StrictMode>,
  );
};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(render);
}

render();
