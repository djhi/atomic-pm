import * as React from "react";
import { ReactElement, ReactNode, useEffect } from "react";
import { FormHelperText, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import {
  BubbleMenu,
  Editor,
  EditorContent,
  EditorOptions,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import { useInput, useResourceContext } from "ra-core";
import {
  CommonInputProps,
  InputHelperText,
  Labeled,
  LabeledProps,
} from "ra-ui-materialui";
import { RichTextInputToolbar, TiptapEditorProvider } from "ra-input-rich-text";
import { Markdown } from "tiptap-markdown";
import { fontFamily } from "@mui/system";

export const RichTextMarkdownInput = (props: RichTextMarkdownInputProps) => {
  const {
    className,
    defaultValue = "",
    disabled = false,
    editorOptions = DefaultEditorOptions,
    fullWidth,
    helperText,
    label,
    readOnly = false,
    source,
    sx,
    toolbar,
  } = props;

  const resource = useResourceContext(props);
  const {
    id,
    field,
    isRequired,
    fieldState,
    formState: { isSubmitted },
  } = useInput({ ...props, source, defaultValue });

  const editor = useEditor(
    {
      ...editorOptions,
      autofocus: 'end',
      editable: !disabled && !readOnly,
      content: field.value,
      editorProps: {
        ...editorOptions?.editorProps,
        attributes: {
          ...editorOptions?.editorProps?.attributes,
          id,
        },
      },
    },
    [disabled, editorOptions, readOnly, id],
  );

  const { error, invalid, isTouched } = fieldState;

  useEffect(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;

    editor.commands.setContent(field.value, false, {
      preserveWhitespace: true,
    });
    editor.commands.setTextSelection({ from, to });
  }, [editor, field.value]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const handleEditorUpdate = () => {
      if (editor.isEmpty) {
        field.onChange("");
        field.onBlur();
        return;
      }

      const content = editor.storage.markdown.getMarkdown();
      field.onChange(content);
      field.onBlur();
    };

    editor.on("update", handleEditorUpdate);
    editor.on("blur", field.onBlur);
    return () => {
      editor.off("update", handleEditorUpdate);
      editor.off("blur", field.onBlur);
    };
  }, [editor, field]);

  return (
    <Root
      className={clsx(
        "ra-input",
        `ra-input-${source}`,
        className,
        fullWidth ? "fullWidth" : "",
      )}
      sx={sx}
    >
      <Labeled
        isRequired={isRequired}
        label={label}
        id={`${id}-label`}
        color={fieldState?.invalid ? "error" : undefined}
        source={source}
        resource={resource}
        fullWidth={fullWidth}
      >
        <RichTextInputContent
          editor={editor}
          error={error}
          helperText={helperText}
          id={id}
          isTouched={isTouched}
          isSubmitted={isSubmitted}
          invalid={invalid}
          toolbar={toolbar || <RichTextInputToolbar />}
        />
      </Labeled>
    </Root>
  );
};

export const DefaultEditorOptions: Partial<EditorOptions> = {
  extensions: [
    StarterKit,
    Underline,
    Link,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    TextStyle, // Required by Color
    Color,
    Highlight.configure({ multicolor: true }),
    Markdown,
  ],
};

export type RichTextMarkdownInputProps = CommonInputProps &
  Omit<LabeledProps, "children"> & {
    disabled?: boolean;
    readOnly?: boolean;
    editorOptions?: Partial<EditorOptions>;
    toolbar?: ReactNode;
    sx?: (typeof Root)["defaultProps"]["sx"];
  };

const PREFIX = "RaRichTextInput";
const classes = {
  editorContent: `${PREFIX}-editorContent`,
};
const Root = styled("div", {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  "&.fullWidth": {
    width: "100%",
  },
  [`& .${classes.editorContent}`]: {
    width: "100%",
    "& .ProseMirror:focus": {
      outline: "none",
    },
    "& .ProseMirror": {
      minHeight: `300px`,
      backgroundColor: theme.palette.action.focus,
      border: "none",
      fontFamily: theme.typography.fontFamily,

      '&[contenteditable="false"], &[contenteditable="false"]:hover, &[contenteditable="false"]:focus':
        {
          backgroundColor: theme.palette.action.disabledBackground,
        },

      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:focus": {
        backgroundColor: theme.palette.action.focus,
      },
      "& p": {
        margin: "10px 0",
        "&:last-child": {
          marginBottom: 0,
        },
      },
    },
  },
}));

/**
 * Extracted in a separate component so that we can remove fullWidth from the props injected by Labeled
 * and avoid warnings about unknown props on Root.
 */
const RichTextInputContent = ({
  editor,
  error,
  helperText,
  id,
  invalid,
  toolbar,
}: RichTextInputContentProps) => (
  <>
    <TiptapEditorProvider value={editor}>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Paper elevation={2}>{toolbar}</Paper>
      </BubbleMenu>
      <EditorContent
        aria-labelledby={`${id}-label`}
        className={classes.editorContent}
        editor={editor}
      />
    </TiptapEditorProvider>
    <FormHelperText
      className={invalid ? "ra-rich-text-input-error" : ""}
      error={invalid}
    >
      <InputHelperText error={error?.message} helperText={helperText} />
    </FormHelperText>
  </>
);

export type RichTextInputContentProps = {
  className?: string;
  editor?: Editor;
  error?: any;
  helperText?: string | ReactElement | false;
  id: string;
  isTouched: boolean;
  isSubmitted: boolean;
  invalid: boolean;
  toolbar?: ReactNode;
};
