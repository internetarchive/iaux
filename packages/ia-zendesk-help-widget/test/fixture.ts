import { render, type TemplateResult } from 'lit';

export async function fixture<T extends HTMLElement>(
  template: TemplateResult,
): Promise<T> {
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(template, container);
  const el = container.firstElementChild as T;
  if ('updateComplete' in el) {
    await (el as unknown as { updateComplete: Promise<boolean> })
      .updateComplete;
  }
  return el;
}
