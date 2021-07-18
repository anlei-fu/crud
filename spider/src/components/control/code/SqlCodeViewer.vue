<template>
  <CodeViewer
    :code="code"
    :options="options"
    :name="name"
    fileExtension=".sql"
    :height="height"
    :operations="operations"
  />
</template>
<script>
import "codemirror/theme/dracula.css";
import "codemirror/mode/sql/sql.js";
export default {
  props: {
    code: String,
    name: String,
    height:String,
    operations:Boolean
  },
  data() {
    return {
      options: {
        tabSize: 4,
        mode: "text/x-sql",
        theme: "dracula",
        lineNumbers: true,
        line: true,
        readonly:true
      },
    };
  },
};
</script>
