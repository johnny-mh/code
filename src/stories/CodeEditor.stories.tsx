import type { Meta, StoryFn } from '@storybook/react'
import { CodeEditor } from '../CodeEditor'

const meta = {
  title: 'Example/CodeEditor',
} satisfies Meta<typeof CodeEditor>

export default meta

export const Primary: StoryFn = () => {
  return (
    <div style={{ height: '80lvh' }}>
      <CodeEditor />
    </div>
  )
}
