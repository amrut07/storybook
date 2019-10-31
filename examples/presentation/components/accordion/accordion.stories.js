import * as React from 'react';
import { transform } from '@babel/standalone';

import { withNotes } from '@storybook/addon-notes';

import { useChannel, useState, useParameter } from '@storybook/addons';
import * as Carousels from './implementations';

const { items } = Carousels;

function scopeEval(source, scope) {
  console.log({ source, scope });
  // eslint-disable-next-line no-new-func
  return Function(`
    "use strict";
    ${Object.keys(scope)
      .map(k => {
        return `const ${k} = this.${k}`;
      })
      .join(';\n')}
    const output = ${source};
    return output;
  `).bind(scope)();
}

export default {
  title: 'Components|Accordion',
  decorators: [
    withNotes,
    storyFn => {
      const initialCode = useParameter('editor') || '';
      const [state, setState] = useState(initialCode);
      useChannel({
        'new-source': s => {
          setState(s);
        },
      });

      const scope = storyFn();

      if (state) {
        try {
          return scopeEval(transform(state, { presets: [['react']] }).code, {
            ...scope,
            React,
          });
        } catch (e) {
          return '';
        }
      }
    },
  ],

  parameters: {
    notes: { markdown: require('./readme.md') },
  },
};

export const moreUsecases = () => ({ Accordion: Carousels.Standard, items });

moreUsecases.story = {
  name: 'more usecases',
  parameters: {
    editor: `<Accordion items={items} />`,
  },
};

export const mooreUsecases = () => ({ Accordion: Carousels.Above, items });

mooreUsecases.story = {
  name: 'moore usecases',
  parameters: {
    editor: `<Accordion items={items} above={true} />`,
  },
};

export const moooreUsecases = () => ({ Accordion: Carousels.Right, items });

moooreUsecases.story = {
  name: 'mooore usecases',
  parameters: {
    editor: `<Accordion items={items} position="right" />`,
  },
};

export const pleaseStop = () => ({ Accordion: Carousels.SinglePreventClose, items });

pleaseStop.story = {
  name: 'please stop',
  parameters: {
    editor: `<Accordion
      items={items}
      position="below"
      single={true}
      preventClose={true}
      openTrigger="focus"
      closeTrigger="blur"
      titleClassName="acc-title"
      contentsClassName="acc-contents"
      onTrigger={() => {}}
      closeClassName="acc-closed"
      openClassName="acc-open"
      renderExpandAllButton={true}
    />`,
  },
};

export const alternative = () => ({ AccordionBottomSingle: Carousels.SinglePreventClose, items });

alternative.story = {
  name: 'alternative',
  parameters: {
    editor: `<AccordionBottomSingle items={items} />`,
  },
};
