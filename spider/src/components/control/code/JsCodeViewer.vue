<template>
  <CodeViewer
    :code="code"
    :options="options"
    :name="name"
    :height="height"
    :operation="operation"
    fileExtension=".js"
  />
</template>
<script>
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/dracula.css";
export default {
  props: {
    code: String,
    name: String,
    height:String,
    operation:Boolean
  },
  data() {
    return {
      options: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "dracula",
        lineNumbers: true,
        line: true,
      },
    };
  },
};
</script>