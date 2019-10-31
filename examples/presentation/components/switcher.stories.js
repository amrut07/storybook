import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { withKnobs, object } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';

import Switcher, { Expander } from './switcher';
import { items } from './accordion/implementations';

const AltButton = styled.div(({ color }) => ({
  backgroundColor: color,
}));
const AltContent = styled.div({
  padding: 20,
  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)',
});

export default {
  title: 'Components|Switcher',

  decorators: [
    checkA11y,
    withKnobs({
      escapeHTML: false,
    }),
  ],
};

export const any = () => (
  <Switcher initial={[1, 0, 0]}>
    {({ actives, toggle }) => (
      <Fragment>
        {items.map((item, index) => (
          <Expander key={item.title} active={actives[index]} onClick={() => toggle(index)}>
            <button>{item.title}</button>
            <Fragment>{item.contents}</Fragment>
          </Expander>
        ))}
      </Fragment>
    )}
  </Switcher>
);

any.story = {
  name: 'any',
};

export const single = () => {
  const localItems = object('Items', [
    { title: 'red', contents: 'This is the color red' },
    { title: 'white', contents: 'This is the color white' },
    { title: 'blue', contents: 'This is the color blue' },
  ]);

  return (
    <Switcher initial={localItems.slice().fill(0)}>
      {({ actives, setActives }) => {
        const set = index => {
          const l = actives.slice().fill(0);
          l[index] = 1;
          setActives(l);
        };

        return (
          <Fragment>
            {localItems.map((item, index) => (
              <Expander key={item.title} active={actives[index]} onClick={() => set(index)}>
                <AltButton color={item.title}>{item.title}</AltButton>
                <AltContent>{item.contents}</AltContent>
              </Expander>
            ))}
          </Fragment>
        );
      }}
    </Switcher>
  );
};

single.story = {
  name: 'single',
};
