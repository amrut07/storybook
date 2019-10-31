import React from 'react';
import styled from '@emotion/styled';

import { withNotes } from '@storybook/addon-notes';

import SideBySide from './side-by-side';
import WrappingInline from './wrapping-inline';
import Placeholder from './placeholder';

const Holder = styled.div({
  margin: 10,
  border: '1px dashed deepskyblue',
});

export default {
  title: 'Components|Layout',
  decorators: [withNotes],

  parameters: {
    notes: { markdown: require('./readme.md') },
  },
};

export const sideBySide = () => (
  <Holder>
    <SideBySide>
      <Placeholder color="hotpink">content 1</Placeholder>
      <Placeholder color="deepskyblue">content 2</Placeholder>
    </SideBySide>
  </Holder>
);

sideBySide.story = {
  name: 'side by side',
};

export const wrappingLine = () => (
  <Holder>
    <WrappingInline>
      <Placeholder inline color="hotpink">
        content 1
      </Placeholder>
      <Placeholder inline color="deepskyblue">
        content 2
      </Placeholder>
      <Placeholder inline color="orangered">
        content 3
      </Placeholder>
      <Placeholder inline color="deeppink">
        content 4
      </Placeholder>
    </WrappingInline>
  </Holder>
);

wrappingLine.story = {
  name: 'wrapping line',
};

export const wrappingLineAligned = () => (
  <Holder>
    <WrappingInline align="center">
      <Placeholder inline color="hotpink">
        content 1
      </Placeholder>
      <Placeholder inline color="deepskyblue">
        content 2
      </Placeholder>
      <Placeholder inline color="orangered">
        content 3
      </Placeholder>
      <Placeholder inline color="deeppink">
        content 4
      </Placeholder>
    </WrappingInline>
  </Holder>
);

wrappingLineAligned.story = {
  name: 'wrapping line aligned',
};
