import { Config } from '@measured/puck';
import { nanoid } from 'nanoid';

import { PUCK_CATEGORIES } from '../../lib/constants/puck-categories';
import { cn } from '../../lib/utils';

import { Components, RootProps } from './types';
import PuckButton from './ui/PuckButton';
import PuckCheckbox from './ui/PuckCheckbox';
import PuckContainer from './ui/PuckContainer';
import PuckFileBlock from './ui/PuckFileBlock';
import PuckFlex from './ui/PuckFlex';
import PuckHeading from './ui/PuckHeading';
import PuckInput from './ui/PuckInput';
import PuckParagraph from './ui/PuckParagraph';
import PuckRadio from './ui/PuckRadio';
import PuckSelect from './ui/PuckSelect';
import PuckTextarea from './ui/PuckTextarea';

export type PuckConfig = Config<Components, RootProps>;

export const config: PuckConfig = {
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
    [PUCK_CATEGORIES.InfoBlocks]: {
      components: ['Heading', 'Paragraph'],
    },
    [PUCK_CATEGORIES.Buttons]: {
      components: ['Button'],
    },
    [PUCK_CATEGORIES.Files]: {
      components: ['File'],
    },
  },
  components: {
    Input: {
      fields: {
        name: { type: 'text' },
        label: { type: 'text' },
        placeholder: { type: 'text' },
        inputType: {
          label: 'input type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Number', value: 'number' },
            { label: 'E-mail', value: 'email' },
          ],
        },
        validation: {
          type: 'object',
          objectFields: {
            required: {
              type: 'radio',
              options: [
                { label: 'True', value: true },
                { label: 'False', value: false },
              ],
            },
            maxLength: { type: 'number' },
            minLength: { type: 'number' },
            min: { type: 'number' },
            max: { type: 'number' },
            email: {
              type: 'radio',
              options: [
                { label: 'True', value: true },
                { label: 'False', value: false },
              ],
            },
          },
        },
      },
      defaultProps: {
        name: nanoid(),
        label: 'Input',
        placeholder: 'Input',
        inputType: 'text',
        validation: {
          required: false,
        },
      },
      inline: true,
      render: ({ name, label, placeholder, validation, puck }) => (
        <PuckInput
          puckRef={puck.dragRef}
          name={name}
          label={label}
          placeholder={placeholder}
          validation={validation}
        />
      ),
    },
    Checkbox: {
      fields: {
        name: { type: 'text' },
        label: { type: 'text' },
        checked: {
          type: 'radio',
          options: [
            { label: 'True', value: true },
            { label: 'False', value: false },
          ],
        },
        validation: {
          type: 'object',
          objectFields: {
            required: {
              type: 'radio',
              options: [
                { label: 'True', value: true },
                { label: 'False', value: false },
              ],
            },
          },
        },
      },
      defaultProps: {
        name: nanoid(),
        label: 'I agree',
        checked: false,
        validation: {
          required: false,
        },
      },
      inline: true,
      render: ({ name, label, checked, validation, puck }) => (
        <PuckCheckbox
          puckRef={puck.dragRef}
          name={name}
          label={label}
          checked={checked}
          validation={validation}
        />
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
        validation: {
          type: 'object',
          objectFields: {
            required: {
              type: 'radio',
              options: [
                { label: 'True', value: true },
                { label: 'False', value: false },
              ],
            },
          },
        },
      },
      defaultProps: {
        groupLabel: 'Choose one',
        name: nanoid(),
        options: [
          { value: 'option_one', label: 'Option one' },
          { value: 'option_two', label: 'Option two' },
        ],
        selected: 'Option A',
        validation: {
          required: false,
        },
      },
      inline: true,
      render: ({ groupLabel, name, options, selected, validation, puck }) => {
        return (
          <PuckRadio
            puckRef={puck.dragRef}
            groupLabel={groupLabel}
            groupName={name}
            options={options}
            selected={selected}
            validation={validation}
          />
        );
      },
    },

    Textarea: {
      fields: {
        label: { type: 'text' },
        name: { type: 'text' },
        placeholder: { type: 'text' },
        rows: { type: 'number' },
        defaultValue: { type: 'text' },
        validation: {
          type: 'object',
          objectFields: {
            required: {
              type: 'radio',
              options: [
                { label: 'True', value: true },
                { label: 'False', value: false },
              ],
            },
            maxLength: { type: 'number' },
            minLength: { type: 'number' },
          },
        },
      },
      defaultProps: {
        name: nanoid(),
        label: 'Textarea',
        placeholder: 'Some text...',
        rows: 3,
        defaultValue: '',
        validation: {
          required: false,
        },
      },
      inline: true,
      render: ({
        name,
        label,
        placeholder,
        defaultValue,
        validation,
        rows,
        puck,
      }) => (
        <PuckTextarea
          puckRef={puck.dragRef}
          name={name}
          label={label}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={rows}
          validation={validation}
        />
      ),
    },

    Select: {
      fields: {
        name: { type: 'text' },
        label: { type: 'text' },
        placeholder: { type: 'text' },
        options: {
          type: 'array',
          arrayFields: { value: { type: 'text' }, label: { type: 'text' } },
        },
        defaultValue: { type: 'text' },
        validation: {
          type: 'object',
          objectFields: {
            required: {
              type: 'radio',
              options: [
                { label: 'True', value: true },
                { label: 'False', value: false },
              ],
            },
          },
        },
      },
      defaultProps: {
        name: nanoid(),
        label: 'Select',
        placeholder: 'Select value',
        options: [
          { value: 'option_a', label: 'Option A' },
          { value: 'option_b', label: 'Option B' },
        ],
        defaultValue: '',
        validation: {
          required: false,
        },
      },
      inline: true,
      render: ({
        name,
        label,
        options,
        defaultValue,
        placeholder,
        validation,
        puck,
      }) => (
        <PuckSelect
          puckRef={puck.dragRef}
          name={name}
          defaultValue={defaultValue}
          label={label}
          placeholder={placeholder}
          options={options}
          validation={validation}
        />
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
      render: ({ direction, gap, justify, align, wrap, content: Content }) => (
        <PuckFlex>
          {(() => {
            const Slot = (Content ?? (() => null)) as any;

            return (
              <Slot
                className={cn(
                  'w-full min-h-10',
                  direction === 'column' ? 'flex-col' : 'flex-row'
                )}
                style={{
                  display: 'flex',
                  flexDirection: direction === 'column' ? 'column' : 'row',
                  flexWrap: wrap ? 'wrap' : 'nowrap',
                  gap: typeof gap === 'number' ? `${gap}px` : gap,
                  justifyContent: justify,
                  alignItems: align,
                }}
              />
            );
          })()}
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
        gap: {
          type: 'select',
          options: [
            { label: 'sm', value: 'gap-2' },
            { label: 'md', value: 'gap-4' },
            { label: 'lg', value: 'gap-6' },
            { label: 'xl', value: 'gap-8' },
          ],
        },
        padding: {
          type: 'select',
          options: [
            { label: 'none', value: 'p-0' },
            { label: 'sm', value: 'p-2' },
            { label: 'md', value: 'p-4' },
            { label: 'lg', value: 'p-6' },
            { label: 'xl', value: 'p-8' },
          ],
        },
      },
      defaultProps: {
        width: 'w-full',
        align: 'mr-auto',
        gap: 'gap-2',
        padding: 'none',
        content: [],
      },
      render: ({ align, width, gap, padding, content: Content }) => (
        <PuckContainer align={align} width={width}>
          {(() => {
            const Slot = (Content ?? (() => null)) as any;

            return <Slot className={cn('grid', gap, padding)} />;
          })()}
        </PuckContainer>
      ),
    },
    Heading: {
      fields: {
        tag: {
          type: 'select',
          options: [
            { label: 'H1', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
            { label: 'H4', value: 'h4' },
            { label: 'H5', value: 'h5' },
          ],
        },
        headingText: {
          type: 'text',
          label: 'heading text',
        },
        align: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'text-left' },
            { label: 'Center', value: 'text-center' },
            { label: 'Right', value: 'text-right' },
          ],
        },
        weight: {
          type: 'radio',
          options: [
            { label: 'Regular', value: 'font-normal' },
            { label: 'Semi Bold', value: 'font-semibold' },
            { label: 'Bold', value: 'font-bold' },
          ],
        },
      },
      defaultProps: {
        tag: 'h1',
        headingText: 'Title',
        align: 'text-left',
        weight: 'font-normal',
      },
      inline: true,
      render: ({ tag, headingText, align, weight, puck }) => (
        <PuckHeading
          puckRef={puck.dragRef}
          tag={tag}
          align={align}
          weight={weight}
          headingText={headingText}
        />
      ),
    },
    Paragraph: {
      fields: {
        paragraphText: {
          type: 'textarea',
          label: 'paragraph text',
          contentEditable: true,
        },
        align: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'text-left' },
            { label: 'Center', value: 'text-center' },
            { label: 'Right', value: 'text-right' },
          ],
        },
        weight: {
          type: 'radio',
          options: [
            { label: 'Regular', value: 'font-normal' },
            { label: 'Semi Bold', value: 'font-semibold' },
            { label: 'Bold', value: 'font-bold' },
          ],
        },
        padding: {
          type: 'select',
          options: [
            { label: 'none', value: 'p-0' },
            { label: 'sm', value: 'p-2' },
            { label: 'md', value: 'p-4' },
            { label: 'lg', value: 'p-6' },
            { label: 'xl', value: 'p-8' },
          ],
        },
      },
      defaultProps: {
        paragraphText: 'Some text...',
        align: 'text-left',
        weight: 'font-normal',
        padding: 'p-0',
      },
      inline: true,
      render: ({ paragraphText, align, weight, padding, puck }) => (
        <PuckParagraph
          puckRef={puck.dragRef}
          paragraphText={paragraphText}
          align={align}
          weight={weight}
          padding={padding}
        />
      ),
    },
    Button: {
      fields: {
        variant: {
          type: 'radio',
          options: [
            { label: 'Primary', value: 'default' },
            { label: 'Secondary', value: 'outline' },
          ],
        },
        size: {
          type: 'radio',
          options: [
            { label: 'Medium', value: 'default' },
            { label: 'Small', value: 'sm' },
            { label: 'Larg', value: 'lg' },
          ],
        },
        fullWidth: {
          type: 'radio',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
        buttonType: {
          type: 'radio',
          label: 'type',
          options: [
            { label: 'Submit', value: 'submit' },
            { label: 'Button', value: 'button' },
          ],
        },
        buttonText: {
          type: 'text',
          label: 'text',
        },
      },
      defaultProps: {
        variant: 'default',
        size: 'default',
        fullWidth: false,
        buttonType: 'submit',
        buttonText: 'Submit',
      },
      inline: true,
      render: ({
        variant,
        size,
        fullWidth,
        buttonType,
        buttonText,
        puck,
      }: any) => (
        <PuckButton
          puckRef={puck.dragRef}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          buttonType={buttonType}
          buttonText={buttonText}
        />
      ),
    },
    File: {
      fields: {
        name: { type: 'text' },
        label: {
          type: 'text',
        },
        validation: {
          type: 'object',
          objectFields: {
            required: {
              type: 'radio',
              options: [
                { label: 'True', value: true },
                { label: 'False', value: false },
              ],
            },
          },
        },
      },
      defaultProps: {
        label: 'Add file',
        name: nanoid(),
        validation: {
          required: false,
        },
      },
      inline: true,
      render: ({ name, label, validation, puck }) => (
        <PuckFileBlock
          name={name}
          label={label}
          puckRef={puck.dragRef}
          validation={validation}
        />
      ),
    },
  },
  root: {
    fields: {
      title: {
        type: 'text',
      },
      description: {
        type: 'text',
      },
    },
    render: ({ children }) => {
      return <div className="bg-background">{children}</div>;
    },
  },
};
