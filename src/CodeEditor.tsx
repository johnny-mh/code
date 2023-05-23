import './useWorker'
import * as monaco from 'monaco-editor'
import { ForwardRefRenderFunction, forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

interface CodeEditorProps {
  width?: number | string
  height?: number | string
}

const InternalCodeEditor: ForwardRefRenderFunction<HTMLDivElement, CodeEditorProps> = (
  props,
  forwardedRef,
) => {
  const elRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()

  useImperativeHandle(forwardedRef, () => elRef.current!)

  useEffect(() => {
    if (!elRef.current || editorRef.current) {
      return
    }

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    })

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      target: monaco.languages.typescript.ScriptTarget.ES5,
      allowNonTsExtensions: true,
      checkJs: true,
      strict: true,
    })

    editorRef.current = monaco.editor.create(elRef.current, {
      model: monaco.editor.createModel('', 'javascript'),
      minimap: { enabled: false },
      contextmenu: false,
      tabSize: 2,
    })

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    editorRef.current.addCommand(monaco.KeyCode.F1, () => {}, '')
  }, [])

  return (
    <div ref={elRef} style={{ width: props.width ?? '100%', height: props.height ?? '100%' }} />
  )
}

export const CodeEditor = forwardRef(InternalCodeEditor)

CodeEditor.displayName = 'CodeEditor'
