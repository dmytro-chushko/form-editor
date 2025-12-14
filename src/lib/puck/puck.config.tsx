import { Config } from '@measured/puck';
import { ReactNode } from 'react';

import { PUCK_CATEGORIES } from '../constants/puck-categories';

import PuckCheckbox from './components/PuckCheckbox';
import PuckContainer from './components/PuckContainer';
import PuckFlex from './components/PuckFlex';
import PuckInput from './components/PuckInput';
import PuckRadio from './components/PuckRadio';
import PuckSelect from './components/PuckSelect';
import PuckTextarea from './components/PuckTextarea';

type RootProps = {
  children: ReactNode;
};

export const config: Config<object, RootProps> = {
  categories: {
    [PUCK_CATEGORIES.TextFields]: {
      components: ['Input', 'Textarea'],
    },
    [PUCK_CATEGORIES.SelectFields]: {
      components: ['Select', 'Checkbox', 'Radio'],
    },
    [PUCK_CATEGORIES.Layout]: {
      components: ['Flex', 'Container'],
    },
  },
  components: {
    Input: {
      fields: {
        label: { type: 'text' },
        placeholder: { type: 'text' },
      },
      inline: true,
      render: ({ label, placeholder, puck }) => (
        <PuckInput
          puckRef={puck.dragRef}
          label={label}
          placeholder={placeholder}
        />
      ),
    },
    Checkbox: {
      fields: {
        label: { type: 'text' },
        checked: {
          type: 'radio',
          options: [
            { label: 'True', value: true },
            { label: 'False', value: false },
          ],
        },
      },
      defaultProps: {
        label: 'I agree',
        checked: false,
      },
      render: ({ label, checked }: any) => (
        <PuckCheckbox label={label} checked={checked} />
      ),
    },
    Radio: {
      fields: {
        groupLabel: { type: 'text' },
        name: { type: 'text' },
        options: {
          type: 'array',
          arrayFields: { value: { type: 'text' }, label: { type: 'text' } },
        },
        selected: { type: 'text' },
      },
      defaultProps: {
        groupLabel: 'Choose one',
        name: 'radio-group',
        options: [
          { value: 'option_one', label: 'Option one' },
          { value: 'option_two', label: 'Option two' },
        ],
        selected: 'Option A',
      },
      render: ({ groupLabel, name, options, selected }: any) => {
        return (
          <PuckRadio
            groupLabel={groupLabel}
            groupName={name}
            options={options}
            selected={selected}
          />
        );
      },
    },

    Textarea: {
      fields: {
        label: { type: 'text' },
        placeholder: { type: 'text' },
      },
      render: ({ label, placeholder }: any) => (
        <PuckTextarea label={label} placeholder={placeholder} />
      ),
    },

    Select: {
      fields: {
        label: { type: 'text' },
        options: {
          type: 'array',
          arrayFields: { value: { type: 'text' }, label: { type: 'text' } },
        },
      },
      defaultProps: {
        label: 'Select',
        options: [
          { value: 'option_a', label: 'Option A' },
          { value: 'option_b', label: 'Option B' },
        ],
      },
      render: ({ label, options }: any) => (
        <PuckSelect label={label} options={options} />
      ),
    },
    Flex: {
      fields: {
        content: {
          type: 'slot',
        },
        direction: {
          type: 'radio',
          options: [
            { label: 'Row', value: 'row' },
            { label: 'Column', value: 'column' },
          ],
        },
        gap: { type: 'number', min: 0, max: 64, step: 1 },
        justify: {
          type: 'select',
          options: [
            { label: 'Start', value: 'flex-start' },
            { label: 'Center', value: 'center' },
            { label: 'End', value: 'flex-end' },
            { label: 'Space Between', value: 'space-between' },
            { label: 'Space Around', value: 'space-around' },
            { label: 'Space Evenly', value: 'space-evenly' },
          ],
        },
        align: {
          type: 'select',
          options: [
            { label: 'Stretch', value: 'stretch' },
            { label: 'Start', value: 'flex-start' },
            { label: 'Center', value: 'center' },
            { label: 'End', value: 'flex-end' },
            { label: 'Baseline', value: 'baseline' },
          ],
        },
        wrap: {
          type: 'radio',
          options: [
            { label: 'True', value: true },
            { label: 'False', value: false },
          ],
        },
      },
      defaultProps: {
        direction: 'row',
        gap: 8,
        justify: 'flex-start',
        align: 'stretch',
        wrap: false,
      },
      render: ({
        direction,
        gap,
        justify,
        align,
        wrap,
        content: Content,
      }: any) => (
        <PuckFlex
          direction={direction}
          gap={gap}
          justify={justify}
          align={align}
          wrap={wrap}
        >
          <Content
            style={{
              display: 'flex',
              flexDirection: direction === 'column' ? 'flex-col' : 'flex-row',
              wrap: wrap ? 'flex-wrap' : 'flex-nowrap',
              gap: typeof gap === 'number' ? `${gap}px` : gap,
              justifyContent: justify,
              alignItems: align,
            }}
          />
        </PuckFlex>
      ),
    },
    Container: {
      fields: {
        content: {
          type: 'slot',
        },
        width: {
          type: 'select',
          options: [
            { label: '25%', value: 'w-1/4' },
            { label: '50%', value: 'w-1/2' },
            { label: '75%', value: 'w-3/4' },
            { label: '100%', value: 'w-full' },
          ],
        },
        align: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'mr-auto' },
            { label: 'Center', value: 'mx-auto' },
            { label: 'Right', value: 'ml-auto' },
          ],
        },
      },
      defaultProps: {
        width: 'w-full',
        align: 'mr-auto',
      },
      render: ({ align, width, content: Content }: any) => (
        <PuckContainer align={align} width={width}>
          <Content />
        </PuckContainer>
      ),
    },
  },
  root: {
    render: ({ children }) => {
      return <div className="h-full bg-background">{children}</div>;
    },
  },
};
