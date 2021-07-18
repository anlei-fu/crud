<template>
  <CodeViewer
    :code="code"
    :options="options"
    :name="name"
    :height="height"
    fileExtension=".java"
  />
</template>
<script>
import "codemirror/theme/dracula.css";
import "codemirror/mode/clike/clike.js";
export default {
  props: {
    code: String,
    name: String,
    height:String,
  },
  data() {
    return {
      options: {
        tabSize: 4,
        mode: "text/x-java",
        theme: "dracula",
        lineNumbers: true,
        line: true,
      },
    };
  },
};
</script>
